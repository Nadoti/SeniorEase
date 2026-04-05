import { atom } from 'recoil';

const isBrowser = typeof window !== 'undefined';
const getKey = () => isBrowser ? localStorage.getItem('seniorease_keyboardNav') : null;
const initialVal = getKey() !== null ? JSON.parse(getKey() as string) : true;

export const keyboardNavState = atom<boolean>({
  key: 'keyboardNavState',
  default: initialVal,
  effects: [
    ({ onSet }) => {
      onSet(newValue => {
        if (isBrowser) {
          localStorage.setItem('seniorease_keyboardNav', JSON.stringify(newValue));
        }
      });
    },
  ],
});
