import styles from './ColorPalette.module.css';

const TEST_COLORS = [
  '#EF4444', // Red
  '#F97316', // Orange
  '#FACC15', // Yellow
  '#22C55E', // Green
  '#3B82F6', // Blue
  '#A855F7', // Purple
];

export function ColorPalette() {
  return (
    <div className={styles.colorPalette}>
      {TEST_COLORS.map((color) => (
        <div
          key={color}
          className={styles.colorSwatch}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}
