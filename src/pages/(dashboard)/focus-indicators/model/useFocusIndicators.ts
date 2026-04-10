import { useAtom } from 'jotai';
import { focusState } from '@/shared/model/focusState';
export function useFocusIndicators() {
  const [focus, setFocus] = useAtom(focusState);
  const updateFocus = (key: keyof typeof focus, val: any) => {
    setFocus(prev => ({ ...prev, [key]: val }));
  };
  return { focus, updateFocus };
}
