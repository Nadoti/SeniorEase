import { Eye, Menu, X } from 'lucide-react';
import styles from './MobileHeader.module.css';

interface MobileHeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export function MobileHeader({ isMenuOpen, toggleMenu }: MobileHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.logoArea}>
        <div className={styles.logoIconWrapper}>
          <Eye color="white" size={20} />
        </div>
        <span>SeniorEase</span>
      </div>
      <button
        className={styles.hamburgerButton}
        onClick={toggleMenu}
        aria-label="Abrir menu"
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </header>
  );
}
