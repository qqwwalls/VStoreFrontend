const mockNews = [
  {
    id: 1,
    title: "Star Wars Jedi: Survivor gets a new performance patch fixing long standing issues",
    excerpt: "After a long wait, players can finally experience the game at a stable framerate.",
    imageUrl: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1774580/capsule_616x353.jpg",
    timeAgo: "2 hours ago"
  },
  {
    id: 2,
    title: "Black Myth Wukong reaches 10 million copies sold in first week",
    excerpt: "The action RPG has broken multiple records on Steam and consoles.",
    imageUrl: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/capsule_616x353.jpg",
    timeAgo: "4 hours ago"
  },
  {
    id: 3,
    title: "Helldivers 2 new warbond brings explosive new weapons",
    excerpt: "Super Earth command has authorized the deployment of new incendiary shotguns.",
    imageUrl: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/553850/capsule_616x353.jpg",
    timeAgo: "5 hours ago"
  },
  {
    id: 4,
    title: "Hollow Knight Silksong rated by Australian classification board",
    excerpt: "Could this mean the highly anticipated sequel is finally releasing soon?",
    imageUrl: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1036800/capsule_616x353.jpg",
    timeAgo: "1 day ago"
  }
];

export default function NewsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Relevant News</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockNews.map((news) => (
          <div key={news.id} className="bg-brand-surface border border-gray-800 rounded-xl overflow-hidden shadow-xl hover:border-gray-600 transition-colors group cursor-pointer">
            <div className="relative">
              <img src={news.imageUrl} alt={news.title} className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 rounded text-xs text-white font-medium">
                {news.timeAgo}
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-lg font-bold text-white mb-3 line-clamp-2">{news.title}</h2>
              <p className="text-sm text-gray-400 mb-6 line-clamp-2">{news.excerpt}</p>
              <button className="text-sm font-bold text-brand-accent hover:underline">
                Read more
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
