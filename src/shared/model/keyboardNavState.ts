import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';

const baseKeyboardNavState = atomWithStorage<boolean>('seniorease_keyboardNav', true);

export const keyboardNavState = atom(
  (get) => get(baseKeyboardNavState),
  (get, set, update: boolean | ((prev: boolean) => boolean)) => {
    const newValue = typeof update === 'function' ? update(get(baseKeyboardNavState)) : update;
    set(baseKeyboardNavState, newValue);
  }
);
