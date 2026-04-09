import { Heading, Text, Button, Switch, Card, Modal } from '@/shared/ui';
import { User, RotateCcw, AlertCircle } from 'lucide-react';
import styles from './ProfilePage.module.css';
import { useProfile } from '../model/useProfile';

export function ProfilePage() {
  const { userName, setUserName, extraSecurity, setExtraSecurity, isResetModalOpen, setIsResetModalOpen, confirmReset } = useProfile();

  return (
    <div className={styles.container}>
      <div className={styles.headerText}>
        <Heading className={styles.pageTitle}>Meu perfil</Heading>
        <Text color="muted">Gerencie suas informações e preferências gerais do sistema.</Text>
      </div>

      <div className={styles.layout}>
        <div className={styles.leftColumn}>
          <Card variant="surface" color="primary" className={styles.card}>
            <span className={styles.cardTitle}>Identificação</span>
            <div className={styles.userIconWrapper}><User size={32} /></div>
            <div className={styles.inputGroup}>
              <span className={styles.inputLabel}>Como gostaria de ser chamado?</span>
              <input type="text" value={userName} onChange={e => setUserName(e.target.value)} className={styles.customInput} />
            </div>
          </Card>
          <Card variant="surface" color="primary" className={styles.card}>
            <span className={styles.cardTitle}>Ações do sistema</span>
            <Button variant="solid" color="danger" leftIcon={<RotateCcw size={18} />} onClick={() => setIsResetModalOpen(true)} className={styles.dangerActionButton}>Restaurar padrões</Button>
          </Card>
        </div>

        <div className={styles.rightColumn}>
          <Card variant="surface" color="primary" className={styles.card}>
            <span className={styles.cardTitle}>Resumo das Suas Preferências</span>
            <div className={styles.preferencesList}>
              {[
                { label: 'Leitor de Voz (Sintetizador)', desc: 'Auxilia na leitura das páginas.', value: 'Ativado', cls: styles.preferenceValueActive },
                { label: 'Indicadores de Foco', desc: 'Bordas destacadas e coloridas.', value: 'Ativado', cls: styles.preferenceValueActive },
                { label: 'Navegação por Teclado', desc: 'Atalhos P, C, T, G e numéricos ativos.', value: 'Ativado', cls: styles.preferenceValueActive },
                { label: 'Tema Principal', desc: 'Contrastes luminosos do sistema.', value: 'Escuro', cls: styles.preferenceValueInfo },
                { label: 'Estilo do Menu', desc: 'Formato do painel de navegação geral.', value: 'Flutuante', cls: styles.preferenceValueInfo },
                { label: 'Tamanho da Fonte', desc: 'Tipografia ajustada para legibilidade máxima.', value: 'Expandido', cls: styles.preferenceValueInfo },
              ].map(pref => (
                <div key={pref.label} className={styles.preferenceItem}>
                  <div>
                    <Text className={styles.preferenceLabel}>{pref.label}</Text>
                    <Text color="white" size="1">{pref.desc}</Text>
                  </div>
                  <Text className={pref.cls}>{pref.value}</Text>
                </div>
              ))}
            </div>
            <div className={styles.securityCard}>
              <div className={styles.securityText}>
                <span className={styles.securityTitle}>Confirmações Extras de Segurança</span>
                <span className={styles.securityDesc}>Exige confirmação antes de excluir itens ou realizar ações irreversíveis.</span>
              </div>
              <Switch checked={extraSecurity} onCheckedChange={setExtraSecurity} color="danger" />
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
            <Button variant="solid" color="danger" className={styles.modalDangerButton} onClick={confirmReset}>Restaurar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
