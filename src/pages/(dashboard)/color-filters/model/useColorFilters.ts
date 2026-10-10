import { useAtom } from 'jotai';
import { colorFilterState } from '@/entities/user-preferences';
export function useColorFilters() {
  const [colorFilter, setColorFilter] = useAtom(colorFilterState);
  return { colorFilter, setColorFilter };
}
