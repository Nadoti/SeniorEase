import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { ttsState } from '@/shared/model/ttsState';
import { focusState } from '@/shared/model/focusState';
import { typographyState } from '@/shared/model/typographyState';

export function useHome() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.getAttribute('data-theme') === 'dark' ||
      (!document.documentElement.hasAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const [tts, setTts] = useAtom(ttsState);
  const [focus, setFocus] = useAtom(focusState);
  const [typography] = useAtom(typographyState);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTts = (checked: boolean) => {
    setTts(prev => ({ ...prev, enabled: checked }));
  };

  const toggleFocus = (checked: boolean) => {
    setFocus(prev => ({ ...prev, style: checked ? 'solid' : 'none' }));
  };

  const themeName = isDarkMode ? 'Escuro' : 'Claro';
  const fontSizeText = `${typography.fontSize}px`;
  const ttsText = tts.enabled ? 'Ativado' : 'Desativado';
  let focusText = 'Desativado';
  if (focus.style === 'solid') focusText = 'Rígido';
  else if (focus.style === 'dashed') focusText = 'Tracejado';
  else if (focus.style === 'underline') focusText = 'Sublinhado';

  return { 
    isDarkMode, setIsDarkMode, 
    ttsEnabled: tts.enabled, toggleTts, 
    focusEnabled: focus.style !== 'none', toggleFocus,
    themeName, fontSizeText, ttsText, focusText
  };
}
