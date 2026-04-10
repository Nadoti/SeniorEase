import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { useNavMode } from '@/shared/model/navModeState';
import { keyboardNavState } from '@/shared/model/keyboardNavState';
export function useAppearance() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  });
  const { navMode, setNavMode } = useNavMode();
  const [keyboardNavEnabled, setKeyboardNavEnabled] = useAtom(keyboardNavState);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  return {
    theme,
    setTheme,
    navMode,
    setNavMode,
    keyboardNavEnabled,
    setKeyboardNavEnabled,
  };
}
