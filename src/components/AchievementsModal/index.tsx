import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { Achievement } from '../../types';
import AchievementItem from '../AchievementItem';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
}

export default function AchievementsModal({ isOpen, onClose, achievements }: Props) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" aria-labelledby="achievements-title" className="bg-brand-surface w-full max-w-2xl rounded-lg shadow-2xl border border-gray-700 max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-center gap-3 p-6 border-b border-gray-800">
          <div><h2 id="achievements-title" className="text-xl font-bold text-white">Achievements</h2><p className="text-sm text-gray-400 mt-1">{achievements.length} available</p></div>
          <button aria-label="Close achievements" title="Close" onClick={onClose} className="p-2 text-gray-400 hover:text-white"><X size={20} /></button>
        </div>
        <div className="px-6 py-2">
          {achievements.length === 0 ? <p className="text-gray-400 py-4">No achievements have been provided.</p> : (
            <ul aria-label="All available achievements" className="divide-y divide-gray-800">{achievements.map(achievement => <li key={achievement.id}><AchievementItem achievement={achievement} /></li>)}</ul>
          )}
        </div>
      </section>
    </div>
  );
}
