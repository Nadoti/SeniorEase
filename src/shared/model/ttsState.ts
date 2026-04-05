import { atom } from 'recoil';

export interface TTSState {
  enabled: boolean;
  rate: number;
  volume: number; // 0 to 100
}

const defaultState: TTSState = {
  enabled: true,
  rate: 1.0,
  volume: 100,
};

const localStorageEffect = (key: string) => ({ setSelf, onSet }: any) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    try {
      setSelf(JSON.parse(savedValue));
    } catch (e) {
      console.error('Error parsing TTS State from LocalStorage', e);
    }
  }

  onSet((newValue: TTSState, _: any, isReset: boolean) => {
    if (isReset) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  });
};

export const ttsState = atom<TTSState>({
  key: 'ttsState',
  default: defaultState,
  effects: [
    localStorageEffect('seniorease_ttsSettings'),
  ],
});
