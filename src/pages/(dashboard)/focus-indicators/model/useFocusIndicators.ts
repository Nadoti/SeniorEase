import { useAtom } from 'jotai';
import { focusState } from '@/entities/user-preferences';
import type { FocusConfig } from '@/entities/user-preferences';
export function useFocusIndicators() {
  const [focus, setFocus] = useAtom(focusState);
  const updateFocus = <K extends keyof FocusConfig>(key: K, val: FocusConfig[K]) => {
    setFocus(prev => ({ ...prev, [key]: val }));
  };
  return { focus, updateFocus };
}
