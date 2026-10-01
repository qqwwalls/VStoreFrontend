import { useState } from 'react';
import type { Game } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  games: Game[];
  onSuccess: () => void;
}

export default function CheckoutModal({ isOpen, onClose, games, onSuccess }: Props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const total = games.reduce((sum, g) => sum + (g.price?.final || 0), 0);
  const currency = games.length > 0 && games[0].price?.currency ? games[0].price.currency : 'UAH';

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onSuccess();
        onClose();
      }, 3000); // Close after 3 seconds
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-brand-surface w-full max-w-4xl rounded-xl shadow-2xl border border-gray-700 relative overflow-hidden">
        
        {isSuccess ? (
          <div className="p-16 flex flex-col items-center justify-center text-center animate-fade-in min-h-[400px]">
            <div className="text-6xl font-serif text-white mb-6">V</div>
            <h2 className="text-3xl font-bold text-white mb-6">Thank you for buying our games!</h2>
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.5)]">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-white uppercase tracking-wide">Checkout</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex flex-col md:flex-row h-full max-h-[70vh] overflow-y-auto">
              {/* Billing Form */}
              <div className="flex-1 p-6 border-r border-gray-800">
                <h3 className="text-lg font-bold text-white mb-6 uppercase">Billing Information</h3>
                
                <form id="checkout-form" onSubmit={handlePurchase} className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">First Name</label>
                      <input type="text" required className="w-full bg-brand-bg border border-gray-600 rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent text-sm" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Last Name</label>
                      <input type="text" required className="w-full bg-brand-bg border border-gray-600 rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent text-sm" />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">City</label>
                      <input type="text" required className="w-full bg-brand-bg border border-gray-600 rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent text-sm" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Billing Address</label>
                      <input type="text" required className="w-full bg-brand-bg border border-gray-600 rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent text-sm" />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Country</label>
                      <select className="w-full bg-brand-bg border border-gray-600 rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent text-sm appearance-none">
                        <option>Ukraine</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Poland</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Zip or Postal Code</label>
                      <input type="text" required className="w-full bg-brand-bg border border-gray-600 rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent text-sm" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Phone Number</label>
                    <input type="tel" required className="w-full bg-brand-bg border border-gray-600 rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent text-sm" placeholder="+380" />
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <div className="relative flex items-center justify-center mt-0.5">
                        <input type="checkbox" className="peer appearance-none w-5 h-5 border border-gray-500 rounded bg-brand-bg checked:bg-brand-accent checked:border-brand-accent transition-colors" />
                        <svg className="w-3.5 h-3.5 text-black absolute opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <span className="text-sm text-gray-400 leading-tight">Save this payment method for future purchases</span>
                    </label>
                  </div>
                </form>
              </div>

              {/* Order Summary */}
              <div className="w-full md:w-80 bg-brand-bg p-6 flex flex-col">
                <h3 className="text-lg font-bold text-white mb-6 uppercase">Order Summary</h3>
                
                <div className="flex-1 overflow-y-auto space-y-4 mb-6">
                  {games.map(game => (
                    <div key={game.id} className="flex gap-3">
                      <img src={game.coverImageUrl} className="w-16 h-12 object-cover rounded" alt={game.title} />
                      <div>
                        <p className="text-sm text-white font-medium line-clamp-2">{game.title}</p>
                        <p className="text-xs text-brand-accent mt-1">{game.price?.isFree ? 'Free' : `${game.price?.currency} ${game.price?.final}`}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-700 pt-4 mb-6">
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total:</span>
                    <span>{total > 0 ? `${currency} ${total}` : 'Free'}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-bold text-gray-400 mb-2 uppercase">Payment Method</p>
                  <div className="grid grid-cols-4 gap-2">
                    <button className="h-10 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 border border-gray-600 text-white font-serif font-bold">V</button>
                    <button className="h-10 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 border border-gray-600 text-blue-400 font-bold italic">P</button>
                    <button className="h-10 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 border border-gray-600 text-gray-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    </button>
                    <button className="h-10 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 border border-gray-600 text-gray-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
                    </button>
                  </div>
                </div>

                <button 
                  type="submit"
                  form="checkout-form"
                  disabled={loading || games.length === 0}
                  className="w-full bg-brand-accent hover:bg-green-400 text-black font-bold py-3 rounded transition-all active:scale-95 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Purchase'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
