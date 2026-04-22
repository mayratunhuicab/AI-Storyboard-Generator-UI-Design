import React from 'react';
import { Plus } from 'lucide-react';
import { StoryboardFrame } from '../../../types/storyboard';
import { StoryboardCard } from '../molecules/StoryboardCard';

interface StoryboardGridProps {
  frames: StoryboardFrame[];
  onEditFrame: (frame: StoryboardFrame) => void;
  onDeleteFrame: (id: string) => void;
  onRegenerateFrame: (id: string) => void;
  onAddFrame: () => void;
  onImageLoad?: (id: string) => void;
}

export const StoryboardGrid: React.FC<StoryboardGridProps> = ({
  frames,
  onEditFrame,
  onDeleteFrame,
  onRegenerateFrame,
  onAddFrame,
  onImageLoad,
}) => {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {frames.map((frame) => (
            <StoryboardCard
              key={frame.id}
              frame={frame}
              onEdit={onEditFrame}
              onDelete={onDeleteFrame}
              onRegenerate={onRegenerateFrame}
              onImageLoad={onImageLoad}
            />
          ))}

          <button
            onClick={onAddFrame}
            className="aspect-video bg-slate-900 rounded-xl border-2 border-dashed border-slate-700 hover:border-violet-500 transition-all duration-300 flex flex-col items-center justify-center gap-3 group hover:bg-slate-800/50"
          >
            <div className="w-16 h-16 rounded-full bg-slate-800 group-hover:bg-violet-500/20 flex items-center justify-center transition-all duration-300 border-2 border-slate-700 group-hover:border-violet-500">
              <Plus size={28} className="text-slate-500 group-hover:text-violet-400 transition-colors" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-400 group-hover:text-slate-300">Agregar Nuevo Cuadro</p>
              <p className="text-xs text-slate-600 mt-1">Crear otra escena</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
