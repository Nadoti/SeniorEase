import { useState } from 'react';
import { toast } from 'sonner';
interface Task {
  id: string;
  title: string;
  subtitle?: string;
  completed: boolean;
  important: boolean;
}
const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Caminhada leve', subtitle: '15 minutos no quarteirão', completed: true, important: false },
  { id: '2', title: 'Tomar remédio da pressão', subtitle: 'Após o almoço', completed: false, important: true },
  { id: '3', title: 'Ligar para os netos', completed: false, important: false },
];
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskSubtitle, setNewTaskSubtitle] = useState('');
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
    setTasks([...tasks, { id: Date.now().toString(), title: newTaskText, subtitle: newTaskSubtitle.trim() || undefined, completed: false, important: isNewTaskImportant }]);
    setNewTaskText('');
    setNewTaskSubtitle('');
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
  return {
    tasks: filteredTasks,
    newTaskText,
    setNewTaskText,
    newTaskSubtitle,
    setNewTaskSubtitle,
    filter,
    setFilter,
    taskToDelete,
    setTaskToDelete,
    isNewTaskImportant,
    setIsNewTaskImportant,
    toggleTask,
    handleAdd,
    handleDeleteConfirm,
  };
}
export type { Task };
