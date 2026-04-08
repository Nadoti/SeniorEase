import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';

export type TypographyConfig = {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
};

export const DEFAULT_TYPOGRAPHY: TypographyConfig = {
  fontFamily: 'Inter',
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 1.5,
  letterSpacing: 0,
};

export const applyTypographyToRoot = (config: TypographyConfig) => {
  if (typeof window !== 'undefined') {
    const root = document.documentElement;
    root.style.setProperty('--font-family', `"${config.fontFamily}", system-ui, -apple-system, sans-serif`);
    root.style.setProperty('--dynamic-text-size', `${config.fontSize}px`);
    root.style.setProperty('--dynamic-text-weight', `${config.fontWeight}`);
    root.style.setProperty('--dynamic-line-height', `${config.lineHeight}`);
    root.style.setProperty('--dynamic-letter-spacing', `${config.letterSpacing}em`);
  }
};

const baseTypographyState = atomWithStorage<TypographyConfig>('seniorease_typography', DEFAULT_TYPOGRAPHY);

export const typographyState = atom(
  (get) => get(baseTypographyState),
  (get, set, update: TypographyConfig | ((prev: TypographyConfig) => TypographyConfig)) => {
    const newValue = typeof update === 'function' ? update(get(baseTypographyState)) : update;
    set(baseTypographyState, newValue);
    applyTypographyToRoot(newValue);
  }
);
