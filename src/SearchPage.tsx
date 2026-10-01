import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMockCollections, getMockFreePromos } from './api/games';
import type { Game } from './types';
import GameCard from './components/GameCard';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearch = async () => {
      setLoading(true);
      try {
        const collections = await getMockCollections();
        const promos = await getMockFreePromos();
        const allGames = [...collections.flatMap(c => c.games), ...promos];
        const uniqueGames = Array.from(new Map(allGames.map(g => [g.id, g])).values());
        
        const filtered = uniqueGames.filter(g => g.title.toLowerCase().includes(query.toLowerCase()));
        setGames(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    if (query) {
      fetchSearch();
    } else {
      setGames([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Search Results</h1>
      <p className="text-gray-400 mb-8">Showing results for: <span className="text-white font-medium">"{query}"</span></p>
      
      {loading ? (
        <div className="text-gray-400">Searching...</div>
      ) : games.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {games.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-brand-surface rounded-xl border border-gray-800">
          <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <h2 className="text-xl font-bold text-white mb-2">No games found</h2>
          <p className="text-gray-400">Try adjusting your search terms.</p>
        </div>
      )}
    </div>
  );
}
