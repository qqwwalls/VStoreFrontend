import { useState } from 'react';
import { useStore } from '../../context/StoreContext';

import { Link } from 'react-router-dom';

interface Props {
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onOpenAuth: () => void;
}

export default function UserMenu({ onOpenWishlist, onOpenCart, onOpenAuth }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useStore();

  const handleLogout = () => {
    setUser(null);
    setIsOpen(false);
  };

  if (!user) {
    return (
      <button className="p-2 hover:text-white transition-colors active:scale-90" onClick={onOpenAuth}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
      </button>
    );
  }

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 p-2 hover:text-white transition-colors">
        <div className="w-7 h-7 rounded-full bg-brand-accent text-black flex items-center justify-center font-bold text-sm">
          {user.user?.charAt(0).toUpperCase() || 'U'}
        </div>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-brand-surface border border-gray-700 rounded-lg shadow-xl py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-700">
            <p className="text-sm font-medium text-white">{user.user}</p>
          </div>
          <Link 
            to="/profile" 
            onClick={() => setIsOpen(false)}
            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            Profile
          </Link>
          <button 
            onClick={() => { onOpenWishlist(); setIsOpen(false); }} 
            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            Wishlist
          </button>
          <button 
            onClick={() => { onOpenCart(); setIsOpen(false); }} 
            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            Library
          </button>
          <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
