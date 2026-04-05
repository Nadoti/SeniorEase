import { Avatar, Card, Heading, Slider, Text } from '@/shared/ui';
import styles from './Typography.module.css';
import { Button } from '@/shared/ui/button';
import { Modal } from '@/shared/ui/modal';
import { toast } from 'sonner';
import { AlertCircle, Type } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { typographyState } from '@/shared/model/typographyState';
import { useState } from 'react';
import { FontFamilyRadio } from './components';
import { useTheme } from '@/shared/lib/useTheme';

export function TypographyPage() {
  const [typography, setTypography] = useRecoilState(typographyState);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const updateTypo = (key: string, val: number | string) => {
    setTypography((prev: any) => ({ ...prev, [key]: val }));
  };

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const confirmResetDefaults = () => {
    setTypography({
      fontFamily: 'Inter, sans-serif',
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: 0,
    });
    toast.success('Tipografia restaurada com sucesso');
    setIsResetModalOpen(false);
  };

  return (
    <section style={{ paddingBottom: '64px' }}>
      <div className={styles.header}>
        <Heading color={isDarkMode ? 'white' : 'default'}>Tipografia</Heading>
        <Text className="dynamic-text">Personalize as fontes, tamanhos e espaçamentos de texto para melhorar a legibilidade.</Text>
      </div>

      <div className={styles.content}>
        <div>
          <Card color='primary' style={!isDarkMode ? { backgroundColor: '#FFFFFF' } : undefined}>
            <div className={styles.headerCard}>
              <Avatar size="3" variant="soft" color="primary" radius="md" fallback={<Type color="#4EADFF" />} />
              <Heading size="1" color={isDarkMode ? 'white' : 'default'}>Familia da Fonte</Heading>
            </div>
            <div className={styles.fontFamilyRadioContainer}>
              <FontFamilyRadio />
            </div>
          </Card>
          <Card color='primary' style={!isDarkMode ? { backgroundColor: '#FFFFFF' } : undefined}>
            <div className={styles.headerCard}>
              <Heading size="1" color={isDarkMode ? 'white' : 'default'}>Ajustes Finos</Heading>
            </div>
            <div className={styles.fontFamilyRadioContainer}>
              <Slider
                label="Tamanho da Fonte"
                unit="px"
                showLimits={true}
                min={12}
                max={24}
                step={1}
                value={typography.fontSize}
                onValueChange={(val) => updateTypo('fontSize', val)}
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
                value={typography.fontWeight}
                onValueChange={(val) => updateTypo('fontWeight', val)}
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
                value={typography.lineHeight}
                onValueChange={(val) => updateTypo('lineHeight', val)}
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
                value={typography.letterSpacing}
                onValueChange={(val) => updateTypo('letterSpacing', Number(val.toFixed(2)))}
                variant="surface"
                color="primary"
                size="2"
              />
            </div>
          </Card>
          <div style={{ marginTop: 'var(--space-4)', display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              variant="ghost"
              onClick={() => setIsResetModalOpen(true)}
              style={{ color: isDarkMode ? '#FFFFFF' : '#4B5563' }}
            >
              Restaurar padrões
            </Button>
          </div>
        </div>

        <div>
          <Card
            variant='outline'
            style={!isDarkMode ? { borderColor: '#E2EEFF', backgroundColor: '#F8FBFF' } : undefined}
          >
            <div className={styles.headerCard}>
              <Text style={!isDarkMode ? { color: '#6B7280' } : undefined}>Pré-visualização ao Vivo</Text>
            </div>
            <div className={styles.fontFamilyRadioContainer}>
              <Heading size="6" color={isDarkMode ? 'white' : 'default'}>Acessibilidade para Todos</Heading>
              <Heading size="3" color={isDarkMode ? 'white' : 'default'} weight='600'>Criando experiências digitais inclusivas</Heading>
            </div>
            <Card
              color='primary'
              className={styles.previewCard}
              style={!isDarkMode ? { backgroundColor: '#FFFFFF' } : undefined}
            >
              <Text color={isDarkMode ? 'lightGray' : 'default'} className="dynamic-text">A tipografia desempenha um papel fundamental na acessibilidade. Textos bem formatados, com tamanho adequado e bom contraste, garantem que a informação chegue a todos os usuários, independentemente de suas capacidades visuais ou cognitivas.</Text>
              <Text color={isDarkMode ? 'lightGray' : 'default'} className="dynamic-text">Ajuste os controles acima para encontrar a combinação perfeita para sua leitura. As alterações são aplicadas instantaneamente em toda a interface.</Text>
            </Card>
            <div className={styles.buttonContainer}>
              <Button>Botao Principal</Button>
              <Button
                variant='outline'
                style={!isDarkMode ? { color: '#14569B', backgroundColor: '#EFF8FF', borderColor: '#BFE2FE' } : undefined}
              >
                Botao Secundario
              </Button>
            </div>
            <div>
              <Text style={!isDarkMode ? { color: '#6B7280' } : undefined}> Exemplo de texto pequeno ou legenda</Text>
            </div>
          </Card>
        </div>
      </div>

      <Modal isOpen={isResetModalOpen} onClose={() => setIsResetModalOpen(false)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(127, 29, 29, 0.3)', padding: 'var(--space-2)', borderRadius: 'var(--radius-full)' }}>
              <AlertCircle color="#F87171" size={24} />
            </div>
            <Heading color="white" size="3">Restaurar padrões</Heading>
          </div>
          <Text color="muted" size="2">
            Tem certeza que deseja apagar todas as suas personalizações? O sistema voltará ao estado original de fábrica.
          </Text>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
            <Button variant="ghost" style={{ color: '#FFFFFF' }} onClick={() => setIsResetModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="solid"
              color="danger"
              onClick={confirmResetDefaults}
              style={{ backgroundColor: '#7F1D1D', color: '#F87171', border: '1px solid #991B1B' }}
            >
              Restaurar
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
}