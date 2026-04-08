import { useLocation, useOutlet } from 'react-router';
import { Sidebar } from '@/widgets/sidebar';
import { FloatingSidebar } from '@/widgets/floating-sidebar';
import styles from './MainLayout.module.css';
import { useAtomValue } from 'jotai';
import { typographyState, applyTypographyToRoot } from '@/shared/model/typographyState';
import { focusState, applyFocusToRoot } from '@/shared/model/focusState';
import { colorFilterState, applyColorFilterToDOM } from '@/shared/model/colorFilterState';
import { keyboardNavState } from '@/shared/model/keyboardNavState';
import { useGlobalNarrator } from '@/shared/lib/useGlobalNarrator';
import { useKeyboardNavigation } from '@/shared/lib/useKeyboardNavigation';
import { useNavMode } from '@/shared/model/navModeState';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { useEffect } from 'react';

export function MainLayout() {
  const typography = useAtomValue(typographyState);
  const focus = useAtomValue(focusState);
  const colorFilter = useAtomValue(colorFilterState);
  const keyboardNavEnabled = useAtomValue(keyboardNavState);

  // Inicializadores globais para garantir que o DOM esteja sincronizado com o localStorage no mount
  useEffect(() => {
    applyTypographyToRoot(typography);
    applyFocusToRoot(focus);
    applyColorFilterToDOM(colorFilter);
  }, []);

  useGlobalNarrator();
  useKeyboardNavigation();

  const { navMode } = useNavMode();
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className={styles.layout}>
      <AnimatePresence>
        {navMode === 'lateral' ? (
          <motion.div
            key="lateral"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ overflow: 'hidden', flexShrink: 0, display: 'flex', zIndex: 10 }}
          >
            <div style={{ width: '300px', flexShrink: 0 }}>
              <Sidebar showShortcuts={keyboardNavEnabled} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="flutuante"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 10
            }}
          >
            <div style={{ pointerEvents: 'auto' }}>
              <FloatingSidebar showShortcuts={keyboardNavEnabled} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <main className={styles.main}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>

      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id="seniorease-protanopia">
            <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0  0.558, 0.442, 0, 0, 0  0, 0.242, 0.758, 0, 0  0, 0, 0, 1, 0" />
          </filter>
          <filter id="seniorease-deuteranopia">
            <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0  0.7, 0.3, 0, 0, 0  0, 0.3, 0.7, 0, 0  0, 0, 0, 1, 0" />
          </filter>
          <filter id="seniorease-tritanopia">
            <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0  0, 0.433, 0.567, 0, 0  0, 0.475, 0.525, 0, 0  0, 0, 0, 1, 0" />
          </filter>
          <filter id="seniorease-achromatopsia">
            <feColorMatrix type="matrix" values="0.299, 0.587, 0.114, 0, 0  0.299, 0.587, 0.114, 0, 0  0.299, 0.587, 0.114, 0, 0  0, 0, 0, 1, 0" />
          </filter>
        </defs>
      </svg>
      <Toaster position="top-right" richColors />
    </div>
  );
}
