import SidebarDrawer from '../SidebarDrawer/index';
import { useStore } from '../../context/StoreContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistSidebar({ isOpen, onClose }: Props) {
  const { wishlist, removeFromWishlist, privateLoading, privateError, reloadPrivateData } = useStore();

  return (
    <SidebarDrawer isOpen={isOpen} onClose={onClose} title="Wishlist">
      {privateLoading ? <p className="p-4 text-gray-400">Loading wishlist...</p> : privateError ? <div role="alert" className="p-4 text-red-300"><p>{privateError}</p><button onClick={reloadPrivateData} className="text-brand-accent mt-3">Retry</button></div> : wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          <p>You haven't added anything yet.</p>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-4">
            {wishlist.map(game => (
              <div key={game.id} className="flex gap-4 items-center bg-gray-800 p-3 rounded-lg relative group">
                <img src={game.coverImageUrl} className="w-16 h-16 object-cover rounded" alt={game.title} />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{game.title}</p>
                  <p className="text-brand-accent text-sm">{game.price?.final ? `${game.price.currency} ${game.price.final}` : 'Free'}</p>
                </div>
                <button aria-label={'Remove ' + game.title + ' from wishlist'} title="Remove from wishlist" onClick={() => void removeFromWishlist(game.id)} className="text-gray-400 hover:text-red-400 p-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </SidebarDrawer>
  );
}
