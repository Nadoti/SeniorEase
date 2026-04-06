import { useRecoilState } from 'recoil';
import { focusState } from '@/shared/model/focusState';

export function useFocusIndicators() {
  const [focus, setFocus] = useRecoilState(focusState);

  const updateFocus = (key: keyof typeof focus, val: any) => {
    setFocus(prev => ({ ...prev, [key]: val }));
  };

  return { focus, updateFocus };
}
