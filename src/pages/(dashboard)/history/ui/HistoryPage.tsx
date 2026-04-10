import { Heading, Text, Button, Card, Modal } from '@/shared/ui';
import { Clock, Trash2, Check, Plus, AlertCircle } from 'lucide-react';
import styles from './HistoryPage.module.css';
import { useHistory } from '../model/useHistory';
export function HistoryPage() {
  const { logs, isClearModalOpen, setIsClearModalOpen, handleClear, confirmClear } = useHistory();
  return (
    <div className={styles.container}>
      <div className={styles.headerTop}>
        <div className={styles.headerText}>
          <Heading className={styles.pageTitle}>Histórico de atividades</Heading>
          <Text color="muted">Acompanhe tudo o que você realizou recentemente.</Text>
        </div>
        <Button variant="outline" color="danger" leftIcon={<Trash2 size={18} />} onClick={handleClear}>Limpar histórico</Button>
      </div>
      <Card variant="surface" color='primary' className={styles.timelineCard}>
        <div className={styles.timelineHeader}>
          <div className={styles.timelineHeaderIcon}><Clock size={20} /></div>
          <span>Linha do tempo</span>
        </div>
        {logs.length > 0 ? (
          <div className={styles.timelineContainer}>
            {logs.map(log => (
              <div key={log.id} className={styles.timelineItem}>
                <div className={styles.iconWrapper}>
                  <div className={styles.iconOuter}>
                    <div className={`${styles.iconInner} ${log.type === 'completed' ? styles.innerGreen : styles.innerBlue}`}>
                      {log.type === 'completed' ? <Check size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
                    </div>
                  </div>
                </div>
                <div className={styles.contentBlock}>
                  <span className={styles.timeText}>{log.date}</span>
                  <span className={styles.statusText}>{log.type === 'completed' ? 'Tarefa concluída' : 'Nova tarefa criada'}</span>
                  <span className={styles.taskDesc}>Tarefa: {log.taskName}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Text color="muted" align="center" className={styles.emptyState}>Nenhum histórico encontrado.</Text>
        )}
      </Card>
      <Modal isOpen={isClearModalOpen} onClose={() => setIsClearModalOpen(false)}>
        <div className={styles.modalBody}>
          <div className={styles.modalHeader}>
            <div className={styles.modalIconWrapper}><AlertCircle color="#F87171" size={24} /></div>
            <Heading color="white" size="3">Excluir histórico</Heading>
          </div>
          <Text color="muted" size="2">Tem certeza que deseja excluir todo o histórico? Esta ação não pode ser desfeita.</Text>
          <div className={styles.modalActions}>
            <Button variant="ghost" className={styles.modalCancelButton} onClick={() => setIsClearModalOpen(false)}>Cancelar</Button>
            <Button variant="solid" color="danger" className={styles.modalDangerButton} onClick={confirmClear}>Excluir</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
