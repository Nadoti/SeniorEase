
import { Avatar, Card, Heading, Slider, Text } from '@/shared/ui';
import styles from './Typography.module.css';
import { Type } from 'lucide-react';
import { FontFamilyRadio } from './components';
import { useState } from 'react';
import { Button } from '@/shared/ui/button';

export function TypographyPage() {
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState(400);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);
  return (
    <section>
      <div className={styles.header}>
        <Heading color='white'>Tipografia</Heading>
        <Text>Personalize as fontes, tamanhos e espaçamentos de texto para melhorar a legibilidade.</Text>
      </div>

      <div className={styles.content}>
        <div>
          <Card color='primary'>
            <div className={styles.headerCard}>
              <Avatar size="3" variant="soft" color="primary" radius="md" fallback={<Type color="#4EADFF" />} />
              <Heading size="1" color="white">Familia da Fonte</Heading>
            </div>
            <div className={styles.fontFamilyRadioContainer}>
              <FontFamilyRadio />
            </div>
          </Card>
          <Card color='primary'>
            <div className={styles.headerCard}>
              <Heading size="1" color="white">Ajustes Finos</Heading>
            </div>
            <div className={styles.fontFamilyRadioContainer}>
              <Slider
                label="Tamanho da Fonte"
                unit="px"
                showLimits={true}
                min={12}
                max={24}
                step={1}
                value={fontSize}
                onValueChange={setFontSize}
                variant="surface"
                color="primary"
                size="2"
              />

              <Slider
                label="Peso da Fonte"
                unit=""
                showLimits={true}
                min={300}
                max={700}
                step={100}
                value={fontWeight}
                onValueChange={setFontWeight}
                variant="surface"
                color="primary"
                size="2"
              />

              <Slider
                label="Altura da Linha"
                unit=""
                showLimits={true}
                min={1.2}
                max={2.0}
                step={0.1}
                value={lineHeight}
                onValueChange={setLineHeight}
                variant="surface"
                color="primary"
                size="2"
              />

              <Slider
                label="Espaçamento de Letras"
                unit="em"
                showLimits={true}
                min={-0.05}
                max={0.15}
                step={0.01}
                value={letterSpacing}
                onValueChange={(val) => setLetterSpacing(Number(val.toFixed(2)))} // Avoid float precision issues
                variant="surface"
                color="primary"
                size="2"
              />
            </div>
          </Card>
        </div>

        <div>
          <Card variant='outline'>
            <div className={styles.headerCard}>
              <Text>Pré-visualização ao Vivo</Text>
            </div>
            <div className={styles.fontFamilyRadioContainer}>
              <Heading size="6" color="white">Acessibilidade para Todos</Heading>
              <Heading size="3" color="muted" weight='600'>Criando experiências digitais inclusivas</Heading>
            </div>
            <Card color='primary' className={styles.previewCard}>
              <Text color='lightGray'>A tipografia desempenha um papel fundamental na acessibilidade. Textos bem formatados, com tamanho adequado e bom contraste, garantem que a informação chegue a todos os usuários, independentemente de suas capacidades visuais ou cognitivas.</Text>
              <Text color='lightGray'>Ajuste os controles acima para encontrar a combinação perfeita para sua leitura. As alterações são aplicadas instantaneamente em toda a interface.</Text>
            </Card>
            <div className={styles.buttonContainer}>
              <Button>Botao Principal</Button>
              <Button variant='outline'>Botao Secundario</Button>
            </div>
            <div>
              <Text> Exemplo de texto pequeno ou legenda</Text>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}