import { useState } from 'react';
import { Card, Button, Text, Heading, Modal } from '@/shared/ui';
import { toast } from 'sonner';
import { Plus, CheckCircle2, Circle, AlertCircle, Trash2 } from 'lucide-react';
import { cx } from '@/shared/lib';
import styles from './TasksPage.module.css';

interface Task {
  id: string;
  title: string;
  subtitle?: string;
  completed: boolean;
  important: boolean;
}

const initialTasks: Task[] = [
  { id: '1', title: 'Caminhada leve', subtitle: '15 minutos no quarteirão', completed: true, important: false },
  { id: '2', title: 'Tomar remédio da pressão', subtitle: 'Após o almoço', completed: false, important: true },
  { id: '3', title: 'Ligar para os netos', completed: false, important: false },
];

export function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState<'Todos' | 'Pendentes' | 'Concluídas'>('Todos');
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [isNewTaskImportant, setIsNewTaskImportant] = useState(false);

  const filteredTasks = tasks.filter(t => {
    if (filter === 'Pendentes') return !t.completed;
    if (filter === 'Concluídas') return t.completed;
    return true;
  });

  const toggleTask = (id: string) => setTasks(ts => ts.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

  const handleAdd = () => {
    if (!newTaskText.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), title: newTaskText, completed: false, important: isNewTaskImportant }]);
    setNewTaskText('');
    setIsNewTaskImportant(false);
    toast.success('Tarefa adicionada com sucesso');
  };

  const handleDeleteConfirm = () => {
    if (taskToDelete) {
      setTasks(ts => ts.filter(t => t.id !== taskToDelete));
      setTaskToDelete(null);
      toast.success('Tarefa excluída com sucesso');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Heading>Minhas Tarefas</Heading>
        <Text color="muted">Organize suas atividades diárias de forma simples e direta.</Text>
      </div>

      <Card variant="surface" className={styles.addTaskCard}>
        <div className={styles.addTaskHeader}>
          <Plus size={20} />
          <span>Adicionar nova tarefa</span>
        </div>
        <div className={styles.addTaskForm}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.input}
              placeholder="O que você precisa fazer hoje?"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
          </div>
          <Button
            variant={isNewTaskImportant ? "solid" : "soft"}
            color={isNewTaskImportant ? "danger" : "neutral"}
            size="2"
            onClick={() => setIsNewTaskImportant(!isNewTaskImportant)}
            title="Marcar como Importante"
            style={isNewTaskImportant ? { backgroundColor: '#450a0a', color: '#EF4444' } : undefined}
          >
            <AlertCircle size={18} />
          </Button>
          <Button onClick={handleAdd} color="primary" size="2">Adicionar</Button>
        </div>
      </Card>

      <div className={styles.filters}>
        <Button variant={filter === 'Todos' ? 'solid' : 'soft'} onClick={() => setFilter('Todos')} size="1">Todos</Button>
        <Button variant={filter === 'Pendentes' ? 'solid' : 'soft'} onClick={() => setFilter('Pendentes')} size="1">Pendentes</Button>
        <Button variant={filter === 'Concluídas' ? 'solid' : 'soft'} onClick={() => setFilter('Concluídas')} size="1">Concluídas</Button>
        <Button variant="ghost" size="1">Importantes</Button>
        <Button variant="ghost" size="1">Hoje</Button>
      </div>

      <div className={styles.taskList}>
        {filteredTasks.map(task => (
          <div key={task.id} className={styles.taskItem}>

            <div className={styles.taskMainInfo}>
              <div className={styles.statusIconWrapper} onClick={() => toggleTask(task.id)}>
                {task.completed ? (
                  <CheckCircle2 className={styles.checkIcon} size={24} />
                ) : (
                  <Circle className={styles.bolinha} size={24} />
                )}
              </div>

              <div className={styles.textContent}>
                <span className={cx(styles.title, task.completed && styles.completed)}>{task.title}</span>
                {task.subtitle && <span className={styles.subtitle}>{task.subtitle}</span>}
              </div>
            </div>

            <div className={styles.taskActions}>
              {task.important && (
                <div className={styles.importantAlert}>
                  <AlertCircle size={16} />
                  <span className={styles.importantAlertText}>Importante</span>
                </div>
              )}
              <Trash2 className={styles.deleteButton} size={20} onClick={() => setTaskToDelete(task.id)} />
            </div>

          </div>
        ))}
        {filteredTasks.length === 0 && (
          <Text color="muted" style={{ textAlign: 'center', margin: '2rem 0' }}>Nenhuma tarefa encontrada.</Text>
        )}
      </div>

      <Modal isOpen={!!taskToDelete} onClose={() => setTaskToDelete(null)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(127, 29, 29, 0.3)', padding: 'var(--space-2)', borderRadius: 'var(--radius-full)' }}>
              <AlertCircle color="#F87171" size={24} />
            </div>
            <Heading color="white" size="3">Excluir tarefa</Heading>
          </div>
          <Text color="muted" size="2">
            Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita.
          </Text>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
            <Button variant="ghost" style={{ color: '#FFFFFF' }} onClick={() => setTaskToDelete(null)}>
              Cancelar
            </Button>
            <Button
              variant="solid"
              color="danger"
              onClick={handleDeleteConfirm}
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
