import { useAtom } from 'jotai';
import { focusState } from '@/shared/model/focusState';
import styles from './FocusColorSelector.module.css';
import { Text } from '@/shared/ui';
import { Check } from 'lucide-react';
const FOCUS_COLORS = [
  { hex: '#4EADFF', name: 'Azul Principal' },
  { hex: '#22C55E', name: 'Verde' },
  { hex: '#EAB308', name: 'Amarelo' },
  { hex: '#EF4444', name: 'Vermelho' },
  { hex: '#A855F7', name: 'Roxo' },
  { hex: '#F97316', name: 'Laranja' },
  { hex: '#000000', name: 'Preto' },
  { hex: '#E1DCDC', name: 'Cinza Claro' },
];
export function FocusColorSelector() {
  const [focus, setFocus] = useAtom(focusState);
  const selectedColor = focus.color;
  const setSelectedColor = (val: string) => setFocus(prev => ({ ...prev, color: val }));
  const selectedName = FOCUS_COLORS.find(c => c.hex === selectedColor)?.name || selectedColor;
  return (
    <div className={styles.container}>
      <Text color='white'>Cor do Foco</Text>
      <div className={styles.colorRow}>
        {FOCUS_COLORS.map((color) => (
          <button
            key={color.hex}
            className={`${styles.colorCircle} ${selectedColor === color.hex ? styles.selected : ''}`}
            style={{ backgroundColor: color.hex }}
            onClick={() => setSelectedColor(color.hex)}
            aria-label={`Selecionar cor ${color.name}`}
            type="button"
          >
            {selectedColor === color.hex && (
              <Check
                size={20}
                color={color.hex === '#E1DCDC' || color.hex === '#FACC15' || color.hex === '#F97316' ? '#000000' : '#FFFFFF'}
              />
            )}
          </button>
        ))}
      </div>
      <div className={styles.footer}>
        <Text color="muted" size="2">{selectedName}</Text>
      </div>
    </div>
  );
}
