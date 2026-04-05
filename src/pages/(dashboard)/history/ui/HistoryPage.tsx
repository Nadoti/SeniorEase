import { useState } from 'react';
import { Heading, Text, Button, Card, Modal } from '@/shared/ui';
import { Clock, Trash2, Check, Plus, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import styles from './HistoryPage.module.css';

interface HistoryLog {
  id: string;
  type: 'created' | 'completed';
  taskName: string;
  date: string;
}

const mockHistory: HistoryLog[] = [
  { id: '1', type: 'completed', taskName: 'Tomar remédio da pressão', date: 'Hoje às 19:34' },
  { id: '2', type: 'created', taskName: 'Ligar para os netos', date: 'Hoje às 14:15' },
  { id: '3', type: 'completed', taskName: 'Caminhada leve', date: 'Ontem às 08:30' },
  { id: '4', type: 'created', taskName: 'Tomar remédio da pressão', date: 'Ontem às 07:00' },
];

export function HistoryPage() {
  const [logs, setLogs] = useState<HistoryLog[]>(mockHistory);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const handleClear = () => {
    setIsClearModalOpen(true);
  };

  const confirmClear = () => {
    setLogs([]);
    toast.success('Histórico limpo com sucesso');
    setIsClearModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerTop}>
        <div className={styles.headerText}>
          <Heading style={{ color: '#FFFFFF' }}>Histórico de atividades</Heading>
          <Text color="muted">Acompanhe tudo o que você realizou recentemente.</Text>
        </div>
        <Button
          variant="outline"
          color="danger"
          leftIcon={<Trash2 size={18} />}
          onClick={handleClear}
        >
          Limpar histórico
        </Button>
      </div>

      <Card variant="surface" color='primary' className={styles.timelineCard}>
        <div className={styles.timelineHeader}>
          <div className={styles.timelineHeaderIcon}>
            <Clock size={20} />
          </div>
          <span>Linha do tempo</span>
        </div>

        {logs.length > 0 ? (
          <div className={styles.timelineContainer}>
            {logs.map(log => (
              <div key={log.id} className={styles.timelineItem}>

                <div className={styles.iconWrapper}>
                  {log.type === 'completed' ? (
                    <div className={styles.iconOuter}>
                      <div className={`${styles.iconInner} ${styles.innerGreen}`}>
                        <Check size={16} strokeWidth={3} />
                      </div>
                    </div>
                  ) : (
                    <div className={styles.iconOuter}>
                      <div className={`${styles.iconInner} ${styles.innerBlue}`}>
                        <Plus size={16} strokeWidth={3} />
                      </div>
                    </div>
                  )}
                </div>

                <div className={styles.contentBlock}>
                  <span className={styles.timeText}>{log.date}</span>
                  <span className={styles.statusText}>
                    {log.type === 'completed' ? 'Tarefa concluída' : 'Nova tarefa criada'}
                  </span>
                  <span className={styles.taskDesc}>Tarefa: {log.taskName}</span>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <Text color="muted" align="center" style={{ padding: '2rem 0' }}>
            Nenhum histórico encontrado.
          </Text>
        )}
      </Card>

      <Modal isOpen={isClearModalOpen} onClose={() => setIsClearModalOpen(false)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(127, 29, 29, 0.3)', padding: 'var(--space-2)', borderRadius: 'var(--radius-full)' }}>
              <AlertCircle color="#F87171" size={24} />
            </div>
            <Heading color="white" size="3">Excluir histórico</Heading>
          </div>
          <Text color="muted" size="2">
            Tem certeza que deseja excluir todo o histórico? Esta ação não pode ser desfeita.
          </Text>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
            <Button variant="ghost" style={{ color: '#FFFFFF' }} onClick={() => setIsClearModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="solid"
              color="danger"
              onClick={confirmClear}
              style={{ backgroundColor: '#7F1D1D', color: '#F87171', border: '1px solid #991B1B' }}
            >
              Excluir
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
