import { useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import type { GameCollection } from '../types';

export const useGames = () => {
  const { catalogue, catalogueLoading, catalogueError, reloadCatalogue } = useStore();
  const collections = useMemo<GameCollection[]>(() => catalogue.length ? [{
    title: 'Explore the catalogue',
    type: 'Grid',
    games: catalogue,
  }] : [], [catalogue]);
  const freePromos = catalogue.filter(game => game.price?.isFree && game.status === 'Released').slice(0, 3);
  return { games: catalogue, collections, freePromos, loading: catalogueLoading, error: catalogueError, retry: reloadCatalogue };
};
