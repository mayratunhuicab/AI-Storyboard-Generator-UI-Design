import React, { useState } from 'react';
import { Toolbar } from './components/storyboard/organisms/Toolbar';
import { Sidebar } from './components/storyboard/organisms/Sidebar';
import { StoryboardGrid } from './components/storyboard/organisms/StoryboardGrid';
import { EditPromptModal } from './components/storyboard/organisms/modals/EditPromptModal';
import { mockProject, defaultSettings } from './data/mockData';
import { StoryboardFrame, GenerationSettings, StoryboardProject } from './types/storyboard';
import { toast } from 'sonner';
import { Toaster } from './components/ui/sonner';
import { generatePollinationsUrl } from './services/pollinations';

export default function App() {
  const [project, setProject] = useState<StoryboardProject>(mockProject);
  const [settings, setSettings] = useState<GenerationSettings>(defaultSettings);
  const [editingFrame, setEditingFrame] = useState<StoryboardFrame | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditFrame = (frame: StoryboardFrame) => {
    setEditingFrame(frame);
    setIsModalOpen(true);
  };

  const handleSavePrompt = (frameId: string, newPrompt: string) => {
    const newSeed = Math.floor(Math.random() * 1000000);
    const newImageUrl = generatePollinationsUrl(newPrompt, settings, newSeed);

    setProject((prev) => ({
      ...prev,
      frames: prev.frames.map((frame) =>
        frame.id === frameId
          ? { 
              ...frame, 
              prompt: newPrompt, 
              imageUrl: newImageUrl,
              status: 'generating' as const,
              seed: newSeed 
            }
          : frame
      ),
    }));

    toast.success('¡Prompt actualizado! Generando cuadro...', {
      description: 'Esto puede tomar unos momentos dependiendo de la complejidad',
    });
  };

  const handleImageLoad = (frameId: string) => {
    setProject((prev) => ({
      ...prev,
      frames: prev.frames.map((frame) =>
        frame.id === frameId ? { ...frame, status: 'completed' as const } : frame
      ),
    }));
  };

  const handleDeleteFrame = (frameId: string) => {
    setProject((prev) => ({
      ...prev,
      frames: prev.frames.filter((frame) => frame.id !== frameId),
    }));
    toast.info('Cuadro eliminado');
  };

  const handleRegenerateFrame = (frameId: string) => {
    const frame = project.frames.find(f => f.id === frameId);
    if (!frame) return;

    const newSeed = Math.floor(Math.random() * 1000000);
    const newImageUrl = generatePollinationsUrl(frame.prompt, settings, newSeed);

    setProject((prev) => ({
      ...prev,
      frames: prev.frames.map((f) =>
        f.id === frameId ? { ...f, imageUrl: newImageUrl, seed: newSeed, status: 'generating' as const } : f
      ),
    }));

    toast.info('Regenerando cuadro...', {
      description: 'Generando una nueva versión...',
    });
  };

  const handleAddFrame = () => {
    const newSeed = Math.floor(Math.random() * 1000000);
    const newFrame: StoryboardFrame = {
      id: `frame-${Date.now()}`,
      prompt: 'Descripción de nueva escena...',
      imageUrl: generatePollinationsUrl('Descripción de nueva escena...', settings, newSeed),
      status: 'generating',
      timestamp: new Date(),
      seed: newSeed,
    };

    setProject((prev) => ({
      ...prev,
      frames: [...prev.frames, newFrame],
    }));

    setEditingFrame(newFrame);
    setIsModalOpen(true);
  };

  const handleExport = () => {
    toast.success('Exportando storyboard...', {
      description: 'La descarga comenzará en breve',
    });
  };

  const handleShare = () => {
    toast.success('¡Enlace copiado!', {
      description: 'Cualquiera con el enlace puede ver este storyboard',
    });
  };

  const handlePresent = () => {
    toast.info('Modo presentación', {
      description: 'Presiona ESC para salir de pantalla completa',
    });
  };

  const handleGenerate = () => {
    toast.success('Generando todos los cuadros...', {
      description: `Aplicando estilo ${settings.style} a todo el storyboard`,
    });

    setProject((prev) => ({
      ...prev,
      frames: prev.frames.map(frame => ({
        ...frame,
        imageUrl: generatePollinationsUrl(frame.prompt, settings, Math.floor(Math.random() * 1000000)),
        status: 'generating' as const
      }))
    }));
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100">
      <Toaster position="bottom-right" />

      <Toolbar
        projectTitle={project.title}
        onExport={handleExport}
        onShare={handleShare}
        onPresent={handlePresent}
        onGenerate={handleGenerate}
      />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar settings={settings} onSettingsChange={setSettings} />

        <StoryboardGrid
          frames={project.frames}
          onEditFrame={handleEditFrame}
          onDeleteFrame={handleDeleteFrame}
          onRegenerateFrame={handleRegenerateFrame}
          onAddFrame={handleAddFrame}
          onImageLoad={handleImageLoad}
        />
      </div>

      <EditPromptModal
        frame={editingFrame}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePrompt}
      />
    </div>
  );
}