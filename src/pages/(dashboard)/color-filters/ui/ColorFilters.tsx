import { Avatar, Card, Heading, RadioCard, Text } from "@/shared/ui";
import styles from './ColorFilters.module.css';
import { View } from "lucide-react";
import { useState } from "react";
import { ColorPalette } from "./components";


export function ColorFiltersPage() {
  const [colorFilter, setColorFilter] = useState<string>('none');

  return (
    <section>
      <div className={styles.header}>
        <Heading color='white'>Filtros de Cor</Heading>
        <Text>Aplique filtros para simular ou corrigir deficiências na visão de cores.</Text>
      </div>

      <div>
        <Card color="primary">
          <div className={styles.titleFilters}>
            <Avatar size="3" variant="soft" color="primary" radius="md" fallback={<View color="#4EADFF" />} />
            <Heading size="1" color="white">Selecione o Filtro</Heading>
          </div>

          <div className={styles.filters}>
            <RadioCard
              name="navMode"
              value="lateral"
              contentClassName={styles.navOption}
              variant="ghost"
            >
              <div className={styles.navOptionHeader}>
                <Heading
                  size="1"
                  color="info"
                // style={colorFilter === 'none' ? { color: theme === 'dark' ? '#4EADFF' : '#1A6FC2' } : undefined}
                >
                  Nenhum (Visão Normal)
                </Heading>
              </div>
              <Text size="2" color="muted">Cores originais sem alterações.</Text>
            </RadioCard>
            <RadioCard
              name="navMode"
              value="lateral"
              contentClassName={styles.navOption}
              variant="ghost"
            >
              <div className={styles.navOptionHeader}>
                <Heading
                  size="1"
                  color="info"
                // style={colorFilter === 'none' ? { color: theme === 'dark' ? '#4EADFF' : '#1A6FC2' } : undefined}
                >
                  Protanopia
                </Heading>
              </div>
              <Text size="2" color="muted">Cores originais sem alterações.</Text>
            </RadioCard>
            <RadioCard
              name="navMode"
              value="lateral"
              contentClassName={styles.navOption}
              variant="ghost"
            >
              <div className={styles.navOptionHeader}>
                <Heading
                  size="1"
                  color="info"
                // style={colorFilter === 'none' ? { color: theme === 'dark' ? '#4EADFF' : '#1A6FC2' } : undefined}
                >
                  Deuteranopia
                </Heading>
              </div>
              <Text size="2" color="muted">Cores originais sem alterações.</Text>
            </RadioCard>
            <RadioCard
              name="navMode"
              value="lateral"
              contentClassName={styles.navOption}
              variant="ghost"
            >
              <div className={styles.navOptionHeader}>
                <Heading
                  size="1"
                  color="info"
                // style={colorFilter === 'none' ? { color: theme === 'dark' ? '#4EADFF' : '#1A6FC2' } : undefined}
                >
                  Tritanopia
                </Heading>
              </div>
              <Text size="2" color="muted">Cores originais sem alterações.</Text>
            </RadioCard>
            <RadioCard
              name="navMode"
              value="lateral"
              contentClassName={styles.navOption}
              variant="ghost"
            >
              <div className={styles.navOptionHeader}>
                <Heading
                  size="1"
                  color="info"
                // style={colorFilter === 'none' ? { color: theme === 'dark' ? '#4EADFF' : '#1A6FC2' } : undefined}
                >
                  Acromatopsia
                </Heading>
              </div>
              <Text size="2" color="muted">Cores originais sem alterações.</Text>
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