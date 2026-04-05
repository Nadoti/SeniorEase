import { useRecoilState } from 'recoil';
import { typographyState } from '@/shared/model/typographyState';
import styles from './FontFamilyRadio.module.css';

const listFontFamilies = [
  {
    label: 'Inter (Padrão)',
    text: 'A raposa rápida marrom salta sobre o cão preguiçoso.',
    fontFamily: 'Inter',
    value: 'inter',
  },
  {
    label: 'Roboto',
    text: 'A raposa rápida marrom salta sobre o cão preguiçoso.',
    fontFamily: 'Roboto',
    value: 'roboto',
  },
  {
    label: 'Open Sans',
    text: 'A raposa rápida marrom salta sobre o cão preguiçoso.',
    fontFamily: 'Open Sans',
    value: 'open-sans',
  },
  {
    label: 'Verdana',
    text: 'A raposa rápida marrom salta sobre o cão preguiçoso.',
    fontFamily: 'Verdana, sans-serif',
    value: 'verdana',
  },
  {
    label: 'Tahoma',
    text: 'A raposa rápida marrom salta sobre o cão preguiçoso.',
    fontFamily: 'Tahoma, sans-serif',
    value: 'tahoma',
  },
  {
    label: 'Arial',
    text: 'A raposa rápida marrom salta sobre o cão preguiçoso.',
    fontFamily: 'Arial, Helvetica, sans-serif',
    value: 'arial',
  },
  {
    label: 'Georgia',
    text: 'A raposa rápida marrom salta sobre o cão preguiçoso.',
    fontFamily: 'Georgia, serif',
    value: 'georgia',
  },
];

export function FontFamilyRadio() {
  const [typography, setTypography] = useRecoilState(typographyState);

  // Find which radio is selected by matching the standard fontFamily to the list
  const selectedFont = listFontFamilies.find(f => f.fontFamily === typography.fontFamily)?.value || 'inter';

  const setSelectedFont = (val: string) => {
    const familyObj = listFontFamilies.find(f => f.value === val);
    if (familyObj) {
      setTypography((prev: any) => ({ ...prev, fontFamily: familyObj.fontFamily }));
    }
  };

  return (
    <div className={styles.grid}>
      {listFontFamilies.map((font) => {
        const isChecked = selectedFont === font.value;

        return (
          <label
            key={font.value}
            className={isChecked ? `${styles.radioLabel} ${styles.checked}` : styles.radioLabel}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedFont(font.value);
              }
            }}
          >
            <input
              type="radio"
              name="fontFamilyList"
              value={font.value}
              checked={isChecked}
              onChange={() => setSelectedFont(font.value)}
              className={styles.hiddenInput}
              tabIndex={-1}
            />

            <div className={styles.cardContent}>
              <h4 className={`${styles.title} dynamic-heading`} style={{ fontFamily: font.fontFamily }}>
                {font.label}
              </h4>
              <p className={styles.description} style={{ fontFamily: font.fontFamily }}>
                {font.text}
              </p>
            </div>
          </label>
        );
      })}
    </div>
  );
}
