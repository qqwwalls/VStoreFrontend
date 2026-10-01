import { useState, useEffect } from 'react';
import type { Game, GameCollection } from '../types';
import { getMockCollections, getMockFreePromos } from '../api/games';

export const useGames = () => {
  const [collections, setCollections] = useState<GameCollection[]>([]);
  const [freePromos, setFreePromos] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);
        const [colRes, freeRes] = await Promise.all([
          getMockCollections(),
          getMockFreePromos()
        ]);
        setCollections(colRes);
        setFreePromos(freeRes);
      } catch (err) {
        console.warn('Backend not running or CORS issue. Falling back to mock data for UI safety net.', err);
        setCollections(getMockCollections());
        setFreePromos(getMockFreePromos());
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return { collections, freePromos, loading, error };
};
