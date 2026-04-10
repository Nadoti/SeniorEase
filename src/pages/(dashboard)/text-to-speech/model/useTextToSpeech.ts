import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { ttsState } from '@/shared/model/ttsState';
const TEXT_TO_READ = "Acessibilidade é a prática de tornar seus sites utilizáveis pelo maior número possível de pessoas. Tradicionalmente pensamos nisso como sendo sobre pessoas com deficiências, mas na verdade beneficia a todos.";
export function useTextToSpeech() {
  const [audioState, setAudioState] = useState<'idle' | 'starting' | 'playing' | 'stopping'>('idle');
  const [tts, setTts] = useAtom(ttsState);
  const handleAudioAction = () => {
    if (audioState === 'idle') {
      setAudioState('starting');
      setTimeout(() => {
        setAudioState('playing');
        const utterance = new SpeechSynthesisUtterance(TEXT_TO_READ);
        utterance.lang = 'pt-BR';
        utterance.pitch = 1;
        utterance.rate = tts.rate;
        utterance.volume = tts.volume / 100;
        utterance.onend = () => { setAudioState('idle'); };
        window.speechSynthesis.speak(utterance);
      }, 600);
    } else if (audioState === 'playing') {
      setAudioState('stopping');
      setTimeout(() => {
        window.speechSynthesis.cancel();
        setAudioState('idle');
      }, 400);
    }
  };
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) { window.speechSynthesis.cancel(); }
    };
  }, []);
  const getButtonProps = () => {
    switch (audioState) {
      case 'idle':
        return { children: 'Ouvir texto', color: 'primary' as const, variant: 'solid' as const, loading: false, icon: 'play' as const };
      case 'starting':
        return { children: 'Ouvir texto', loadingText: 'Processando...', color: 'primary' as const, variant: 'solid' as const, loading: true, icon: 'play' as const };
      case 'playing':
        return { children: 'Parar leitura', color: 'danger' as const, variant: 'soft' as const, loading: false, icon: 'stop' as const };
      case 'stopping':
        return { children: 'Parar leitura', loadingText: 'Processando...', color: 'danger' as const, variant: 'soft' as const, loading: true, icon: 'stop' as const };
    }
  };
  const updateTts = (key: string, val: any) => {
    setTts(prev => ({ ...prev, [key]: val }));
  };
  return {
    tts,
    updateTts,
    audioState,
    handleAudioAction,
    getButtonProps,
    TEXT_TO_READ,
  };
}
