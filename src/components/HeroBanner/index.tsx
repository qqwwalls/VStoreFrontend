import { Link } from 'react-router-dom';
import type { Game } from '../../types';

export default function HeroBanner({ game }: { game?: Game }) {
  if (!game) return null;
  return (
    <section className="relative w-full aspect-[16/7] min-h-[240px] max-h-[380px] mb-10 overflow-hidden rounded-lg bg-brand-surface">
      <img src={game.bannerImageUrl || game.coverImageUrl} alt={game.title} fetchPriority="high" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute left-6 right-6 bottom-6 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold text-white break-words">{game.title}</h1>
          <p className="text-white mt-2">{game.price?.isFree ? 'Free to play' : game.price?.currency + ' ' + game.price?.final}</p>
        </div>
        <Link to={'/game/' + game.id} className="bg-brand-accent hover:bg-green-400 text-black px-6 py-3 rounded font-medium shrink-0">View game</Link>
      </div>
    </section>
  );
}
