import { atom } from 'recoil';

export type TypographyConfig = {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
};

const DEFAULT_TYPOGRAPHY: TypographyConfig = {
  fontFamily: 'Inter',
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 1.5,
  letterSpacing: 0,
};

// Atom effect that reads from localstorage and applies CSS variables on change
const localStorageEffect = (key: string) => ({ setSelf, onSet }: any) => {
  // Safe check for browser environment
  if (typeof window !== 'undefined') {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      try {
        const parsed = JSON.parse(savedValue);
        setSelf(parsed);
        applyTypographyToRoot(parsed); // Apply immediately on load
      } catch (e) {
        applyTypographyToRoot(DEFAULT_TYPOGRAPHY);
      }
    } else {
      applyTypographyToRoot(DEFAULT_TYPOGRAPHY);
    }

    onSet((newValue: TypographyConfig, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
      applyTypographyToRoot(newValue);
    });
  }
};

const applyTypographyToRoot = (config: TypographyConfig) => {
  if (typeof window !== 'undefined') {
    const root = document.documentElement;
    // Font Family goes to root CSS so it affects entire project
    root.style.setProperty('--font-family', `"${config.fontFamily}", system-ui, -apple-system, sans-serif`);
    
    // As per user request, size and weight apply dynamically but conditionally
    root.style.setProperty('--dynamic-text-size', `${config.fontSize}px`);
    root.style.setProperty('--dynamic-text-weight', `${config.fontWeight}`);
    root.style.setProperty('--dynamic-line-height', `${config.lineHeight}`);
    root.style.setProperty('--dynamic-letter-spacing', `${config.letterSpacing}em`);
  }
};

export const typographyState = atom<TypographyConfig>({
  key: 'typographyState',
  default: DEFAULT_TYPOGRAPHY,
  effects: [
    localStorageEffect('seniorease_typography'),
  ]
});
