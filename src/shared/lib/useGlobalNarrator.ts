import { useEffect, useRef } from 'react';
import { useAtomValue } from 'jotai';
import { ttsState } from '@/shared/model/ttsState';

export function useGlobalNarrator() {
  const tts = useAtomValue(ttsState);
  const speakingRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const clearHighlight = () => {
      if (speakingRef.current) {
        speakingRef.current.classList.remove('seniorease-narrator-highlight');
        speakingRef.current = null;
      }
    };

    if (!tts.enabled) {
      window.speechSynthesis.cancel();
      clearHighlight();
      return;
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest('[data-narrator-ignore="true"]')) {
        return;
      }

      const layoutTags = ['BODY', 'HTML', 'MAIN', 'NAV', 'ASIDE', 'SVG', 'PATH'];
      if (layoutTags.includes(target.tagName.toUpperCase())) {
        return;
      }

      const textToRead = target.innerText?.trim() || target.textContent?.trim();
      
      if (!textToRead) return;

      window.speechSynthesis.cancel();
      clearHighlight();

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'pt-BR';
      utterance.rate = tts.rate;
      utterance.volume = tts.volume / 100;

      utterance.onstart = () => {
        speakingRef.current = target;
        target.classList.add('seniorease-narrator-highlight');
      };

      utterance.onend = () => {
        clearHighlight();
      };
      
      utterance.onerror = () => {
        clearHighlight();
      };

      window.speechSynthesis.speak(utterance);
    };

    document.addEventListener('click', handleClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
      window.speechSynthesis.cancel();
      clearHighlight();
    };
  }, [tts.enabled, tts.rate, tts.volume]);
}
