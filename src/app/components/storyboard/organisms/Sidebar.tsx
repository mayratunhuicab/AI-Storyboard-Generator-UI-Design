import React from 'react';
import { Palette, Crop, Sparkles, Image } from 'lucide-react';
import { GenerationSettings } from '../../../types/storyboard';
import { SettingControl } from '../molecules/SettingControl';

interface SidebarProps {
  settings: GenerationSettings;
  onSettingsChange: (settings: GenerationSettings) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ settings, onSettingsChange }) => {
  return (
    <div className="w-80 bg-slate-950 border-r border-slate-800 flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-lg font-semibold text-slate-100 mb-1">Configuración de Generación</h2>
        <p className="text-sm text-slate-500">Configura el estilo visual de la IA</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <SettingControl
          label="Estilo Visual"
          value={settings.style}
          options={[
            { value: 'cinematic', label: 'Cinemático' },
            { value: 'anime', label: 'Anime' },
            { value: 'photorealistic', label: 'Fotorrealista' },
            { value: 'illustration', label: 'Ilustración' },
            { value: 'sketch', label: 'Boceto' },
            { value: '3d-render', label: 'Render 3D' },
          ]}
          onChange={(value) => onSettingsChange({ ...settings, style: value })}
          icon={<Sparkles size={16} className="text-violet-400" />}
        />

        <SettingControl
          label="Relación de Aspecto"
          value={settings.aspectRatio}
          options={[
            { value: '16:9', label: '16:9 (Horizontal)' },
            { value: '9:16', label: '9:16 (Vertical)' },
            { value: '1:1', label: '1:1 (Cuadrado)' },
            { value: '4:3', label: '4:3 (Clásico)' },
            { value: '21:9', label: '21:9 (Ultrawide)' },
          ]}
          onChange={(value) => onSettingsChange({ ...settings, aspectRatio: value })}
          icon={<Crop size={16} className="text-emerald-400" />}
        />

        <SettingControl
          label="Calidad"
          value={settings.quality}
          options={[
            { value: 'draft', label: 'Borrador (Rápido)' },
            { value: 'standard', label: 'Estándar' },
            { value: 'high', label: 'Alta Calidad' },
            { value: 'ultra', label: 'Ultra (Lento)' },
          ]}
          onChange={(value) => onSettingsChange({ ...settings, quality: value })}
          icon={<Image size={16} className="text-blue-400" />}
        />

        <SettingControl
          label="Paleta de Colores"
          value={settings.colorPalette}
          options={[
            { value: 'vibrant', label: 'Vibrante' },
            { value: 'muted', label: 'Apagado' },
            { value: 'monochrome', label: 'Monocromático' },
            { value: 'pastel', label: 'Pastel' },
            { value: 'dark', label: 'Oscuro y Dramático' },
            { value: 'warm', label: 'Tonos Cálidos' },
            { value: 'cool', label: 'Tonos Fríos' },
          ]}
          onChange={(value) => onSettingsChange({ ...settings, colorPalette: value })}
          icon={<Palette size={16} className="text-pink-400" />}
        />

        <div className="pt-6 border-t border-slate-800">
          <div className="bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border border-violet-500/20 rounded-lg p-4">
            <h3 className="text-sm font-medium text-slate-200 mb-2 flex items-center gap-2">
              <Sparkles size={14} className="text-violet-400" />
              Consejo Pro
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Usa prompts descriptivos con detalles específicos sobre iluminación, composición y atmósfera para mejores resultados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
