import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { Game } from '../types';
import type { AuthSession, UserDTO } from '../types/backend';
import { getGames } from '../api/games';
import { getCurrentUser, logout as logoutRequest } from '../api/user';
import { acquireGames, addWishlistGame, getLibrary, getWishlist, removeWishlistGame } from '../api/store';
import { getErrorMessage } from '../api/client';
import { readSession, saveSession, SESSION_CHANGED } from '../api/session';
import { CheckCircle2 } from 'lucide-react';

interface StoreContextType {
  cart: Game[];
  wishlist: Game[];
  library: Game[];
  catalogue: Game[];
  catalogueLoading: boolean;
  catalogueError: string | null;
  reloadCatalogue: () => void;
  privateLoading: boolean;
  privateError: string | null;
  reloadPrivateData: () => void;
  addToCart: (game: Game) => void;
  removeFromCart: (id: string) => void;
  addToWishlist: (game: Game) => Promise<void>;
  removeFromWishlist: (id: string) => Promise<void>;
  clearCart: () => void;
  checkout: (demoPurchase?: boolean) => Promise<void>;
  toastMessage: string | null;
  showToast: (message: string) => void;
  user: UserDTO | null;
  authLoading: boolean;
  completeAuth: (session: AuthSession) => void;
  logout: () => Promise<void>;
  isAuthOpen: boolean;
  openAuth: () => void;
  closeAuth: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);
const EMPTY_IDS: string[] = [];
const EMPTY_GAMES: Game[] = [];

