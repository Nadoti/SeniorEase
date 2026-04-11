import { useState } from 'react';
import { toast } from 'sonner';
import { useAtom } from 'jotai';
import { securityState } from '@/shared/model/securityState';
interface Reminder {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  isDaily: boolean;
  active: boolean;
}
const MOCK_REMINDERS: Reminder[] = [
  { id: '1', title: 'Tomar remédio de pressão', subtitle: '1 comprimido de Losartana', time: '08:00', isDaily: true, active: true },
  { id: '2', title: 'Fisioterapia', subtitle: 'Sessão na clínica central', time: '14:30', isDaily: false, active: true },
];
export function useReminders() {
  const [extraSecurity] = useAtom(securityState);
  const [reminders, setReminders] = useState<Reminder[]>(MOCK_REMINDERS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [reminderToDelete, setReminderToDelete] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [isDaily, setIsDaily] = useState(false);
  const handleOpenForm = () => {
    setIsLoadingForm(true);
    setTimeout(() => {
      setIsLoadingForm(false);
      setIsFormOpen(true);
    }, 600);
  };
  const clearForm = () => { setTitle(''); setTime(''); setIsDaily(false); };
  const handleCancel = () => { setIsFormOpen(false); clearForm(); };
  const handleSave = () => {
    if (!title || !time) {
      toast.error('Preencha os campos obrigatórios.');
      return;
    }
    setReminders([{
      id: Date.now().toString(), title, subtitle: '', time, isDaily, active: true
    }, ...reminders]);
    toast.success('Lembrete criado com sucesso!');
    handleCancel();
  };
  const toggleActive = (id: string) => {
    setReminders(rs => rs.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };
  const confirmDelete = () => {
    if (reminderToDelete) {
      setReminders(rs => rs.filter(r => r.id !== reminderToDelete));
      setReminderToDelete(null);
      toast.success('Lembrete excluído com sucesso');
    }
  };

  const handleRequestDelete = (id: string) => {
    if (extraSecurity) {
      setReminderToDelete(id);
    } else {
      setReminders(rs => rs.filter(r => r.id !== id));
      toast.success('Lembrete excluído com sucesso');
    }
  };
  return {
    reminders,
    isFormOpen,
    isLoadingForm,
    reminderToDelete,
    setReminderToDelete,
    title,
    setTitle,
    time,
    setTime,
    isDaily,
    setIsDaily,
    handleOpenForm,
    handleCancel,
    handleSave,
    toggleActive,
    confirmDelete,
    handleRequestDelete,
  };
}
export type { Reminder };
