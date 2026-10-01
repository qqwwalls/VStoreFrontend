import { useState, useEffect } from 'react';
import type { Game } from '../types';
import { getGameById } from '../api/games';

export const useGame = (id: string | undefined) => {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchGame = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getGameById(Number(id));
        setGame(data);
      } catch (err) {
        console.warn('Failed to fetch game details from backend, falling back to mock.', err);
        getGameById(Number(id)).then(setGame);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  return { game, loading, error };
};
