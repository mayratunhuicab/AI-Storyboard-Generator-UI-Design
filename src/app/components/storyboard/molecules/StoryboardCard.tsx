import React from 'react';
import { Edit3, Trash2, RefreshCw } from 'lucide-react';
import { StoryboardFrame } from '../../../types/storyboard';
import { StatusBadge } from '../atoms/StatusBadge';
import { IconButton } from '../atoms/IconButton';

interface StoryboardCardProps {
  frame: StoryboardFrame;
  onEdit: (frame: StoryboardFrame) => void;
  onDelete: (id: string) => void;
  onRegenerate: (id: string) => void;
  onImageLoad?: (id: string) => void;
}

export const StoryboardCard: React.FC<StoryboardCardProps> = ({
  frame,
  onEdit,
  onDelete,
  onRegenerate,
  onImageLoad,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);

  // Reset loading state if the imageUrl changes (e.g. regenerative seed change)
  React.useEffect(() => {
    setIsImageLoaded(false);
  }, [frame.imageUrl]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
    if (onImageLoad) {
      onImageLoad(frame.id);
    }
  };

  const showLoader = frame.status === 'generating' || (!isImageLoaded && frame.imageUrl);

  return (
    <div
      className="group relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-violet-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video relative overflow-hidden bg-slate-950">
        {showLoader && (
          <div className="absolute inset-0 z-10 w-full h-full flex items-center justify-center bg-slate-950">
            <div className="space-y-4 w-full p-4">
              <div className="h-4 bg-slate-800 rounded animate-pulse" />
              <div className="h-4 bg-slate-800 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-slate-800 rounded animate-pulse w-1/2" />
            </div>
          </div>
        )}

        {frame.imageUrl && (
          <img
            src={frame.imageUrl}
            alt={frame.prompt}
            onLoad={handleImageLoad}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${!isImageLoaded ? 'opacity-0' : 'opacity-100'}`}
          />
        )}

        {isHovered && frame.status === 'completed' && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-2">
              <IconButton
                icon={Edit3}
                variant="secondary"
                size="sm"
                label="Editar prompt"
                onClick={() => onEdit(frame)}
              />
              <IconButton
                icon={RefreshCw}
                variant="secondary"
                size="sm"
                label="Regenerar"
                onClick={() => onRegenerate(frame.id)}
              />
              <IconButton
                icon={Trash2}
                variant="secondary"
                size="sm"
                label="Eliminar"
                onClick={() => onDelete(frame.id)}
              />
            </div>
          </div>
        )}

        <div className="absolute top-3 right-3">
          <StatusBadge status={frame.status} />
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
          {frame.prompt}
        </p>
      </div>
    </div>
  );
};
