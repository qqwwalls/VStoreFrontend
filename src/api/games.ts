import type { Game, GameCollection as Collection } from '../types';

export function getMockCollections(): Collection[] {
  return [
    {
      title: 'Discover Something New',
      type: 'Grid',
      games: [
        { id: 1, title: 'The Sims 4', coverImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222670/capsule_616x353.jpg' },
        { id: 2, title: 'The WereCleaner', coverImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2795000/capsule_616x353.jpg' },
        { id: 3, title: 'PUBG: BATTLEGROUNDS', coverImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/578080/capsule_616x353.jpg' },
        { id: 4, title: 'Kingdom Come Deliverance II', coverImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1771300/capsule_616x353.jpg' },
        { id: 5, title: 'Overwatch 2', coverImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2356200/capsule_616x353.jpg' }
      ]
    },
    {
      title: 'Winter Sale Spotlight',
      type: 'Spotlight',
      games: [
        { id: 20, title: 'The End of the Sun', gameType: 'Base Game', coverImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/capsule_616x353.jpg' },
        { id: 21, title: 'Ranch Simulator', gameType: 'Base Game', coverImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1119730/capsule_616x353.jpg' },
        { id: 22, title: 'FARCRY 3', gameType: 'Base Game', coverImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220240/capsule_616x353.jpg' },
        { id: 23, title: 'FARCRY 4', gameType: 'Base Game', coverImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/298110/capsule_616x353.jpg' },
        { id: 24, title: 'FARCRY 5', gameType: 'Base Game', coverImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/552520/capsule_616x353.jpg' }
      ]
    },
    {
      title: 'Top Sellers',
      type: 'List',
      games: [
        { id: 30, title: 'Marvel Rivals', coverImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2767030/capsule_616x353.jpg' },
        { id: 31, title: 'Counter-Strike 2', coverImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/capsule_616x353.jpg' },
        { id: 32, title: 'Red Dead Redemption 2', coverImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/capsule_616x353.jpg' }
      ]
    },
    {
      title: 'Most Played',
      type: 'List',
      games: [
        { id: 40, title: 'Cyberpunk 2077', coverImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/capsule_616x353.jpg' },
        { id: 41, title: 'Warframe', coverImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/230410/capsule_616x353.jpg' },
        { id: 42, title: 'Red Dead Redemption 2', coverImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/capsule_616x353.jpg' }
      ]
    },
    {
      title: 'Top Upcoming',
      type: 'List',
      games: [
        { id: 50, title: 'Assassin\'s Creed Shadows', coverImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2824660/capsule_616x353.jpg' },
        { id: 51, title: 'Miki Royale', coverImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222670/capsule_616x353.jpg' },
        { id: 52, title: 'Path of Exile 2', coverImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/238960/capsule_616x353.jpg' }
      ]
    }
  ];
}

export function getMockFreePromos(): Game[] {
  return [
    { id: 10, title: 'Garden Story', coverImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1062140/capsule_616x353.jpg' },
    { id: 11, title: 'MAGES OF MYSTRALIA', coverImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/529660/capsule_616x353.jpg' },
    { id: 12, title: "Them's Fighting Herds", coverImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/574980/capsule_616x353.jpg' }
  ];
}

export async function getGameById(id: number): Promise<Game> {
  const allCollections = getMockCollections();
  for (const collection of allCollections) {
    const game = collection.games.find(g => g.id === id);
    if (game) {
      return {
        ...game,
        price: { isFree: false, base: 515, discountPercentage: 0, final: 515, currency: 'UAH' },
        status: 'Coming Soon'
      };
    }
  }

  const promos = getMockFreePromos();
  const promo = promos.find(g => g.id === id);
  if (promo) {
    return {
      ...promo,
      price: { isFree: true, base: 0, discountPercentage: 0, final: 0, currency: 'UAH' },
      status: 'Available Now'
    };
  }

  return {
    id,
    title: 'The End of the Sun',
    gameType: 'Base Game',
    coverImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/capsule_616x353.jpg',
    bannerImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/capsule_616x353.jpg',
    price: { isFree: false, base: 515, discountPercentage: 0, final: 515, currency: 'UAH' },
    status: 'Coming Soon'
  };
}
