import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useStore } from './context/StoreContext';
import { useGame } from './hooks/useGame';
import AchievementsModal from './components/AchievementsModal/index';

export default function GamePage() {
  const { id } = useParams();
  const { game, loading, error } = useGame(id);
  const { addToCart, addToWishlist, cart, wishlist } = useStore();
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  
  if (error || !game) return <div className="min-h-screen flex items-center justify-center text-red-400">Game not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Your favorite new game!</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 aspect-video mb-8">
            <img 
              src={game.bannerImageUrl || game.coverImageUrl} 
              alt={game.title} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">About this game</h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              {game.description || "In this fascinating journey, players explore incredible landscapes and battle mythical beasts. Experience stunning graphics, an emotional storyline, and deep tactical combat. The world is yours to conquer or save. Forge alliances, gather resources, and uncover the ultimate truth of the realm."}
            </p>
          </div>

          <div className="pt-8 border-t border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6">System Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div className="space-y-2">
                <h3 className="text-white font-semibold mb-3">Minimum:</h3>
                <p className="text-brand-text-muted">OS: <span className="text-gray-300">Windows 10 64-bit</span></p>
                <p className="text-brand-text-muted">Processor: <span className="text-gray-300">Intel Core i5-8400 / AMD Ryzen 3 3300X</span></p>
                <p className="text-brand-text-muted">Memory: <span className="text-gray-300">12 GB RAM</span></p>
                <p className="text-brand-text-muted">Graphics: <span className="text-gray-300">NVIDIA GeForce GTX 1060 / AMD Radeon RX 580</span></p>
                <p className="text-brand-text-muted">Storage: <span className="text-gray-300">60 GB available space</span></p>
              </div>
              <div className="space-y-2">
                <h3 className="text-white font-semibold mb-3">Recommended:</h3>
                <p className="text-brand-text-muted">OS: <span className="text-gray-300">Windows 10/11 64-bit</span></p>
                <p className="text-brand-text-muted">Processor: <span className="text-gray-300">Intel Core i7-8700K / AMD Ryzen 5 3600X</span></p>
                <p className="text-brand-text-muted">Memory: <span className="text-gray-300">16 GB RAM</span></p>
                <p className="text-brand-text-muted">Graphics: <span className="text-gray-300">NVIDIA GeForce RTX 2070 / AMD Radeon RX 5700 XT</span></p>
                <p className="text-brand-text-muted">Storage: <span className="text-gray-300">60 GB available space (SSD)</span></p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Achievements</h2>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4">
              {[
                { id: 1, title: 'First Steps', img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/capsule_231x87.jpg' },
                { id: 2, title: 'Explorer', img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172470/capsule_231x87.jpg' },
                { id: 3, title: 'Combat', img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2824660/capsule_231x87.jpg' },
                { id: 4, title: 'Speed', img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1771300/capsule_231x87.jpg' },
                { id: 5, title: 'Master', img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1119730/capsule_231x87.jpg' },
              ].map(ach => (
                <div key={ach.id} className="flex-shrink-0 flex flex-col gap-2 group cursor-pointer w-24">
                  <div className="w-24 h-24 bg-gray-800 rounded border border-gray-700 overflow-hidden group-hover:border-brand-accent transition-colors relative">
                    <img src={ach.img} alt={ach.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  </div>
                  <span className="text-xs text-center text-gray-400 group-hover:text-white line-clamp-2">{ach.title}</span>
                </div>
              ))}
            </div>
            
            <button onClick={() => setIsAchievementsOpen(true)} className="text-brand-accent hover:underline text-sm font-medium mt-2">View all 96 &rarr;</button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-brand-surface border border-gray-800 rounded-xl p-6 shadow-xl">
            <div className="text-xs text-brand-text-muted uppercase tracking-wider mb-2">{game.gameType || 'Base Game'}</div>
            <h2 className="text-2xl font-bold text-white mb-6">{game.title}</h2>
            
            {game.price?.isFree ? (
              <div className="text-2xl font-bold text-brand-accent mb-6">Free To Play</div>
            ) : (
              <div className="text-2xl font-bold text-white mb-6">
                {game.price?.currency} {game.price?.final}
              </div>
            )}
            
            <button 
              className="w-full bg-brand-accent text-black font-bold py-3 rounded-lg hover:bg-green-400 transition-colors mb-4"
              onClick={async () => {
                if (game) addToCart(game);
              }}
            >
              {cart.find(g => g.id === game.id) ? 'In Cart' : (game.price?.isFree ? 'Play Game' : 'Add to Cart')}
            </button>
            
            <button 
              className="w-full border border-gray-600 text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              onClick={async () => {
                if (game) addToWishlist(game);
              }}
            >
              <svg className={`w-5 h-5 ${wishlist.find(g => g.id === game.id) ? 'fill-white text-white' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              {wishlist.find(g => g.id === game.id) ? 'In Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
          
          <div className="bg-brand-surface border border-gray-800 rounded-xl p-6 shadow-xl space-y-4 text-sm">
            <div className="flex justify-between border-b border-gray-800 pb-3">
              <span className="text-brand-text-muted">Developer</span>
              <span className="text-white font-medium">V-Store Studios</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-3">
              <span className="text-brand-text-muted">Publisher</span>
              <span className="text-white font-medium">V-Store Publishing</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-3">
              <span className="text-brand-text-muted">Release Date</span>
              <span className="text-white font-medium">{game.status === 'Released' ? 'Available Now' : game.status || 'Coming Soon'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-text-muted">Platform</span>
              <span className="text-white font-medium">Windows, Mac</span>
            </div>
          </div>
        </div>
      </div>
      
      <AchievementsModal isOpen={isAchievementsOpen} onClose={() => setIsAchievementsOpen(false)} />
    </div>
  );
}
