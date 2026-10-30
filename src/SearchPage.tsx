import { useSearchParams } from 'react-router-dom';
import { useStore } from './context/StoreContext';
import GameCard from './components/GameCard';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { catalogue, catalogueLoading, catalogueError, reloadCatalogue } = useStore();
  const games = catalogue.filter(game => game.title.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-white mb-6">Search the store</h1>
      <input aria-label="Search games" type="search" value={query} onChange={event => setSearchParams({ q: event.target.value }, { replace: true })} className="w-full max-w-lg bg-brand-surface border border-gray-700 rounded px-4 py-3 text-white mb-8" placeholder="Search games" />
      {catalogueLoading ? <p className="text-gray-400">Searching...</p>
        : catalogueError ? <div role="alert" className="text-red-300"><p>{catalogueError}</p><button onClick={reloadCatalogue} className="text-brand-accent mt-3">Retry</button></div>
        : games.length ? <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">{games.map(game => <GameCard key={game.id} game={game} />)}</div>
        : <p className="text-gray-400 py-12">No games found.</p>}
    </div>
  );
}
