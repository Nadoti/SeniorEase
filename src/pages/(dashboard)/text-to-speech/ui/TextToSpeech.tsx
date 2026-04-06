import { Avatar, Card, Heading, Separator, Slider, Switch, Text } from "@/shared/ui";
import { Button } from "@/shared/ui/button/Button";
import styles from './TextToSpeech.module.css';
import { Volume2, FastForward, Square } from "lucide-react";
import { useTextToSpeech } from '../model/useTextToSpeech';

export function TextToSpeechPage() {
  const { tts, updateTts, handleAudioAction, getButtonProps, TEXT_TO_READ } = useTextToSpeech();
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
          <Switch size="3" checked={tts.enabled} onCheckedChange={(checked) => updateTts('enabled', checked)} />
        </div>
        <Separator />

        <div className={tts.enabled ? styles.sectionEnabled : styles.sectionDisabled}>
          <Slider label="Velocidade da fala" unit="x" showLimits min={0.5} max={2} step={0.1} variant="surface" color="primary" size="2" value={tts.rate} onValueChange={(val) => updateTts('rate', Array.isArray(val) ? val[0] : val)} />
        </div>
        <div className={tts.enabled ? styles.sectionEnabled : styles.sectionDisabled}>
          <Slider label="Volume" unit="%" showLimits min={0} max={100} step={1} variant="surface" color="primary" size="2" value={tts.volume} onValueChange={(val) => updateTts('volume', Array.isArray(val) ? val[0] : val)} />
        </div>
        <div className={tts.enabled ? undefined : styles.sectionDisabledVisual}>
          <Card color="deepDark" className={styles.testCard}>
            <Heading size="1" color="white">Teste de audio</Heading>
            <Text color="muted" size="3" className={styles.quoteText}>
              &quot;{TEXT_TO_READ}&quot;
            </Text>
            <div className={styles.testButtonWrapper}>
              <Button
                {...btnProps}
                leftIcon={btnProps.icon === 'play' ? <FastForward size={18} fill="currentColor" /> : <Square size={16} fill="currentColor" />}
                onClick={handleAudioAction}
                disabled={!tts.enabled || btnProps.loading}
                className={styles.testButton}
                data-narrator-ignore="true"
              />
            </div>
          </Card>
        </div>
      </Card>
    </section>
  );
}