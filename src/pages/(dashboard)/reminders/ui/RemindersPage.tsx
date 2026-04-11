import { motion, AnimatePresence } from 'framer-motion';
import { Heading, Text, Button, Card, Switch, Separator, Modal } from '@/shared/ui';
import { Bell, Clock, Calendar, Trash2, Plus, AlertCircle } from 'lucide-react';
import styles from './RemindersPage.module.css';
import { useReminders } from '../model/useReminders';
export function RemindersPage() {
  const {
    reminders, isFormOpen, isLoadingForm, reminderToDelete, setReminderToDelete,
    title, setTitle, time, setTime, isDaily, setIsDaily,
    handleOpenForm, handleCancel, handleSave, toggleActive, confirmDelete, handleRequestDelete,
  } = useReminders();
  return (
    <div className={styles.container}>
      <div className={styles.headerTop}>
        <div className={styles.headerText}>
          <Heading>Lembretes</Heading>
          <Text color="muted">Nunca esqueça de atividades importantes com avisos amigáveis.</Text>
        </div>
        {!isFormOpen && (
          <Button color="primary" leftIcon={!isLoadingForm && <Plus size={18} />} onClick={handleOpenForm} loading={isLoadingForm}>
            {isLoadingForm ? 'Processando...' : 'Novo lembrete'}
          </Button>
        )}
      </div>
      <AnimatePresence>
        {isFormOpen && (
          <motion.div initial={{ opacity: 0, height: 0, scale: 0.95 }} animate={{ opacity: 1, height: 'auto', scale: 1 }} exit={{ opacity: 0, height: 0, scale: 0.95 }} transition={{ duration: 0.3 }} className={styles.animOverflow}>
            <Card variant="surface" className={styles.formCard}>
              <div className={styles.formHeader}><Bell size={20} /><span>Configurar novo lembrete</span></div>
              <div className={styles.inputGroup}>
                <span className={styles.label}>O que você precisa lembrar?</span>
                <input type="text" className={styles.input} placeholder="Ex: Tomar remedio, beber agua..." value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              <div className={styles.row}>
                <div className={styles.timeInputCol}><input type="time" className={styles.input} value={time} onChange={e => setTime(e.target.value)} /></div>
                <div className={styles.repeatCol}><Text color="muted" size="2">Repetir todos os dias</Text><Switch checked={isDaily} onCheckedChange={setIsDaily} /></div>
              </div>
              <div className={styles.formActions}>
                <div className={styles.actionCancel}><Button variant="ghost" fullWidth onClick={handleCancel}>Cancelar</Button></div>
                <div className={styles.actionSave}><Button color="primary" fullWidth onClick={handleSave}>Salvar lembrete</Button></div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={styles.list}>
        {reminders.map(item => (
          <div key={item.id} className={styles.reminderCard}>
            <div className={styles.reminderHeader}>
              <div className={styles.timeWrapper}><Clock size={16} /><span>{item.time}</span></div>
              <Switch checked={item.active} onCheckedChange={() => toggleActive(item.id)} />
            </div>
            <div className={styles.body}>
              <Heading as="h3" size="4">{item.title}</Heading>
              {item.subtitle && <Text color="muted">{item.subtitle}</Text>}
            </div>
            <Separator />
            <div className={styles.footer}>
              <div className={styles.repeatInfo}><Calendar size={16} /><span>{item.isDaily ? 'Repetir todos os dias' : 'Não repete'}</span></div>
              <div className={styles.deleteButton} onClick={() => handleRequestDelete(item.id)}><Trash2 size={18} /></div>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={!!reminderToDelete} onClose={() => setReminderToDelete(null)}>
        <div className={styles.modalBody}>
          <div className={styles.modalHeader}>
            <div className={styles.modalIconWrapper}><AlertCircle color="#F87171" size={24} /></div>
            <Heading color="white" size="3">Excluir lembrete</Heading>
          </div>
          <Text color="muted" size="2">Tem certeza que deseja excluir este lembrete? Esta ação não pode ser desfeita.</Text>
          <div className={styles.modalActions}>
            <Button variant="ghost" className={styles.modalCancelButton} onClick={() => setReminderToDelete(null)}>Cancelar</Button>
            <Button variant="solid" color="danger" className={styles.modalDangerButton} onClick={confirmDelete}>Excluir</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
