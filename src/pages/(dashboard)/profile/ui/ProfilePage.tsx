import { useState } from 'react';
import { Heading, Text, Button, Switch, Card, Modal } from '@/shared/ui';
import { User, RotateCcw, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import styles from './ProfilePage.module.css';

export function ProfilePage() {
  const [userName, setUserName] = useState('João da Silva');
  const [extraSecurity, setExtraSecurity] = useState(true);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleReset = () => {
    setIsResetModalOpen(true);
  };

  const confirmReset = () => {
    toast.success('Padrões de perfil restaurados com sucesso');
    setIsResetModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerText}>
        <Heading style={{ color: '#FFFFFF' }}>Meu perfil</Heading>
        <Text color="muted">Gerencie suas informações e preferências gerais do sistema.</Text>
      </div>

      <div className={styles.layout}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          {/* Card 1: Identificação */}
          <Card variant="surface" color="primary" className={styles.card}>
            <span className={styles.cardTitle}>Identificação</span>

            <div className={styles.userIconWrapper}>
              <User size={32} />
            </div>

            <div className={styles.inputGroup}>
              <span className={styles.inputLabel}>Como gostaria de ser chamado?</span>
              <input
                type="text"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                className={styles.customInput}
              />
            </div>
          </Card>

          {/* Card 2: Ações do Sistema */}
          <Card variant="surface" color="primary" className={styles.card}>
            <span className={styles.cardTitle}>Ações do sistema</span>
            <Button
              variant="solid"
              color="danger"
              leftIcon={<RotateCcw size={18} />}
              onClick={handleReset}
              style={{ backgroundColor: 'rgba(127, 29, 29, 0.3)', color: '#F87171', border: '1px solid #991B1B' }} /* deep red bg 30%, red icon text */
            >
              Restaurar padrões
            </Button>
          </Card>
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          <Card variant="surface" color="primary" className={styles.card}>
            <span className={styles.cardTitle}>Resumo das Suas Preferências</span>

            <div className={styles.preferencesList}>
              <div className={styles.preferenceItem}>
                <div>
                  <Text style={{ color: '#E5E7EB' }}>Leitor de Voz (Sintetizador)</Text>
                  <Text color="muted" size="1">Auxilia na leitura das páginas.</Text>
                </div>
                <Text style={{ color: '#4ADE80' }}>Ativado</Text>
              </div>
              <div className={styles.preferenceItem}>
                <div>
                  <Text style={{ color: '#E5E7EB' }}>Indicadores de Foco</Text>
                  <Text color="muted" size="1">Bordas destacadas e coloridas.</Text>
                </div>
                <Text style={{ color: '#4ADE80' }}>Ativado</Text>
              </div>
              <div className={styles.preferenceItem}>
                <div>
                  <Text style={{ color: '#E5E7EB' }}>Navegação por Teclado</Text>
                  <Text color="muted" size="1">Atalhos P, C, T, G e numéricos ativos.</Text>
                </div>
                <Text style={{ color: '#4ADE80' }}>Ativado</Text>
              </div>
              <div className={styles.preferenceItem}>
                <div>
                  <Text style={{ color: '#E5E7EB' }}>Tema Principal</Text>
                  <Text color="muted" size="1">Contrastes luminosos do sistema.</Text>
                </div>
                <Text style={{ color: '#60A5FA' }}>Escuro</Text>
              </div>
              <div className={styles.preferenceItem}>
                <div>
                  <Text style={{ color: '#E5E7EB' }}>Estilo do Menu</Text>
                  <Text color="muted" size="1">Formato do painel de navegação geral.</Text>
                </div>
                <Text style={{ color: '#60A5FA' }}>Flutuante</Text>
              </div>
              <div className={styles.preferenceItem}>
                <div>
                  <Text style={{ color: '#E5E7EB' }}>Tamanho da Fonte</Text>
                  <Text color="muted" size="1">Tipografia ajustada para legibilidade máxima.</Text>
                </div>
                <Text style={{ color: '#60A5FA' }}>Expandido</Text>
              </div>
            </div>

            {/* Extra Security Card Mini */}
            <div className={styles.securityCard}>
              <div className={styles.securityText}>
                <span className={styles.securityTitle}>Confirmações Extras de Segurança</span>
                <span className={styles.securityDesc}>
                  Exige confirmação antes de excluir itens ou realizar ações irreversíveis.
                </span>
              </div>
              <Switch
                checked={extraSecurity}
                onCheckedChange={setExtraSecurity}
                color="danger"
              />
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
              onClick={confirmReset}
              style={{ backgroundColor: '#7F1D1D', color: '#F87171', border: '1px solid #991B1B' }}
            >
              Restaurar
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
