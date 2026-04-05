import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading, Text, Button, Card, Switch, Separator, Modal } from '@/shared/ui';
import { Bell, Clock, Calendar, Trash2, Plus, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import styles from './RemindersPage.module.css';

interface Reminder {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  isDaily: boolean;
  active: boolean;
}

const mockReminders: Reminder[] = [
  { id: '1', title: 'Tomar remédio de pressão', subtitle: '1 comprimido de Losartana', time: '08:00', isDaily: true, active: true },
  { id: '2', title: 'Fisioterapia', subtitle: 'Sessão na clínica central', time: '14:30', isDaily: false, active: true },
];

export function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>(mockReminders);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [reminderToDelete, setReminderToDelete] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [isDaily, setIsDaily] = useState(false);

  const handleOpenForm = () => {
    setIsLoadingForm(true);
    setTimeout(() => {
      setIsLoadingForm(false);
      setIsFormOpen(true);
    }, 600); // simulate loading
  };

  const clearForm = () => {
    setTitle('');
    setTime('');
    setIsDaily(false);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    clearForm();
  };

  const handleSave = () => {
    if (!title || !time) return;
    setReminders([{
      id: Date.now().toString(),
      title,
      subtitle: '',
      time,
      isDaily,
      active: true
    }, ...reminders]);
    handleCancel();
  };

  const toggleActive = (id: string) => {
    setReminders(rs => rs.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const deleteReminder = (id: string) => {
    setReminderToDelete(id);
  };

  const confirmDelete = () => {
    if (reminderToDelete) {
      setReminders(rs => rs.filter(r => r.id !== reminderToDelete));
      setReminderToDelete(null);
      toast.success('Lembrete excluído com sucesso');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerTop}>
        <div className={styles.headerText}>
          <Heading>Lembretes</Heading>
          <Text color="muted">Nunca esqueça de atividades importantes com avisos amigáveis.</Text>
        </div>
        {!isFormOpen && (
          <Button
            color="primary"
            leftIcon={!isLoadingForm && <Plus size={18} />}
            onClick={handleOpenForm}
            loading={isLoadingForm}
          >
            {isLoadingForm ? 'Processando...' : 'Novo lembrete'}
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <Card variant="surface" className={styles.formCard}>
              <div className={styles.formHeader}>
                <Bell size={20} />
                <span>Configurar novo lembrete</span>
              </div>

              <div className={styles.inputGroup}>
                <span className={styles.label}>O que você precisa lembrar?</span>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Ex: Tomar remedio, beber agua..."
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>

              <div className={styles.row}>
                <div style={{ flex: 1 }}>
                  <input
                    type="time"
                    className={styles.input}
                    value={time}
                    onChange={e => setTime(e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', flex: 1, marginLeft: '12px' }}>
                  <Text color="muted" size="2">Repetir todos os dias</Text>
                  <Switch checked={isDaily} onCheckedChange={setIsDaily} />
                </div>
              </div>

              <div className={styles.formActions}>
                <div className={styles.actionCancel}>
                  <Button variant="ghost" fullWidth onClick={handleCancel}>Cancelar</Button>
                </div>
                <div className={styles.actionSave}>
                  <Button color="primary" fullWidth onClick={handleSave}>Salvar lembrete</Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.list}>
        {reminders.map(item => (
          <div key={item.id} className={styles.reminderCard}>
            <div className={styles.reminderHeader}>
              <div className={styles.timeWrapper}>
                <Clock size={16} />
                <span>{item.time}</span>
              </div>
              <Switch checked={item.active} onCheckedChange={() => toggleActive(item.id)} />
            </div>

            <div className={styles.body}>
              <Heading as="h3" size="4">{item.title}</Heading>
              {item.subtitle && <Text color="muted">{item.subtitle}</Text>}
            </div>

            <Separator />

            <div className={styles.footer}>
              <div className={styles.repeatInfo}>
                <Calendar size={16} />
                <span>{item.isDaily ? 'Repetir todos os dias' : 'Não repete'}</span>
              </div>
              <div className={styles.deleteButton} onClick={() => deleteReminder(item.id)}>
                <Trash2 size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={!!reminderToDelete} onClose={() => setReminderToDelete(null)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(127, 29, 29, 0.3)', padding: 'var(--space-2)', borderRadius: 'var(--radius-full)' }}>
              <AlertCircle color="#F87171" size={24} />
            </div>
            <Heading color="white" size="3">Excluir lembrete</Heading>
          </div>
          <Text color="muted" size="2">
            Tem certeza que deseja excluir este lembrete? Esta ação não pode ser desfeita.
          </Text>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
            <Button variant="ghost" style={{ color: '#FFFFFF' }} onClick={() => setReminderToDelete(null)}>
              Cancelar
            </Button>
            <Button
              variant="solid"
              color="danger"
              onClick={confirmDelete}
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
