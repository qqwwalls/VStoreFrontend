import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import type { AuthSession } from '../types/backend';
import { readSession, saveSession } from './session';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
});

apiClient.interceptors.request.use(config => {
  const session = readSession();
  if (session) config.headers.Authorization = `Bearer ${session.accessToken}`;
  return config;
});

let refreshRequest: Promise<AuthSession> | null = null;

apiClient.interceptors.response.use(response => response, async (error: unknown) => {
  if (!axios.isAxiosError(error)) return Promise.reject(error);
  const config = error.config as (InternalAxiosRequestConfig & { retried?: boolean }) | undefined;
  const session = readSession();
  if (error.response?.status !== 401 || !config || config.retried || !session || config.url?.startsWith('/auth/')) {
    return Promise.reject(error);
  }
  config.retried = true;
  try {
    // Parallel requests share one refresh because refresh tokens are single-use.
    refreshRequest ??= axios.post<AuthSession>(`${apiClient.defaults.baseURL}/auth/refresh`, {
      refreshToken: session.refreshToken,
    }, { timeout: 10000 }).then(response => {
      const current = readSession();
      if (!current || current.refreshToken !== session.refreshToken) throw new Error('Session changed.');
      saveSession(response.data);
      return response.data;
    }).finally(() => { refreshRequest = null; });
    const refreshed = await refreshRequest;
    config.headers.Authorization = `Bearer ${refreshed.accessToken}`;
    return apiClient(config);
  } catch (refreshError) {
    if (axios.isAxiosError(refreshError) && [401, 403].includes(refreshError.response?.status ?? 0)
      && readSession()?.refreshToken === session.refreshToken) saveSession(null);
    return Promise.reject(refreshError);
  }
});

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string; errors?: Record<string, string[]> } | undefined;
    if (data?.message) return data.message;
    if (data?.errors) return Object.values(data.errors).flat().join(' ');
    if (!error.response) return 'Cannot reach the server. Please try again.';
    if (error.response.status === 401) return 'Please sign in to continue.';
  }
  return error instanceof Error ? error.message : 'Something went wrong. Please try again.';
}
