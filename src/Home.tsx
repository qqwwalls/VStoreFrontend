import { useNavigate } from 'react-router-dom';
import HeroBanner from './components/HeroBanner';
import GameCard from './components/GameCard';
import { useGames } from './hooks/useGames';

export default function Home() {
  const { collections, freePromos, loading, error } = useGames();
  const navigate = useNavigate();

  if (loading) {
    return <div className="p-12 text-center text-gray-400">Loading store...</div>;
  }

  if (error) {
    return <div className="p-12 text-center text-red-400">Failed to load store data. Please try again later.</div>;
  }

  const grids = collections.filter(c => c.type === 'Grid' || c.type === 'Spotlight');
  const lists = collections.filter(c => c.type === 'List');

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <HeroBanner />

      {/* Free Games Section */}
      <section className="mb-12 bg-[#202428] rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
            <h2 className="text-xl font-medium text-white">Free games!</h2>
          </div>
          <button 
            className="px-4 py-1.5 rounded border border-gray-600 text-sm hover:bg-gray-700 transition-all active:scale-95" 
            onClick={() => navigate('/news')}
          >
            View More
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {freePromos.map(game => (
            <GameCard key={game.id} game={game} layout="freePromo" />
          ))}
        </div>
      </section>

      {/* Grid Collections */}
      {grids.map(col => (
        <section key={col.title} className="mb-12">
          <h2 className="text-xl font-medium text-white mb-4">{col.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {col.games.map(game => (
              <GameCard key={game.id} game={game} layout={col.type.toLowerCase() as any} />
            ))}
          </div>
        </section>
      ))}

      {/* List Collections (Top Sellers, Most Played, etc) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-8 border-t border-gray-800">
        {lists.map(col => (
          <section key={col.title}>
            <div className="flex items-center justify-between mb-4 group cursor-pointer">
              <h2 className="text-lg font-medium text-white group-hover:text-brand-accent transition-colors">{col.title}</h2>
              <svg className="w-5 h-5 text-gray-500 group-hover:text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </div>
            <div className="flex flex-col gap-2">
              {col.games.map(game => (
                <GameCard key={game.id} game={game} layout="list" />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
