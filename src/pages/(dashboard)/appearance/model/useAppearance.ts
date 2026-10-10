import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { useNavMode } from '@/entities/user-preferences';
import { keyboardNavState } from '@/entities/user-preferences';
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
