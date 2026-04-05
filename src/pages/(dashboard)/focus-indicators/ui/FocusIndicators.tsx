import { Avatar, Card, Heading, LinkButton, RadioCard, Slider, Text } from "@/shared/ui";
import { Crosshair } from "lucide-react";
import styles from './FocusIndicators.module.css';
import { FocusColorSelector } from "./components";
import { Button } from "@/shared/ui/button";
import { useRecoilState } from 'recoil';
import { focusState } from '@/shared/model/focusState';

export function FocusIndicatorsPage() {
  const [focus, setFocus] = useRecoilState(focusState);

  const updateFocus = (key: keyof typeof focus, val: any) => {
    setFocus(prev => ({ ...prev, [key]: val }));
  };

  return (
    <section>
      <div className={styles.header}>
        <Heading>Indicadores de Foco</Heading>
        <Text className="dynamic-text">Personalize como os elementos selecionados via teclado são destacados.</Text>
      </div>

      <div className={styles.contentCard}>
        <Card color="primary">
          <div className={styles.headerCard}>
            <Avatar size="3" variant="soft" color="primary" radius="md" fallback={<Crosshair color="#4EADFF" />} />
            <Heading size="1" color="white">Indicadores de Foco</Heading>
          </div>

          <div className={styles.content}>
            <Text>Estilo do indicador</Text>
            <div className={styles.options}>
              <RadioCard
                name="focusStyle"
                value="solid"
                contentClassName={styles.navOption}
                variant="ghost"
                checked={focus.style === 'solid'}
                onChange={() => updateFocus('style', 'solid')}
              >
                <div className={styles.navOptionHeader}>
                  <Heading
                    size="1"
                    color="info"
                  >
                    Anel Sólido
                  </Heading>
                </div>
              </RadioCard>
              <RadioCard
                name="focusStyle"
                value="dashed"
                contentClassName={styles.navOption}
                variant="ghost"
                checked={focus.style === 'dashed'}
                onChange={() => updateFocus('style', 'dashed')}
              >
                <div className={styles.navOptionHeader}>
                  <Heading
                    size="1"
                    color="info"
                  >
                    Contorno Tracejado
                  </Heading>
                </div>
              </RadioCard>
              <RadioCard
                name="focusStyle"
                value="underline"
                contentClassName={styles.navOption}
                variant="ghost"
                checked={focus.style === 'underline'}
                onChange={() => updateFocus('style', 'underline')}
              >
                <div className={styles.navOptionHeader}>
                  <Heading
                    size="1"
                    color="info"
                  >
                    Sublinhado
                  </Heading>
                </div>
              </RadioCard>
            </div>

            <FocusColorSelector />

            <div>
              <Slider
                label="Espessura da Linha"
                unit="px"
                showLimits={true}
                min={1}
                max={6}
                step={1}
                value={focus.thickness}
                onValueChange={(val) => updateFocus('thickness', val)}
                variant="surface"
                color="primary"
                size="2"
              />
            </div>
          </div>
        </Card>
        <Card color="primary">
          <div className={styles.cardHeaderTesting}>
            <Heading size="1" color="white">Área de Teste</Heading>
            <Text>Use a tecla <span className={styles.key}>Tab</span> para navegar entre os elementos abaixo e ver o indicador de foco em ação.</Text>
          </div>
          <div className={styles.testingButtons}>
            <Button variant="outline">Botao Interativo 1</Button>
            <Button variant="outline">Botao Interativo 2</Button>
          </div>
          <div>
            <LinkButton href="" variant="ghost">Link de Exemplo</LinkButton>
          </div>
        </Card>
      </div>
    </section>
  );
} 