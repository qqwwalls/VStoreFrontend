import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useStore } from '../../context/StoreContext';
import AuthModal from '../AuthModal';
import CartSidebar from '../CartSidebar';
import WishlistSidebar from '../WishlistSidebar';
import DownloadModal from '../DownloadModal';
import UserMenu from '../UserMenu/index';

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const { cart, wishlist, user, authLoading, isAuthOpen, openAuth, closeAuth } = useStore();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.openAuth) openAuth();
  }, [location.state, openAuth]);

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleDownloadClick = () => {
    setIsDownloadModalOpen(true);
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 5;
      });
    }, 100);
  };

  return (
    <>
      <nav className="bg-brand-bg border-b border-gray-800 text-gray-300 py-3 px-3 md:px-6 flex items-center justify-between gap-2 sticky top-0 z-30">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white tracking-widest">V <span className="text-gray-400 font-light">STORE</span></span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className={location.pathname === '/' ? 'text-brand-accent border-b-2 border-brand-accent pb-1' : 'hover:text-white transition-colors pb-1'}>Discover</Link>
            <Link to="/support" className={location.pathname.startsWith('/support') ? 'text-brand-accent border-b-2 border-brand-accent pb-1' : 'hover:text-white transition-colors pb-1'}>Support</Link>
            <Link to="/news" className={location.pathname.startsWith('/news') ? 'text-brand-accent border-b-2 border-brand-accent pb-1' : 'hover:text-white transition-colors pb-1'}>News</Link>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative hidden md:block">
            <input 
              type="text" 
              placeholder="Search store" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="bg-brand-surface rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-gray-500 text-white placeholder-gray-400"
            />
            <svg className="w-4 h-4 absolute left-3.5 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <UserMenu 
            onOpenWishlist={() => setIsWishlistOpen(true)}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenAuth={openAuth}
          />

          <button aria-label="Wishlist" title="Wishlist" className="p-2 hover:text-white transition-colors active:scale-90 relative" onClick={() => user ? setIsWishlistOpen(true) : openAuth()}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            {wishlist.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center pointer-events-none">
                {wishlist.length}
              </span>
            )}
          </button>
          
          <button aria-label="Cart" title="Cart" className="p-2 hover:text-white transition-colors active:scale-90 relative" onClick={() => setIsCartOpen(true)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-brand-accent text-black text-[10px] font-bold rounded-full flex items-center justify-center pointer-events-none">
                {cart.length}
              </span>
            )}
          </button>
          
          <div className="h-6 w-px bg-gray-700 mx-1"></div>
          
          {!user && !authLoading && (
            <button className="hidden sm:block px-4 py-2 text-sm font-medium hover:text-white transition-all active:scale-95" onClick={openAuth}>Sign in</button>
          )}
          <button 
            className="hidden lg:block px-6 py-2 bg-brand-accent text-black font-semibold rounded hover:bg-green-400 transition-all active:scale-95"
            onClick={handleDownloadClick}
          >
            Download
          </button>
        </div>
      </nav>

      {isAuthOpen && <AuthModal isOpen onClose={closeAuth} />}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistSidebar isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
      
      <DownloadModal 
        isOpen={isDownloadModalOpen} 
        onClose={() => setIsDownloadModalOpen(false)} 
        progress={downloadProgress} 
      />
    </>
  );
}
