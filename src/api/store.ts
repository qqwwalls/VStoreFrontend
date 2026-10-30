import { apiClient } from './client';
import { fromApiGame } from './games';
import type { GameReadDTO } from '../types/backend';

export async function getWishlist(signal?: AbortSignal) {
  const response = await apiClient.get<GameReadDTO[]>('/wishlist', { signal });
  return response.data.map(fromApiGame);
}

export async function addWishlistGame(id: string) {
  await apiClient.post(`/wishlist/${encodeURIComponent(id)}`);
}

export async function removeWishlistGame(id: string) {
  await apiClient.delete(`/wishlist/${encodeURIComponent(id)}`);
}

export async function getLibrary(signal?: AbortSignal) {
  const response = await apiClient.get<GameReadDTO[]>('/library', { signal });
  return response.data.map(fromApiGame);
}

export interface CheckoutOptions {
  demoPurchasesEnabled: boolean;
}

export async function getCheckoutOptions(signal?: AbortSignal): Promise<CheckoutOptions> {
  const response = await apiClient.get<CheckoutOptions>('/library/checkout-options', { signal });
  return response.data;
}

export async function acquireGames(gameIds: string[], demoPurchase = false) {
  const response = await apiClient.post<GameReadDTO[]>('/library/acquire', { gameIds, demoPurchase });
  return response.data.map(fromApiGame);
}
