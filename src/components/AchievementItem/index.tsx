import { Trophy } from 'lucide-react';
import type { Achievement } from '../../types';

export default function AchievementItem({ achievement }: { achievement: Achievement }) {
  return (
    <div className="flex items-start gap-4 py-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-yellow-400/25 bg-yellow-400/5 text-yellow-400">
        <Trophy size={22} aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <h3 className="font-semibold text-white break-words">{achievement.title}</h3>
        <p className="text-sm leading-relaxed text-gray-400 mt-1 break-words">{achievement.description}</p>
      </div>
    </div>
  );
}
