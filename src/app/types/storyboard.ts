export interface StoryboardFrame {
  id: string;
  prompt: string;
  imageUrl: string;
  status: 'generating' | 'completed' | 'error';
  timestamp: Date;
  seed?: number;
}

export interface StoryboardProject {
  id: string;
  title: string;
  description: string;
  frames: StoryboardFrame[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GenerationSettings {
  style: string;
  aspectRatio: string;
  quality: string;
  colorPalette: string;
}
