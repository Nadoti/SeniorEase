import styles from './ColorPalette.module.css';
const TEST_COLORS = [
  '#EF4444', 
  '#F97316', 
  '#FACC15', 
  '#22C55E', 
  '#3B82F6', 
  '#A855F7', 
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
