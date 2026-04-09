import { Card, Button, Text, Heading, Modal } from '@/shared/ui';
import { Plus, CheckCircle2, Circle, AlertCircle, Trash2 } from 'lucide-react';
import { cx } from '@/shared/lib';
import styles from './TasksPage.module.css';
import { useTasks } from '../model/useTasks';

export function TasksPage() {
  const {
    tasks, newTaskText, setNewTaskText, filter, setFilter,
    taskToDelete, setTaskToDelete, isNewTaskImportant, setIsNewTaskImportant,
    toggleTask, handleAdd, handleDeleteConfirm,
  } = useTasks();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Heading>Minhas Tarefas</Heading>
        <Text color="muted">Organize suas atividades diárias de forma simples e direta.</Text>
      </div>

      <Card variant="surface" className={styles.addTaskCard}>
        <div className={styles.addTaskHeader}><Plus size={20} /><span>Adicionar nova tarefa</span></div>
        <div className={styles.addTaskForm}>
          <div className={styles.inputWrapper}>
            <input type="text" className={styles.input} placeholder="O que você precisa fazer hoje?" value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAdd()} />
          </div>
          <Button variant={isNewTaskImportant ? "solid" : "soft"} color={isNewTaskImportant ? "danger" : "neutral"} size="2" onClick={() => setIsNewTaskImportant(!isNewTaskImportant)} title="Marcar como Importante" className={isNewTaskImportant ? styles.importantButtonActive : undefined}>
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

      <div color='primary' className={styles.taskList}>
        {tasks.map(task => (
          <div key={task.id} className={styles.taskItem}>
            <div className={styles.taskMainInfo}>
              <div className={styles.statusIconWrapper} onClick={() => toggleTask(task.id)}>
                {task.completed ? <CheckCircle2 className={styles.checkIcon} size={24} /> : <Circle className={styles.bolinha} size={24} />}
              </div>
              <div className={styles.textContent}>
                <span className={cx(styles.title, task.completed && styles.completed)}>{task.title}</span>
                {task.subtitle && <span className={styles.subtitle}>{task.subtitle}</span>}
              </div>
            </div>
            <div className={styles.taskActions}>
              {task.important && (
                <div className={styles.importantAlert}><AlertCircle size={16} /><span className={styles.importantAlertText}>Importante</span></div>
              )}
              <Trash2 className={styles.deleteButton} size={20} onClick={() => setTaskToDelete(task.id)} />
            </div>
          </div>
        ))}
        {tasks.length === 0 && <Text color="muted" className={styles.emptyState}>Nenhuma tarefa encontrada.</Text>}
      </div>

      <Modal isOpen={!!taskToDelete} onClose={() => setTaskToDelete(null)}>
        <div className={styles.modalBody}>
          <div className={styles.modalHeader}>
            <div className={styles.modalIconWrapper}><AlertCircle color="#F87171" size={24} /></div>
            <Heading color="white" size="3">Excluir tarefa</Heading>
          </div>
          <Text color="muted" size="2">Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita.</Text>
          <div className={styles.modalActions}>
            <Button variant="ghost" className={styles.modalCancelButton} onClick={() => setTaskToDelete(null)}>Cancelar</Button>
            <Button variant="solid" color="danger" className={styles.modalDangerButton} onClick={handleDeleteConfirm}>Excluir</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
