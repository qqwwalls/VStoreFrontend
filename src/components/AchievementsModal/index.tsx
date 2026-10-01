interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AchievementsModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  const mockAchievements = [
    { id: 1, title: 'First Steps', desc: 'Complete the tutorial', percent: '85.5%', iconColor: 'text-yellow-500', bgColor: 'bg-yellow-500/20' },
    { id: 2, title: 'Expert Explorer', desc: 'Visit every location on the map', percent: '42.1%', iconColor: 'text-blue-400', bgColor: 'bg-blue-400/20' },
    { id: 3, title: 'Master of Combat', desc: 'Defeat 1000 enemies', percent: '15.3%', iconColor: 'text-red-500', bgColor: 'bg-red-500/20' },
    { id: 4, title: 'Speedrunner', desc: 'Finish the game in under 2 hours', percent: '2.4%', iconColor: 'text-purple-500', bgColor: 'bg-purple-500/20' },
    { id: 5, title: 'Completionist', desc: 'Unlock all other achievements', percent: '0.8%', iconColor: 'text-yellow-300', bgColor: 'bg-yellow-300/20' },
    { id: 6, title: 'Sharpshooter', desc: 'Land 100 headshots in a row', percent: '5.1%', iconColor: 'text-green-500', bgColor: 'bg-green-500/20' },
    { id: 7, title: 'Survivor', desc: 'Survive for 10 days without dying', percent: '12.8%', iconColor: 'text-orange-500', bgColor: 'bg-orange-500/20' }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-brand-surface w-full max-w-4xl rounded-xl shadow-2xl border border-gray-700 relative overflow-hidden flex flex-col max-h-[85vh]">
        
        <div className="flex justify-between items-center p-6 border-b border-gray-800 flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wide">Achievements</h2>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <span className="text-gray-400">33 of 96 (34%)</span>
              <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-brand-accent w-[34%]"></div>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          {mockAchievements.map((ach) => (
            <div key={ach.id} className="flex items-center gap-6 p-4 bg-brand-bg border border-gray-800 rounded-lg hover:border-gray-600 transition-colors">
              <div className={`w-16 h-16 rounded-lg ${ach.bgColor} border border-gray-700 flex items-center justify-center flex-shrink-0`}>
                <svg className={`w-8 h-8 ${ach.iconColor}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">{ach.title}</h3>
                <p className="text-sm text-gray-400">{ach.desc}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 font-medium">{ach.percent}</div>
                <div className="text-xs text-gray-600">players unlocked</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
