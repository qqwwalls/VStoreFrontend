export interface Price {
  isFree: boolean;
  base: number | null;
  discountPercentage: number;
  final: number | null;
  currency: string;
}

export interface Game {
  id: string;
  title: string;
  gameType?: string;
  coverImageUrl: string;
  bannerImageUrl?: string;
  description?: string;
  price?: Price;
  status?: string; // "Released", "Coming soon", "Out on 3/10/25"
  promoStatus?: string; // "FREE NOW", "FREE SOON"
  promoText?: string; 
  developerName?: string;
  releaseDate?: string;
  purchasedAt?: string;
  playtime?: number;
  systemRequirements?: SystemRequirements[];
  achievements?: Achievement[];
}

export interface SystemRequirements {
  id: string;
  type: number;
  os: string | null;
  cpu: string | null;
  gpu: string | null;
  ram: string | null;
  storage: string | null;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconId: number | null;
}

export interface GameCollection {
  title: string;
  type: 'Grid' | 'List' | 'FreeGamesPromo' | 'Spotlight';
  games: Game[];
}
