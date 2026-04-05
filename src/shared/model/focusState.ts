import { atom } from 'recoil';

export type FocusStyleType = 'solid' | 'dashed' | 'underline';

export type FocusConfig = {
  style: FocusStyleType;
  color: string;
  thickness: number;
};

const DEFAULT_FOCUS: FocusConfig = {
  style: 'solid',
  color: '#4EADFF',
  thickness: 4,
};

const localStorageEffect = (key: string) => ({ setSelf, onSet }: any) => {
  if (typeof window !== 'undefined') {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      try {
        const parsed = JSON.parse(savedValue);
        setSelf(parsed);
        applyFocusToRoot(parsed);
      } catch (e) {
        applyFocusToRoot(DEFAULT_FOCUS);
      }
    } else {
      applyFocusToRoot(DEFAULT_FOCUS);
    }

    onSet((newValue: FocusConfig, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
      applyFocusToRoot(newValue);
    });
  }
};

const applyFocusToRoot = (config: FocusConfig) => {
  if (typeof window !== 'undefined') {
    const root = document.documentElement;

    root.style.setProperty('--focus-color', config.color);
    root.style.setProperty('--focus-thickness', `${config.thickness}px`);

    if (config.style === 'underline') {
      root.style.setProperty('--focus-outline-width', '0px');
      root.style.setProperty('--focus-outline-style', 'solid');
      root.style.setProperty('--focus-shadow', `0 ${config.thickness}px 0 0 ${config.color}`);
    } else {
      root.style.setProperty('--focus-outline-width', `${config.thickness}px`);
      root.style.setProperty('--focus-outline-style', config.style);
      root.style.setProperty('--focus-shadow', 'none');
    }
  }
};

export const focusState = atom<FocusConfig>({
  key: 'focusState',
  default: DEFAULT_FOCUS,
  effects: [
    localStorageEffect('seniorease_focus'),
  ]
});
