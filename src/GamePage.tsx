import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowUpRight, Heart, LoaderCircle } from 'lucide-react';
import { useStore } from './context/StoreContext';
import { useGame } from './hooks/useGame';
import AchievementsModal from './components/AchievementsModal';
import AchievementItem from './components/AchievementItem';

export default function GamePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { game, loading, error } = useGame(id);
  const { addToCart, addToWishlist, cart, wishlist, library, privateLoading } = useStore();
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [savingWishlist, setSavingWishlist] = useState(false);

  if (loading) return <div className="p-12 text-center text-gray-400">Loading game...</div>;
  if (error || !game) return <div role="alert" className="p-12 text-center text-red-300">{error || 'Game not found.'}</div>;

  const owned = library.some(item => item.id === game.id);
  const inCart = cart.some(item => item.id === game.id);
  const inWishlist = wishlist.some(item => item.id === game.id);
  const requirements = game.systemRequirements || [];
  const achievements = game.achievements || [];
  const upcoming = game.status === 'Coming soon';

  const saveWishlist = async () => {
    setSavingWishlist(true);
    try { await addToWishlist(game); }
    finally { setSavingWishlist(false); }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 break-words">{game.title}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 min-w-0">
          <div className="relative rounded-lg overflow-hidden bg-gray-900 aspect-video mb-8">
            <img src={game.bannerImageUrl || game.coverImageUrl} alt={game.title} className="w-full h-full object-cover" />
          </div>
          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">About this game</h2>
            <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-line">{game.description || 'No description has been provided.'}</p>
          </section>
          <section className="pt-6 border-t border-gray-800 mb-8">
            <h2 className="text-xl font-bold text-white mb-5">System Requirements</h2>
            {requirements.length === 0 ? <p className="text-sm text-gray-400">System requirements have not been provided.</p> : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                {requirements.map(requirement => (
                  <div key={requirement.id} className="space-y-2">
                    <h3 className="font-semibold text-white mb-3">{requirement.type === 0 ? 'Minimum' : 'Recommended'}</h3>
                    {[['OS', requirement.os], ['Processor', requirement.cpu], ['Memory', requirement.ram], ['Graphics', requirement.gpu], ['Storage', requirement.storage]].map(([label, value]) =>
                      value ? <p key={label} className="text-gray-400">{label}: <span className="text-gray-200">{value}</span></p> : null)}
                  </div>
                ))}
              </div>
            )}
          </section>
          <section className="pt-6 border-t border-gray-800">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h2 className="text-xl font-bold text-white">Achievements</h2>
              {achievements.length > 0 && <button onClick={() => setIsAchievementsOpen(true)} className="flex items-center gap-1 text-sm text-brand-accent hover:underline">View all {achievements.length}<ArrowUpRight size={16} aria-hidden="true" /></button>}
            </div>
            {achievements.length === 0 ? <p className="text-sm text-gray-400">No achievements have been provided.</p> : (
              <ul aria-label="Available achievements" className="divide-y divide-gray-800">{achievements.slice(0, 3).map(achievement => <li key={achievement.id}><AchievementItem achievement={achievement} /></li>)}</ul>
            )}
          </section>
        </div>
        <aside className="min-w-0">
          <div className="border-y border-gray-700 py-6">
            <p className="text-xs text-gray-400 uppercase mb-2">Base Game</p>
            <h2 className="text-xl font-bold text-white mb-5 break-words">{game.title}</h2>
            <p className="text-2xl font-bold text-white mb-6">{game.price?.isFree ? 'Free to play' : game.price?.currency + ' ' + game.price?.final}</p>
            <button disabled={upcoming || privateLoading} onClick={() => owned ? navigate('/profile') : addToCart(game)} className="w-full bg-brand-accent text-black font-bold min-h-12 py-3 px-3 rounded hover:bg-green-400 mb-3 disabled:opacity-50">
              {owned ? 'In library' : inCart ? 'In cart' : upcoming ? 'Coming soon' : 'Add to cart'}
            </button>
            <button disabled={savingWishlist || privateLoading} onClick={() => void saveWishlist()} className="w-full min-h-12 border border-gray-600 text-white font-semibold py-3 px-3 rounded hover:bg-gray-800 flex items-center justify-center gap-2 disabled:opacity-50">
              {savingWishlist ? <LoaderCircle size={18} className="animate-spin" /> : <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />}
              {inWishlist ? 'In wishlist' : 'Add to wishlist'}
            </button>
            <dl className="text-sm mt-6 space-y-4">
              <div><dt className="text-gray-400">Developer</dt><dd className="text-white mt-1 break-words">{game.developerName || 'Not provided'}</dd></div>
              <div><dt className="text-gray-400">Availability</dt><dd className="text-white mt-1">{upcoming ? 'Coming soon' : 'Available now'}</dd></div>
            </dl>
          </div>
        </aside>
      </div>
      <AchievementsModal isOpen={isAchievementsOpen} onClose={() => setIsAchievementsOpen(false)} achievements={achievements} />
    </div>
  );
}
