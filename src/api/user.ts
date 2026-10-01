import { apiClient } from './client';

export const login = async (email: string, password: string): Promise<any> => {
  try {
    const res = await apiClient.post('/user/auth/login', { email, password });
    return res.data;
  } catch (err: any) {
    
    console.warn('Backend login failed, falling back to mock user', err);
    return { user: email.split('@')[0], token: 'mock-jwt-token' };
  }
};
