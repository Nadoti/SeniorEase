import { Avatar, Card, Heading, Separator, Slider, Switch, Text } from "@/shared/ui";
import { Button } from "@/shared/ui/button/Button";
import styles from './TextToSpeech.module.css';
import { Volume2, FastForward, Square } from "lucide-react";
import { useState, useEffect } from "react";
import { useRecoilState } from 'recoil';
import { ttsState } from '@/shared/model/ttsState';

const textToRead = "Acessibilidade é a prática de tornar seus sites utilizáveis pelo maior número possível de pessoas. Tradicionalmente pensamos nisso como sendo sobre pessoas com deficiências, mas na verdade beneficia a todos.";

export function TextToSpeechPage() {
  const [audioState, setAudioState] = useState<'idle' | 'starting' | 'playing' | 'stopping'>('idle');
  const [tts, setTts] = useRecoilState(ttsState);

  const handleAudioAction = () => {
    if (audioState === 'idle') {
      setAudioState('starting');

      // O timeout aqui é só para simular um loading suave de preparo pro usuário
      setTimeout(() => {
        setAudioState('playing');

        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'pt-BR';
        utterance.pitch = 1;
        utterance.rate = tts.rate;
        utterance.volume = tts.volume / 100;

        // Quando o áudio acaba naturalmente, reseta a UI para o início
        utterance.onend = () => {
          setAudioState('idle');
        };

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

  // Se o usuário fechar a aba ou mudar de página, o áudio corta imediatamente
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const getButtonProps = () => {
    switch (audioState) {
      case 'idle':
        return {
          children: 'Ouvir texto',
          leftIcon: <FastForward size={18} fill="currentColor" />,
          color: 'primary' as const,
          variant: 'solid' as const,
          loading: false,
        };
      case 'starting':
        return {
          children: 'Ouvir texto',
          loadingText: 'Processando...',
          color: 'primary' as const,
          variant: 'solid' as const,
          loading: true,
        };
      case 'playing':
        return {
          children: 'Parar leitura',
          leftIcon: <Square size={16} fill="currentColor" />,
          color: 'danger' as const,
          variant: 'soft' as const,
          loading: false,
        };
      case 'stopping':
        return {
          children: 'Parar leitura',
          loadingText: 'Processando...',
          color: 'danger' as const,
          variant: 'soft' as const,
          loading: true,
        };
    }
  };

  const btnProps = getButtonProps();

  return (
    <section>
      <div className={styles.header}>
        <Heading color="white">Texto para Fala</Heading>
        <Text color="default" size="4">Configure a leitura em voz alta do conteúdo da tela.</Text>
      </div>

      <Card color="primary" className={styles.card}>
        <div className={styles.titleCardContent}>
          <Avatar size="3" variant="soft" color="primary" radius="md" fallback={<Volume2 color="#4EADFF" />} />
          <Heading size="1" color="white">Configurações de Leitura</Heading>
        </div>

        <div className={styles.switchContent}>
          <div className={styles.switchTextContent}>
            <Text color="white" size="4">Habilitar Leitura de Tela</Text>
            <Text color="default" size="4">Permite que textos selecionados sejam lidos em voz alta</Text>
          </div>

          <Switch size="3" checked={tts.enabled} onCheckedChange={(checked) => setTts(prev => ({ ...prev, enabled: checked }))} />
        </div>
        <Separator />

        <div style={{ opacity: tts.enabled ? 1 : 0.5, pointerEvents: tts.enabled ? 'auto' : 'none' }}>
          <Slider
            label="Velocidade da fala"
            unit="x"
            showLimits={true}
            min={0.5}
            max={2}
            step={0.1}
            variant="surface"
            color="primary"
            size="2"
            value={tts.rate}
            onValueChange={(val) => setTts(prev => ({ ...prev, rate: Array.isArray(val) ? val[0] : val }))}
          />
        </div>
        <div style={{ opacity: tts.enabled ? 1 : 0.5, pointerEvents: tts.enabled ? 'auto' : 'none' }}>
          <Slider
            label="Volume"
            unit="%"
            showLimits={true}
            min={0}
            max={100}
            step={1}
            variant="surface"
            color="primary"
            size="2"
            value={tts.volume}
            onValueChange={(val) => setTts(prev => ({ ...prev, volume: Array.isArray(val) ? val[0] : val }))}
          />
        </div>
        <div style={{ opacity: tts.enabled ? 1 : 0.5 }}>
          <Card color="deepDark" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Heading size="1" color="white">Teste de audio</Heading>
            <Text color="muted" size="3" style={{ fontStyle: 'italic', lineHeight: '1.6' }}>
              &quot;Acessibilidade é a prática de tornar seus sites utilizáveis pelo maior número possível de pessoas. Tradicionalmente pensamos nisso como sendo sobre pessoas com deficiências, mas na verdade beneficia a todos.&quot;
            </Text>
            <div style={{ marginTop: 'var(--space-2)' }}>
              <Button {...btnProps} onClick={handleAudioAction} disabled={!tts.enabled || btnProps.loading} style={{ minWidth: '160px' }} data-narrator-ignore="true" />
            </div>
          </Card>
        </div>
      </Card>
    </section>
  );
}