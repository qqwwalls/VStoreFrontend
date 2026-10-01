import { Link } from 'react-router-dom';
import type { Game } from '../../types';

interface Props {
  game: Game;
  layout?: 'grid' | 'list' | 'spotlight' | 'freePromo';
}

export default function GameCard({ game, layout = 'grid' }: Props) {
  
  const renderPrice = () => {
    if (game.status === 'Coming soon' || game.status?.startsWith('Out on')) {
      return (
        <div className="mt-2 text-sm text-brand-text">
          {game.status}
        </div>
      );
    }
    
    if (game.price?.isFree) {
      return (
        <div className="mt-2 text-sm font-medium text-brand-text">
          Free
        </div>
      );
    }

    if ((game.price?.discountPercentage ?? 0) > 0) {
      return (
        <div className="mt-2 flex items-center gap-2 text-sm">
          <span className="bg-brand-accent text-black font-semibold px-1.5 py-0.5 rounded text-xs">
            -{game.price?.discountPercentage}%
          </span>
          <span className="text-brand-text-muted line-through text-xs">
            {game.price?.currency} {game.price?.base}
          </span>
          <span className="text-brand-text">
            {game.price?.currency} {game.price?.final}
          </span>
        </div>
      );
    }

    return (
      <div className="mt-2 text-sm text-brand-text">
        {game.price?.currency} {game.price?.base}
      </div>
    );
  };

  if (layout === 'list') {
    return (
      <Link to={`/game/${game.id}`} className="flex items-center gap-4 group cursor-pointer hover:bg-brand-surface-hover p-2 rounded-lg transition-colors">
        <img src={game.coverImageUrl} alt={game.title} className="w-16 h-20 object-cover rounded-md shadow-md group-hover:opacity-90 transition-opacity" />
        <div className="flex flex-col">
          <span className="text-brand-text font-medium text-sm group-hover:text-white">{game.title}</span>
          {renderPrice()}
        </div>
      </Link>
    );
  }

  if (layout === 'freePromo') {
    const isFreeNow = game.promoStatus === 'FREE NOW';
    return (
      <Link to={`/game/${game.id}`} className="flex flex-col group cursor-pointer">
        <div className="relative overflow-hidden rounded-t-lg">
          <img src={game.coverImageUrl} alt={game.title} className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className={`py-1.5 text-center text-xs font-semibold rounded-b-lg ${isFreeNow ? 'bg-brand-accent text-black' : 'bg-brand-surface text-brand-text'}`}>
          {game.promoStatus}
        </div>
        <div className="mt-3">
          <h4 className="text-brand-text font-medium text-sm">{game.title}</h4>
          <p className="text-brand-text-muted text-xs mt-1">{game.promoText}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/game/${game.id}`} className="flex flex-col group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg">
        <img 
          src={game.coverImageUrl} 
          alt={game.title} 
          className="w-full aspect-[3/4] object-cover rounded-lg shadow-md group-hover:opacity-90 transition-opacity"
        />
        {layout === 'spotlight' && (
          <div className="absolute bottom-0 left-0 right-0 bg-[#83b063]/90 text-white text-center py-1.5 text-xs font-medium backdrop-blur-sm rounded-b-lg">
            Deals of the Week
          </div>
        )}
      </div>
      <div className="mt-3 flex flex-col">
        {game.gameType && <span className="text-brand-text-muted text-[11px] uppercase tracking-wide">{game.gameType}</span>}
        <span className="text-brand-text font-medium text-sm mt-0.5 line-clamp-1 group-hover:text-white transition-colors">{game.title}</span>
        {renderPrice()}
      </div>
    </Link>
  );
}