function readCart(key: string): string[] {
  try {
    const ids: unknown = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(ids) ? ids.filter((id): id is string => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [savedWishlist, setWishlist] = useState<Game[]>([]);
  const [savedLibrary, setLibrary] = useState<Game[]>([]);
  const [privateOwnerId, setPrivateOwnerId] = useState<string>();
  const [catalogue, setCatalogue] = useState<Game[]>([]);
  const [catalogueLoading, setCatalogueLoading] = useState(true);
  const [catalogueError, setCatalogueError] = useState<string | null>(null);
  const [catalogueVersion, setCatalogueVersion] = useState(0);
  const [privateVersion, setPrivateVersion] = useState(0);
  const [privateLoading, setPrivateLoading] = useState(false);
  const [privateError, setPrivateError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [user, setUser] = useState<UserDTO | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const openAuth = useCallback(() => setIsAuthOpen(true), []);
  const closeAuth = useCallback(() => setIsAuthOpen(false), []);
  const [cartState, setCartState] = useState({ key: '', ids: [] as string[] });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userId = user?.id;
  const wishlist = privateOwnerId === userId ? savedWishlist : EMPTY_GAMES;
  const library = privateOwnerId === userId ? savedLibrary : EMPTY_GAMES;
  const cartKey = `vstore.cart.${userId || 'guest'}`;
  const cartIds = cartState.key === cartKey ? cartState.ids : EMPTY_IDS;
  const cart = useMemo(() => catalogue.filter(game => cartIds.includes(game.id)), [catalogue, cartIds]);

  useEffect(() => {
    let active = true;
    const onSession = () => {
      if (active) setUser(readSession()?.user ?? null);
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === 'vstore.auth.v1') onSession();
    };
    window.addEventListener(SESSION_CHANGED, onSession);
    window.addEventListener('storage', onStorage);
    const session = readSession();
    if (!session) setAuthLoading(false);
    else getCurrentUser(session.user.id).then(profile => {
      if (active && readSession()?.user.id === profile.id) setUser(profile);
    }).catch(() => {
      if (active) setUser(null);
    }).finally(() => { if (active) setAuthLoading(false); });
    return () => {
      active = false;
      window.removeEventListener(SESSION_CHANGED, onSession);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setCatalogueLoading(true);
    setCatalogueError(null);
    getGames(controller.signal).then(setCatalogue).catch(error => {
      if (!controller.signal.aborted) setCatalogueError(getErrorMessage(error));
    }).finally(() => { if (!controller.signal.aborted) setCatalogueLoading(false); });
    return () => controller.abort();
  }, [catalogueVersion]);

  useEffect(() => {
    if (authLoading) return;
    let ids = readCart(cartKey);
    if (userId) {
      ids = [...new Set([...ids, ...readCart('vstore.cart.guest')])];
      localStorage.setItem(cartKey, JSON.stringify(ids));
      localStorage.removeItem('vstore.cart.guest');
    }
    setCartState({ key: cartKey, ids });
  }, [cartKey, userId, authLoading]);

  useEffect(() => {
    const controller = new AbortController();
    setWishlist([]);
    setLibrary([]);
    setPrivateError(null);
    if (!userId) {
      setPrivateLoading(false);
      return () => controller.abort();
    }
    setPrivateLoading(true);
    Promise.all([getWishlist(controller.signal), getLibrary(controller.signal)]).then(([savedWishlist, savedLibrary]) => {
      if (!controller.signal.aborted) {
        setWishlist(savedWishlist);
        setLibrary(savedLibrary);
        setPrivateOwnerId(userId);
      }
    }).catch(error => {
      if (!controller.signal.aborted) setPrivateError(getErrorMessage(error));
    }).finally(() => { if (!controller.signal.aborted) setPrivateLoading(false); });
    return () => controller.abort();
  }, [userId, privateVersion]);

  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(null), 4000);
  };

  const commitCart = (ids: string[]) => {
    localStorage.setItem(cartKey, JSON.stringify(ids));
    setCartState({ key: cartKey, ids });
  };

  const addToCart = (game: Game) => {
    if (library.some(owned => owned.id === game.id)) {
      showToast('This game is already in your library.');
      return;
    }
    if (!cart.find(g => g.id === game.id)) {
      commitCart([...cartIds, game.id]);
      showToast(`${game.title} added to cart`);
    } else {
      showToast(`${game.title} is already in your cart`);
    }
  };

  const removeFromCart = (id: string) => {
    commitCart(cartIds.filter(gameId => gameId !== id));
  };

  const addToWishlist = async (game: Game) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    if (wishlist.some(saved => saved.id === game.id)) {
      showToast(`${game.title} is already in your wishlist`);
      return;
    }
    const accountId = user.id;
    try {
      await addWishlistGame(game.id);
      const saved = await getWishlist();
      if (readSession()?.user.id === accountId) setWishlist(saved);
      showToast(`${game.title} added to wishlist`);
    } catch (error) {
      showToast(getErrorMessage(error));
      if (!readSession()) setIsAuthOpen(true);
    }
  };

  const removeFromWishlist = async (id: string) => {
    if (!user) return;
    const accountId = user.id;
    try {
      await removeWishlistGame(id);
      if (readSession()?.user.id === accountId) setWishlist(prev => prev.filter(g => g.id !== id));
    } catch (error) {
      showToast(getErrorMessage(error));
    }
  };

  const clearCart = () => commitCart([]);

  const checkout = async (demoPurchase = false) => {
    if (!user) {
      setIsAuthOpen(true);
      throw new Error('Please sign in to add games to your library.');
    }
    if (cart.length === 0) throw new Error('Your cart is empty.');
    const accountId = user.id;
    const purchasedIds = cart.map(game => game.id);
    const savedLibrary = await acquireGames(purchasedIds, demoPurchase);
    if (readSession()?.user.id !== accountId) throw new Error('Your session changed. Please sign in again.');
    setLibrary(savedLibrary);
    setPrivateOwnerId(accountId);
    commitCart(cartIds.filter(id => !purchasedIds.includes(id)));
  };

  const completeAuth = (session: AuthSession) => {
    saveSession(session);
    setAuthLoading(false);
    setIsAuthOpen(false);
  };

  const logout = async () => {
    const session = readSession();
    saveSession(null);
    setIsAuthOpen(false);
    if (session) {
      try { await logoutRequest(session.refreshToken); }
      catch { showToast('Signed out on this device.'); }
    }
  };

  return (
    <StoreContext.Provider value={{
      cart, wishlist, library, catalogue, catalogueLoading, catalogueError,
      reloadCatalogue: () => setCatalogueVersion(value => value + 1),
      privateLoading, privateError, reloadPrivateData: () => setPrivateVersion(value => value + 1),
      addToCart, removeFromCart, addToWishlist, removeFromWishlist, clearCart, checkout,
      toastMessage, showToast, user, authLoading, completeAuth, logout,
      isAuthOpen, openAuth, closeAuth,
    }}>
      {children}
      
      {/* Toast Notification */}
      <div className={`fixed bottom-6 right-6 z-[100] transition-all duration-300 transform ${toastMessage ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}>
        <div className="bg-brand-surface border border-gray-700 shadow-2xl rounded-lg px-6 py-4 flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-brand-accent shrink-0" aria-hidden="true" />
          <p role="status" className="text-white font-medium break-words">{toastMessage}</p>
        </div>
      </div>
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
