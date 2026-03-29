import { useState } from 'react';
import { Clock, Calendar, Trash2, Plus } from 'lucide-react';
import { Card, Heading, Text, Switch } from '@/shared/ui';
import styles from './RemindersPage.module.css';

import { Button } from '@/shared/ui/button';

interface Reminder {
  id: number;
  hora: string;
  titulo: string;
  descricao: string;
  recorrencia: string;
  ativo: boolean;
}

const remindersMock: Reminder[] = [
  {
    id: 1,
    hora: '10:00',
    titulo: 'Beber água',
    descricao: 'Lembre-se de se manter hidratado',
    recorrencia: 'Todos os dias',
    ativo: true,
  },
  {
    id: 2,
    hora: '14:30',
    titulo: 'Consulta médica',
    descricao: 'Dr. Silva - Cardiologista',
    recorrencia: 'Apenas uma vez',
    ativo: true,
  },
];

export function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>(remindersMock);

  const toggleAtivo = (id: number, checked: boolean) => {
    setReminders(prev =>
      prev.map(l => (l.id === id ? { ...l, ativo: checked } : l))
    );
  };

  const remover = (id: number) => {
    setReminders(prev => prev.filter(l => l.id !== id));
  };

  return (
    <section className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerText}>
          <Heading color="white">Meus Reminders</Heading>
          <Text color="default" size="4">
            Nunca esqueça de atividades importantes com avisos amigáveis.
          </Text>
        </div>
        <Button
          leftIcon={<Plus size={18} />}
          size="2"
          color="primary"
          variant="solid"
          radius="md"
          className={styles.newButton}
        >
          Novo Reminder
        </Button>
      </div>

      {/* Grid de cards */}
      <div className={styles.grid}>
        {reminders.map(reminder => (
          <Card key={reminder.id} color="dark" className={styles.card}>
            {/* Linha superior: hora + switch */}
            <div className={styles.cardTop}>
              <div className={styles.hora}>
                <Clock size={20} color="#2B8CE6" />
                <span className={styles.horaText}>{reminder.hora}</span>
              </div>
              <Switch


                color="info"

                variant="surface"
                checked={reminder.ativo}
                onCheckedChange={checked => toggleAtivo(reminder.id, checked)}
              />
            </div>

            {/* Título e descrição */}
            <div className={styles.cardBody}>
              <Heading size="2" color="white">{reminder.titulo}</Heading>
              <Text color="default" size="3">{reminder.descricao}</Text>
            </div>

            {/* Rodapé: recorrência + lixeira */}
            <div className={styles.cardFooter}>
              <div className={styles.recorrencia}>
                <Calendar size={16} color="var(--surface-text-muted)" />
                <Text color="muted" size="2">{reminder.recorrencia}</Text>
              </div>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => remover(reminder.id)}
                aria-label={`Remover reminder ${reminder.titulo}`}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
