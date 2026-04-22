import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { StoryboardFrame } from '../../../types/storyboard';

interface EditPromptModalProps {
  frame: StoryboardFrame | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (frameId: string, newPrompt: string) => void;
}

export const EditPromptModal: React.FC<EditPromptModalProps> = ({
  frame,
  isOpen,
  onClose,
  onSave,
}) => {
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    if (frame) {
      setPrompt(frame.prompt);
    }
  }, [frame]);

  if (!isOpen || !frame) return null;

  const handleSave = () => {
    onSave(frame.id, prompt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl w-full max-w-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-violet-600/10 to-indigo-600/10 border-b border-slate-800 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-100">Editar Prompt</h2>
                <p className="text-sm text-slate-400">Refina la descripción de tu escena</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-slate-800 flex items-center justify-center transition-colors text-slate-400 hover:text-slate-200"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Descripción de la Escena
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={6}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none transition-all"
              placeholder="Describe tu escena en detalle..."
            />
            <p className="text-xs text-slate-500 mt-2">
              Sé específico sobre iluminación, atmósfera, composición y elementos clave
            </p>
          </div>

          {frame.imageUrl && (
            <div className="rounded-lg overflow-hidden border border-slate-800">
              <img
                src={frame.imageUrl}
                alt="Cuadro actual"
                className="w-full h-48 object-cover"
              />
            </div>
          )}
        </div>

        <div className="bg-slate-950 border-t border-slate-800 p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 transition-all font-medium shadow-lg"
          >
            Guardar y Regenerar
          </button>
        </div>
      </div>
    </div>
  );
};
