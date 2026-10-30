import SidebarDrawer from '../SidebarDrawer/index';
import { useStore } from '../../context/StoreContext';
import { useState } from 'react';
import CheckoutModal from '../CheckoutModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: Props) {
  const { cart, removeFromCart, user, authLoading, privateLoading, openAuth } = useStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <>
      <SidebarDrawer isOpen={isOpen} onClose={onClose} title="Your Cart">
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <p>Your cart is empty.</p>
          <button onClick={onClose} className="mt-4 text-brand-accent hover:underline">Continue shopping</button>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-4">
            {cart.map(game => (
              <div key={game.id} className="flex gap-4 items-center bg-gray-800 p-3 rounded-lg relative group">
                <img src={game.coverImageUrl} className="w-16 h-16 object-cover rounded" alt={game.title} />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{game.title}</p>
                  <p className="text-brand-accent text-sm">{game.price?.final ? `${game.price.currency} ${game.price.final}` : 'Free'}</p>
                </div>
                <button aria-label={'Remove ' + game.title + ' from cart'} title="Remove from cart" onClick={() => removeFromCart(game.id)} className="text-gray-400 hover:text-red-400 p-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 p-4 mt-auto">
            <div className="flex justify-between text-white font-bold mb-4">
              <span>Total:</span>
              <span>{cart.reduce((sum, g) => sum + (g.price?.final || 0), 0) > 0 ? `UAH ${cart.reduce((sum, g) => sum + (g.price?.final || 0), 0)}` : 'Free'}</span>
            </div>
            <button 
              disabled={authLoading || privateLoading}
              className="w-full bg-brand-accent text-black font-bold py-3 rounded-lg hover:bg-green-400 transition-colors"
              onClick={() => {
                if (!user) {
                  setIsCheckoutOpen(false);
                  onClose();
                  openAuth();
                  return;
                }
                setIsCheckoutOpen(true);
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
      </SidebarDrawer>
      <CheckoutModal 
        isOpen={isOpen && isCheckoutOpen && Boolean(user)}
        onClose={() => setIsCheckoutOpen(false)} 
        games={cart} 
        onSuccess={onClose}
      />
    </>
  );
}
