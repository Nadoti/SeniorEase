import { useAtom } from 'jotai';
import { colorFilterState } from '@/shared/model/colorFilterState';
export function useColorFilters() {
  const [colorFilter, setColorFilter] = useAtom(colorFilterState);
  return { colorFilter, setColorFilter };
}
