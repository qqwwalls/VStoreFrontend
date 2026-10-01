import { useState } from 'react';
import { useStore } from './context/StoreContext';
import AchievementsModal from './components/AchievementsModal/index';

export default function ProfilePage() {
  const { user } = useStore();
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-white">
      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-12">
        <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-5xl font-bold border-4 border-gray-600">
          {user?.username ? user.username[0].toUpperCase() : 'U'}
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{user?.username || 'Nickname_320'}</h1>
          <div className="flex gap-4">
            <div className="bg-brand-surface border border-gray-700 px-6 py-2 rounded-lg text-center">
              <span className="block text-xl font-bold text-brand-accent">42</span>
              <span className="text-xs text-gray-400 uppercase font-medium">Games</span>
            </div>
            <div className="bg-brand-surface border border-gray-700 px-6 py-2 rounded-lg text-center cursor-pointer hover:border-gray-500 transition-colors" onClick={() => setIsAchievementsOpen(true)}>
              <span className="block text-xl font-bold text-brand-accent">204</span>
              <span className="text-xs text-gray-400 uppercase font-medium">Achievements</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column - Game Collection */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Game collection</h2>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-brand-surface border border-gray-700 rounded-full py-1.5 pl-8 pr-4 text-sm focus:outline-none focus:border-brand-accent"
              />
              <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Mock games */}
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-brand-surface rounded overflow-hidden border border-gray-800 hover:border-gray-600 cursor-pointer">
                <img src={`https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${2358720 + i}/capsule_616x353.jpg`} className="w-full aspect-[16/9] object-cover bg-gray-800" alt="Game" onError={(e) => e.currentTarget.src = 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1036800/capsule_616x353.jpg'} />
                <div className="p-3">
                  <p className="text-sm font-bold line-clamp-1">Awesome Game {i}</p>
                  <p className="text-xs text-gray-500 mt-1">24 hours played</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Achievements summary */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Achievements</h2>
            <button onClick={() => setIsAchievementsOpen(true)} className="text-brand-accent hover:underline text-sm font-medium">View all &rarr;</button>
          </div>
          <div className="bg-brand-surface border border-gray-800 rounded-xl p-6">
            <p className="text-sm text-gray-400 mb-4">Latest unlocks across your games</p>
            <div className="flex flex-wrap gap-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} onClick={() => setIsAchievementsOpen(true)} className="w-14 h-14 bg-gray-800 rounded border border-gray-700 flex items-center justify-center cursor-pointer hover:border-brand-accent transition-colors">
                  <div className="w-8 h-8 rounded-full border border-yellow-500 flex items-center justify-center opacity-80">
                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AchievementsModal isOpen={isAchievementsOpen} onClose={() => setIsAchievementsOpen(false)} />
    </div>
  );
}
