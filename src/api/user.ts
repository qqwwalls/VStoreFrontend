import { apiClient } from './client';
import type { AuthSession, UserDTO } from '../types/backend';

export const login = async (email: string, password: string): Promise<AuthSession> => {
  const response = await apiClient.post<AuthSession>('/auth/login', { email, password });
  return response.data;
};

export const register = async (username: string, email: string, password: string): Promise<AuthSession> => {
  const response = await apiClient.post<AuthSession>('/auth/register', { username, email, password });
  return response.data;
};

export const getCurrentUser = async (id: string): Promise<UserDTO> => {
  const response = await apiClient.get<UserDTO>(`/user/${encodeURIComponent(id)}`);
  return response.data;
};

export const logout = async (refreshToken: string) => {
  await apiClient.post('/auth/logout', { refreshToken });
};
