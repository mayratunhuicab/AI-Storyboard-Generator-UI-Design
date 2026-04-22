import { GenerationSettings } from '../types/storyboard';

/**
 * Generates a Pollinations AI image URL based on the prompt and settings.
 * Documentation: https://pollinations.ai/
 */
export const generatePollinationsUrl = (
  prompt: string,
  settings: GenerationSettings,
  seed?: number
): string => {
  // Base URL for Pollinations AI image generation
  const baseUrl = 'https://image.pollinations.ai/prompt/';

  // Clean and encode the prompt
  // We append style and other settings to the prompt for better results
  const enhancedPrompt = `${prompt}, ${settings.style} style, ${settings.colorPalette} color palette, ultra high quality, ${settings.quality} detail`;
  const encodedPrompt = encodeURIComponent(enhancedPrompt);

  // Map aspect ratio strings to width/height
  let width = 1024;
  let height = 1024;

  if (settings.aspectRatio === '16:9') {
    width = 1280;
    height = 720;
  } else if (settings.aspectRatio === '4:3') {
    width = 1024;
    height = 768;
  } else if (settings.aspectRatio === '9:16') {
    width = 720;
    height = 1280;
  } else if (settings.aspectRatio === '21:9') {
    width = 1280;
    height = 548;
  }

  // Build query parameters
  const params = new URLSearchParams();
  params.append('width', width.toString());
  params.append('height', height.toString());
  params.append('nologo', 'true');
  
  if (seed !== undefined) {
    params.append('seed', seed.toString());
  } else {
    // Generate a random seed if none provided to ensure variety
    params.append('seed', Math.floor(Math.random() * 1000000).toString());
  }

  return `${baseUrl}${encodedPrompt}?${params.toString()}`;
};
