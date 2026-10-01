import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Game } from '../types';

interface StoreContextType {
  cart: Game[];
  wishlist: Game[];
  addToCart: (game: Game) => void;
  removeFromCart: (id: number) => void;
  addToWishlist: (game: Game) => void;
  removeFromWishlist: (id: number) => void;
  clearCart: () => void;
  toastMessage: string | null;
  showToast: (message: string) => void;
  user: any | null;
  setUser: (user: any | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Game[]>([]);
  const [wishlist, setWishlist] = useState<Game[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToCart = (game: Game) => {
    if (!cart.find(g => g.id === game.id)) {
      setCart(prev => [...prev, game]);
      showToast(`${game.title} added to cart`);
    } else {
      showToast(`${game.title} is already in your cart`);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(g => g.id !== id));
  };

  const addToWishlist = (game: Game) => {
    if (!wishlist.find(g => g.id === game.id)) {
      setWishlist(prev => [...prev, game]);
      showToast(`${game.title} added to wishlist`);
    } else {
      showToast(`${game.title} is already in your wishlist`);
    }
  };

  const removeFromWishlist = (id: number) => {
    setWishlist(prev => prev.filter(g => g.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <StoreContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, addToWishlist, removeFromWishlist, clearCart, toastMessage, showToast, user, setUser }}>
      {children}
      
      {/* Toast Notification */}
      <div className={`fixed bottom-6 right-6 z-[100] transition-all duration-300 transform ${toastMessage ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}>
        <div className="bg-brand-surface border border-gray-700 shadow-2xl rounded-lg px-6 py-4 flex items-center gap-3">
          <svg className="w-6 h-6 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          <p className="text-white font-medium">{toastMessage}</p>
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
