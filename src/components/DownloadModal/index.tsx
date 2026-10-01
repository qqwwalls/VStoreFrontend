interface Props {
  isOpen: boolean;
  onClose: () => void;
  progress: number;
}

export default function DownloadModal({ isOpen, onClose, progress }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-brand-surface w-[400px] p-6 rounded-xl border border-gray-700 shadow-2xl relative">
        <h2 className="text-xl font-bold text-white mb-4">Downloading V-Store Desktop...</h2>
        <div className="w-full bg-gray-800 h-4 rounded-full overflow-hidden relative">
          <div 
            className="bg-brand-accent h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="mt-2 text-right text-sm text-gray-400">{progress}%</div>
        {progress >= 100 && (
          <button 
            onClick={onClose}
            className="mt-6 w-full py-2 bg-brand-accent text-black font-semibold rounded hover:bg-green-400"
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
}
