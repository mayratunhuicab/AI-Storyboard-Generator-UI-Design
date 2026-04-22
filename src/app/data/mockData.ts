import { StoryboardProject, GenerationSettings } from '../types/storyboard';
import { generatePollinationsUrl } from '../services/pollinations';

const defaultSettings: GenerationSettings = {
  style: 'cinematic',
  aspectRatio: '16:9',
  quality: 'high',
  colorPalette: 'vibrant',
};

export const mockProject: StoryboardProject = {
  id: '1',
  title: 'Exploración de Ciudad Futurista',
  description: 'Un viaje visual a través de una metrópolis cyberpunk iluminada por neones',
  createdAt: new Date(),
  updatedAt: new Date(),
  frames: [
    {
      id: '1',
      prompt: 'Plano general amplio de una ciudad cyberpunk futurista de noche con luces de neón',
      imageUrl: generatePollinationsUrl('Plano general amplio de una ciudad cyberpunk futurista de noche con luces de neón', defaultSettings, 123456),
      status: 'generating',
      timestamp: new Date(),
      seed: 123456,
    },
    {
      id: '2',
      prompt: 'Vista a nivel de calle con calles mojadas por la lluvia reflejando anuncios holográficos coloridos',
      imageUrl: generatePollinationsUrl('Vista a nivel de calle con calles mojadas por la lluvia reflejando anuncios holográficos coloridos', defaultSettings, 234567),
      status: 'generating',
      timestamp: new Date(),
      seed: 234567,
    },
    {
      id: '3',
      prompt: 'Primer plano de un personaje con vestimenta futurista y accesorios tecnológicos brillantes',
      imageUrl: generatePollinationsUrl('Primer plano de un personaje con vestimenta futurista y accesorios tecnológicos brillantes', defaultSettings, 345678),
      status: 'generating',
      timestamp: new Date(),
      seed: 345678,
    },
    {
      id: '4',
      prompt: 'Interior de un laboratorio de alta tecnología con pantallas holográficas y equipo avanzado',
      imageUrl: generatePollinationsUrl('Interior de un laboratorio de alta tecnología con pantallas holográficas y equipo avanzado', defaultSettings, 456789),
      status: 'generating',
      timestamp: new Date(),
      seed: 456789,
    },
  ],
};

export { defaultSettings };
