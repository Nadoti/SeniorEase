import { atom } from 'recoil';

export type ColorFilterMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

const localStorageEffect = (key: string) => ({ setSelf, onSet }: any) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(savedValue as ColorFilterMode);
  }

  onSet((newValue: ColorFilterMode, _: any, isReset: boolean) => {
    if (isReset) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, newValue);
      applyColorFilterToDOM(newValue);
    }
  });
};

export const applyColorFilterToDOM = (filter: ColorFilterMode) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (filter === 'none') {
    root.style.filter = '';
  } else {
    root.style.filter = `url(#seniorease-${filter})`;
  }
};

export const colorFilterState = atom<ColorFilterMode>({
  key: 'colorFilterState',
  default: 'none',
  effects: [
    localStorageEffect('seniorease_colorFilter'),
    () => {
      // Setup inicial garantindo injeção do filtro css via url SVG
      if (typeof window !== 'undefined') {
        const savedValue = localStorage.getItem('seniorease_colorFilter') as ColorFilterMode;
        if (savedValue) {
          applyColorFilterToDOM(savedValue);
        }
      }
    }
  ],
});
