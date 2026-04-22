import React from 'react';
import { Download, Share2, Presentation, Sparkles } from 'lucide-react';
import { IconButton } from '../atoms/IconButton';

interface ToolbarProps {
  projectTitle: string;
  onExport: () => void;
  onShare: () => void;
  onPresent: () => void;
  onGenerate: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  projectTitle,
  onExport,
  onShare,
  onPresent,
  onGenerate,
}) => {
  return (
    <div className="h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-100">{projectTitle}</h1>
            <p className="text-xs text-slate-500">Generador de Storyboards IA</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onGenerate}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Sparkles size={18} />
          <span className="font-medium">Generar Cuadros</span>
        </button>

        <div className="w-px h-6 bg-slate-800 mx-2" />

        <IconButton icon={Presentation} label="Presentar" onClick={onPresent} />
        <IconButton icon={Share2} label="Compartir" onClick={onShare} />
        <IconButton icon={Download} label="Exportar" onClick={onExport} />
      </div>
    </div>
  );
};
