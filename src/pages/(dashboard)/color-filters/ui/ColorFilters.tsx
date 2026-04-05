import { Avatar, Card, Heading, RadioCard, Text } from "@/shared/ui";
import styles from './ColorFilters.module.css';
import { View } from "lucide-react";
import { useRecoilState } from "recoil";
import { colorFilterState } from '@/shared/model/colorFilterState';
import { ColorPalette } from "./components";

export function ColorFiltersPage() {
  const [colorFilter, setColorFilter] = useRecoilState(colorFilterState);

  return (
    <section>
      <div className={styles.header}>
        <Heading color='white'>Filtros de Cor</Heading>
        <Text className="dynamic-text">Aplique filtros para simular ou corrigir deficiências na visão de cores.</Text>
      </div>

      <div>
        <Card color="primary">
          <div className={styles.titleFilters}>
            <Avatar size="3" variant="soft" color="primary" radius="md" fallback={<View color="#4EADFF" />} />
            <Heading size="1" color="white">Selecione o Filtro</Heading>
          </div>

          <div className={styles.filters}>
            <RadioCard
              name="colorFilter"
              value="none"
              checked={colorFilter === 'none'}
              onChange={() => setColorFilter('none')}
              contentClassName={styles.navOption}
              variant="ghost"
            >
              <div className={styles.navOptionHeader}>
                <Heading
                  size="1"
                  color="info"
                  style={colorFilter === 'none' ? { color: '#4EADFF' } : undefined}
                >
                  Nenhum (Visão Normal)
                </Heading>
              </div>
              <Text size="2" color="muted">Cores originais sem alterações.</Text>
            </RadioCard>
            <RadioCard
              name="colorFilter"
              value="protanopia"
              checked={colorFilter === 'protanopia'}
              onChange={() => setColorFilter('protanopia')}
              contentClassName={styles.navOption}
              variant="ghost"
            >
              <div className={styles.navOptionHeader}>
                <Heading
                  size="1"
                  color="info"
                  style={colorFilter === 'protanopia' ? { color: '#4EADFF' } : undefined}
                >
                  Protanopia
                </Heading>
              </div>
              <Text size="2" color="muted">Simula a dificuldade em distruinguir verde e vermelho, com vermelho atenuado.</Text>
            </RadioCard>
            <RadioCard
              name="colorFilter"
              value="deuteranopia"
              checked={colorFilter === 'deuteranopia'}
              onChange={() => setColorFilter('deuteranopia')}
              contentClassName={styles.navOption}
              variant="ghost"
            >
              <div className={styles.navOptionHeader}>
                <Heading
                  size="1"
                  color="info"
                  style={colorFilter === 'deuteranopia' ? { color: '#4EADFF' } : undefined}
                >
                  Deuteranopia
                </Heading>
              </div>
              <Text size="2" color="muted">Simula a dificuldade padrão entre verde e vermelho onde verde enfraquece.</Text>
            </RadioCard>
            <RadioCard
              name="colorFilter"
              value="tritanopia"
              checked={colorFilter === 'tritanopia'}
              onChange={() => setColorFilter('tritanopia')}
              contentClassName={styles.navOption}
              variant="ghost"
            >
              <div className={styles.navOptionHeader}>
                <Heading
                  size="1"
                  color="info"
                  style={colorFilter === 'tritanopia' ? { color: '#4EADFF' } : undefined}
                >
                  Tritanopia
                </Heading>
              </div>
              <Text size="2" color="muted">Simula a anomalia atípica não enxergando azul nem suas misturas.</Text>
            </RadioCard>
            <RadioCard
              name="colorFilter"
              value="achromatopsia"
              checked={colorFilter === 'achromatopsia'}
              onChange={() => setColorFilter('achromatopsia')}
              contentClassName={styles.navOption}
              variant="ghost"
            >
              <div className={styles.navOptionHeader}>
                <Heading
                  size="1"
                  color="info"
                  style={colorFilter === 'achromatopsia' ? { color: '#4EADFF' } : undefined}
                >
                  Acromatopsia
                </Heading>
              </div>
              <Text size="2" color="muted">Permite ver visualização puramente em tons de cinza ou Monocromática.</Text>
            </RadioCard>
          </div>
          <div>
            <Card variant="surface" color="dark">
              <div className={styles.colorPaletteContainer}>
                <Text size="2" color="white">Paleta de Cores de Teste.</Text>
                <ColorPalette />
                <Text size="2" color="white">As cores acima mudarão de acordo com o filtro selecionado para demonstrar como pessoas com diferentes tipos de daltonismo percebem </Text>
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </section>
  );
}