import { useState, useEffect } from 'react';
import type { Game } from '../types';
import { getGameById } from '../api/games';
import { getErrorMessage } from '../api/client';

export const useGame = (id: string | undefined) => {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    setGame(null);
    setError(null);
    if (!id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getGameById(id, controller.signal).then(data => {
      if (!controller.signal.aborted) setGame(data);
    }).catch(reason => {
      if (!controller.signal.aborted) setError(getErrorMessage(reason));
    }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [id]);
  return { game, loading, error };
};
