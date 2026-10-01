import { useNavigate } from "react-router-dom";

export default function HeroBanner() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-12">
      <div className="flex-1 relative rounded-2xl overflow-hidden cursor-pointer group">
        <img 
          src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172470/capsule_616x353.jpg" 
          alt="Apex Legends" 
          className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none"></div>
      </div>

      <div className="w-full lg:w-80 flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide">APEX LEGENDS</h2>
          <p className="text-gray-300 text-sm mt-1 uppercase tracking-wider">New Season</p>
        </div>

        <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-2">
          <div className="rounded-lg overflow-hidden h-28 cursor-pointer ring-2 ring-transparent hover:ring-gray-500 active:scale-95 transition-all">
            <img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2767030/capsule_616x353.jpg" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-lg overflow-hidden h-28 cursor-pointer ring-2 ring-transparent hover:ring-gray-500 active:scale-95 transition-all">
            <img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/capsule_616x353.jpg" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-white text-lg font-medium">FREE</span>
          <button 
            className="bg-brand-accent hover:bg-green-400 text-black px-8 py-3 rounded font-medium transition-all active:scale-95"
            onClick={() => navigate('/game/5')}
          >
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
}
