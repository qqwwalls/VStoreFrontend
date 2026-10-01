export interface Price {
  isFree: boolean;
  base: number | null;
  discountPercentage: number;
  final: number | null;
  currency: string;
}

export interface Game {
  id: number;
  title: string;
  gameType?: string;
  coverImageUrl: string;
  bannerImageUrl?: string;
  description?: string;
  price?: Price;
  status?: string; // "Released", "Coming soon", "Out on 3/10/25"
  promoStatus?: string; // "FREE NOW", "FREE SOON"
  promoText?: string; 
}

export interface GameCollection {
  title: string;
  type: 'Grid' | 'List' | 'FreeGamesPromo' | 'Spotlight';
  games: Game[];
}
