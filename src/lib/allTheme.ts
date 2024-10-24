import themes from '../assets/themes.json';
import type { Theme } from './types';

export const allThemes: Theme[] = themes.themes.map((theme, index) => ({ ...theme, id: index }));