

import type { Achievement, SystemRequirements } from '../types';

export interface UserDTO {
  id: string;
  username: string;
  email: string;
  avatarUrl: string | null;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  refreshTokenExpiresAt: string;
  user: UserDTO;
}

export interface GameCreateDTO {
    title: string;
    description: string;
    price: number;
    developerId: string;
    genreIds: number[];
    tagIds: number[];
}

export interface GameReadDTO {
    id: string;
    title: string;
    description?: string;
    price: number;
    developerId?: string;
    developerName?: string;
    coverImageUrl: string | null;
    bannerImageUrl?: string | null;
    releaseDate: string;
    media?: { id: number; url: string | null; type: number }[];
    systemRequirements?: SystemRequirements[];
    achievements?: Achievement[];
    purchasedAt?: string;
    playtime?: number;
}
