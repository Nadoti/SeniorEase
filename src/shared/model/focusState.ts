import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';

export type FocusStyleType = 'solid' | 'dashed' | 'underline';

export type FocusConfig = {
  style: FocusStyleType;
  color: string;
  thickness: number;
};

export const DEFAULT_FOCUS: FocusConfig = {
  style: 'solid',
  color: '#4EADFF',
  thickness: 4,
};

export const applyFocusToRoot = (config: FocusConfig) => {
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

const baseFocusState = atomWithStorage<FocusConfig>('seniorease_focus', DEFAULT_FOCUS);

export const focusState = atom(
  (get) => get(baseFocusState),
  (get, set, update: FocusConfig | ((prev: FocusConfig) => FocusConfig)) => {
    const newValue = typeof update === 'function' ? update(get(baseFocusState)) : update;
    set(baseFocusState, newValue);
    applyFocusToRoot(newValue);
  }
);
