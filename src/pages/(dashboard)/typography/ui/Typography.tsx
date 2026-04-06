import { Card, Heading, Slider, Text } from '@/shared/ui';
import styles from './Typography.module.css';
import { Button } from '@/shared/ui/button';
import { Modal } from '@/shared/ui/modal';
import { AlertCircle, Type } from 'lucide-react';
import { Avatar } from '@/shared/ui';
import { useTypography } from '../model/useTypography';
import { FontFamilyRadio } from './components';

export function TypographyPage() {
  const {
    typography,
    updateTypo,
    isResetModalOpen,
    setIsResetModalOpen,
    confirmResetDefaults,
  } = useTypography();

  return (
    <section style={{ paddingBottom: '64px' }}>
      <div className={styles.header}>
        <Heading>Tipografia</Heading>
        <Text className="dynamic-text">Personalize as fontes, tamanhos e espaçamentos de texto para melhorar a legibilidade.</Text>
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
              <Slider label="Tamanho da Fonte" unit="px" showLimits min={12} max={24} step={1} value={typography.fontSize} onValueChange={(val) => updateTypo('fontSize', val)} variant="surface" color="primary" size="2" />
              <Slider label="Peso da Fonte" unit="" showLimits min={300} max={700} step={100} value={typography.fontWeight} onValueChange={(val) => updateTypo('fontWeight', val)} variant="surface" color="primary" size="2" />
              <Slider label="Altura da Linha" unit="" showLimits min={1.2} max={2.0} step={0.1} value={typography.lineHeight} onValueChange={(val) => updateTypo('lineHeight', val)} variant="surface" color="primary" size="2" />
              <Slider label="Espaçamento de Letras" unit="em" showLimits min={-0.05} max={0.15} step={0.01} value={typography.letterSpacing} onValueChange={(val) => updateTypo('letterSpacing', Number(val.toFixed(2)))} variant="surface" color="primary" size="2" />
            </div>
          </Card>
          <div className={styles.buttonContainer}>
            <Button variant="ghost" className={styles.restoreButton} onClick={() => setIsResetModalOpen(true)}>
              Restaurar padrões
            </Button>
          </div>
        </div>

        <div>
          <Card variant='outline' className={styles.previewOutlineCard}>
            <div className={styles.headerCard}>
              <Text className={styles.previewLabel}>Pré-visualização ao Vivo</Text>
            </div>
            <div className={styles.fontFamilyRadioContainer}>
              <Heading size="6">Acessibilidade para Todos</Heading>
              <Heading size="3" weight='600'>Criando experiências digitais inclusivas</Heading>
            </div>
            <Card color='primary' className={styles.previewCardInner}>
              <Text className={`${styles.previewBodyText} dynamic-text`}>A tipografia desempenha um papel fundamental na acessibilidade. Textos bem formatados, com tamanho adequado e bom contraste, garantem que a informação chegue a todos os usuários, independentemente de suas capacidades visuais ou cognitivas.</Text>
              <Text className={`${styles.previewBodyText} dynamic-text`}>Ajuste os controles acima para encontrar a combinação perfeita para sua leitura. As alterações são aplicadas instantaneamente em toda a interface.</Text>
            </Card>
            <div className={styles.buttonContainer}>
              <Button>Botao Principal</Button>
              <Button variant='outline' className={styles.secondaryButton}>Botao Secundario</Button>
            </div>
            <div>
              <Text className={styles.exampleText}>Exemplo de texto pequeno ou legenda</Text>
            </div>
          </Card>
        </div>
      </div>

      <Modal isOpen={isResetModalOpen} onClose={() => setIsResetModalOpen(false)}>
        <div className={styles.modalBody}>
          <div className={styles.modalHeader}>
            <div className={styles.modalIconWrapper}><AlertCircle color="#F87171" size={24} /></div>
            <Heading color="white" size="3">Restaurar padrões</Heading>
          </div>
          <Text color="muted" size="2">Tem certeza que deseja apagar todas as suas personalizações? O sistema voltará ao estado original de fábrica.</Text>
          <div className={styles.modalActions}>
            <Button variant="ghost" className={styles.modalCancelButton} onClick={() => setIsResetModalOpen(false)}>Cancelar</Button>
            <Button variant="solid" color="danger" className={styles.modalDangerButton} onClick={confirmResetDefaults}>Restaurar</Button>
          </div>
        </div>
      </Modal>
    </section>
  );
}