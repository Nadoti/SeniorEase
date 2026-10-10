import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';
export type ColorFilterMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';
export const applyColorFilterToDOM = (filter: ColorFilterMode) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (filter === 'none') {
    root.style.filter = '';
  } else {
    root.style.filter = `url(#seniorease-${filter})`;
  }
};
const baseColorFilterState = atomWithStorage<ColorFilterMode>('seniorease_colorFilter', 'none');
export const colorFilterState = atom(
  (get) => get(baseColorFilterState),
  (get, set, update: ColorFilterMode | ((prev: ColorFilterMode) => ColorFilterMode)) => {
    const newValue = typeof update === 'function' ? update(get(baseColorFilterState)) : update;
    set(baseColorFilterState, newValue);
    applyColorFilterToDOM(newValue);
  }
);
