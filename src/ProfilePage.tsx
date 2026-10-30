import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from './context/StoreContext';

export default function ProfilePage() {
  const { user, library, privateLoading, privateError, reloadPrivateData } = useStore();
  const [query, setQuery] = useState('');
  const games = library.filter(game => game.title.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-white">
      <div className="flex items-center gap-5 mb-10">
        <div className="w-20 h-20 shrink-0 rounded-full bg-brand-surface border border-gray-600 flex items-center justify-center text-3xl font-bold overflow-hidden">
          {user?.avatarUrl ? <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" /> : user?.username.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl font-bold break-words">{user?.username}</h1>
          <p className="text-gray-400 text-sm mt-1 break-words">{user?.email}</p>
          <p className="text-brand-accent text-sm mt-2">{library.length} games in library</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold">Your library</h2>
        <input aria-label="Search library" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search library" className="bg-brand-surface border border-gray-700 rounded px-4 py-2 text-sm max-w-full" />
      </div>
      {privateLoading ? <p className="text-gray-400">Loading your library...</p>
        : privateError ? <div role="alert" className="text-red-300"><p>{privateError}</p><button onClick={reloadPrivateData} className="text-brand-accent mt-3">Retry</button></div>
        : games.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {games.map(game => (
              <Link key={game.id} to={'/game/' + game.id} className="overflow-hidden border border-gray-800 rounded-lg hover:border-gray-500">
                <img src={game.bannerImageUrl || game.coverImageUrl} alt={game.title} className="w-full aspect-video object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold break-words">{game.title}</h3>
                  <p className="text-sm text-gray-400 mt-2">Added {game.purchasedAt ? new Date(game.purchasedAt).toLocaleDateString() : ''}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : <div className="py-12 border-t border-gray-800"><p className="text-gray-400">{query ? 'No games match your search.' : 'Your library is empty.'}</p><Link to="/" className="inline-block text-brand-accent mt-4">Browse games</Link></div>}
    </div>
  );
}
