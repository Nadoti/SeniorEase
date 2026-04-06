import { useRecoilState } from 'recoil';
import { colorFilterState } from '@/shared/model/colorFilterState';

export function useColorFilters() {
  const [colorFilter, setColorFilter] = useRecoilState(colorFilterState);

  return { colorFilter, setColorFilter };
}
