import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';

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

const baseTtsState = atomWithStorage<TTSState>('seniorease_ttsSettings', defaultState);

export const ttsState = atom(
  (get) => get(baseTtsState),
  (get, set, update: TTSState | ((prev: TTSState) => TTSState)) => {
    const newValue = typeof update === 'function' ? update(get(baseTtsState)) : update;
    set(baseTtsState, newValue);
  }
);
