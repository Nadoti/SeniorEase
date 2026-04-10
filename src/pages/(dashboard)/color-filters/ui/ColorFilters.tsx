import { Avatar, Card, Heading, RadioCard, Text } from "@/shared/ui";
import styles from './ColorFilters.module.css';
import { View } from "lucide-react";
import { useColorFilters } from '../model/useColorFilters';
import { ColorPalette } from "./components";
const FILTERS = [
  { value: 'none', label: 'Nenhum (Visão Normal)', desc: 'Cores originais sem alterações.' },
  { value: 'protanopia', label: 'Protanopia', desc: 'Simula a dificuldade em distruinguir verde e vermelho, com vermelho atenuado.' },
  { value: 'deuteranopia', label: 'Deuteranopia', desc: 'Simula a dificuldade padrão entre verde e vermelho onde verde enfraquece.' },
  { value: 'tritanopia', label: 'Tritanopia', desc: 'Simula a anomalia atípica não enxergando azul nem suas misturas.' },
  { value: 'achromatopsia', label: 'Acromatopsia', desc: 'Permite ver visualização puramente em tons de cinza ou Monocromática.' },
] as const;
export function ColorFiltersPage() {
  const { colorFilter, setColorFilter } = useColorFilters();
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
            {FILTERS.map(f => (
              <RadioCard key={f.value} name="colorFilter" value={f.value} checked={colorFilter === f.value} onChange={() => setColorFilter(f.value)} contentClassName={styles.navOption} variant="ghost">
                <div className={styles.navOptionHeader}>
                  <Heading size="1" color="info" style={colorFilter === f.value ? { color: '#4EADFF' } : undefined}>{f.label}</Heading>
                </div>
                <Text size="2" color="muted">{f.desc}</Text>
              </RadioCard>
            ))}
          </div>
          <div>
            <Card variant="surface" color="primary">
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