import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, LoaderCircle, LockKeyhole, X } from 'lucide-react';
import type { Game } from '../../types';
import { useStore } from '../../context/StoreContext';
import { getErrorMessage } from '../../api/client';
import { getCheckoutOptions } from '../../api/store';
import type { CheckoutOptions } from '../../api/store';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  games: Game[];
  onSuccess: () => void;
}

export default function CheckoutModal({ isOpen, onClose, games, onSuccess }: Props) {
  const { user, checkout, openAuth } = useStore();
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [options, setOptions] = useState<CheckoutOptions | null>(null);
  const [optionsVersion, setOptionsVersion] = useState(0);
  const [completedDemo, setCompletedDemo] = useState(false);
  useEffect(() => {
    if (!isOpen) {
      setIsSuccess(false);
      setError('');
      setOptions(null);
      setCompletedDemo(false);
      return;
    }
    const controller = new AbortController();
    getCheckoutOptions(controller.signal).then(setOptions).catch(reason => {
      if (!controller.signal.aborted) setError(getErrorMessage(reason));
    });
    return () => controller.abort();
  }, [isOpen, optionsVersion]);
  if (!isOpen) return null;

  const total = games.reduce((sum, game) => sum + (game.price?.final ?? 0), 0);
  const hasPaidGames = games.some(game => !game.price?.isFree);
  const demoPurchase = hasPaidGames && options?.demoPurchasesEnabled === true;

  const handlePurchase = async (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) return;
    if (!user) {
      onClose();
      openAuth();
      return;
    }
    setLoading(true);
    setError('');
    try {
      await checkout(demoPurchase);
      setCompletedDemo(demoPurchase);
      setIsSuccess(true);
    } catch (reason) {
      setError(getErrorMessage(reason));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" aria-labelledby="checkout-title" className="bg-brand-surface w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl border border-gray-700 p-6">
        <header className="flex items-center justify-between gap-4 mb-6">
          <h2 id="checkout-title" className="text-xl font-bold text-white">Checkout</h2>
          <button aria-label="Close checkout" title="Close" disabled={loading} onClick={onClose} className="p-2 text-gray-400 hover:text-white"><X size={20} /></button>
        </header>
        {isSuccess ? (
          <div className="text-center py-8">
            <CheckCircle2 size={48} className="text-brand-accent mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white">{completedDemo ? 'Demo purchase complete' : 'Games added to your library'}</h3>
            {completedDemo && <p className="text-sm text-gray-300 mt-3">No money was charged. Your games are now in your library.</p>}
            <Link to="/profile" onClick={() => { onSuccess(); onClose(); }} className="inline-block mt-6 bg-brand-accent text-black font-semibold rounded px-6 py-3">View library</Link>
          </div>
        ) : (
          <form onSubmit={handlePurchase}>
            <ul className="space-y-4 mb-6">{games.map(game => (
              <li key={game.id} className="flex items-center gap-4">
                <img src={game.bannerImageUrl || game.coverImageUrl} alt="" className="w-20 aspect-video object-cover rounded shrink-0" />
                <span className="flex-1 text-white text-sm break-words min-w-0">{game.title}</span>
                <span className="text-gray-300 text-sm shrink-0">{game.price?.isFree ? 'Free' : 'UAH ' + game.price?.final}</span>
              </li>
            ))}</ul>
            {demoPurchase && <p role="status" className="border border-gray-600 text-gray-300 rounded p-4 text-sm mb-5">Demo purchase. No real payment or card details are required.</p>}
            {hasPaidGames && options && !options.demoPurchasesEnabled && <p role="status" className="text-yellow-200 text-sm mb-5">Purchases are currently unavailable.</p>}
            {error && <p role="alert" className="text-red-300 text-sm mb-4">{error}</p>}
            {hasPaidGames && !options && error && <button type="button" onClick={() => { setError(''); setOptionsVersion(value => value + 1); }} className="text-brand-accent text-sm mb-4">Retry</button>}
            <div className="flex justify-between font-semibold text-white py-4 border-t border-gray-700"><span>Total</span><span>{total > 0 ? 'UAH ' + total : 'Free'}</span></div>
            <button type="submit" disabled={loading || (hasPaidGames && !demoPurchase) || games.length === 0} className="w-full min-h-12 bg-brand-accent text-black font-bold rounded py-3 px-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? <LoaderCircle size={18} className="animate-spin" /> : <LockKeyhole size={18} />}
              {loading ? 'Saving...' : demoPurchase ? 'Complete demo purchase' : hasPaidGames ? (options ? 'Purchases unavailable' : 'Loading...') : 'Add to library'}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
