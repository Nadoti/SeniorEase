import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useTasks } from './useTasks';
describe('useTasks Hook', () => {
  it('should initialize with default tasks', () => {
    const { result } = renderHook(() => useTasks());
    expect(result.current.tasks.length).toBe(3);
    expect(result.current.tasks[0].title).toBe('Caminhada leve');
  });
  it('should add a new task without a subtitle', () => {
    const { result } = renderHook(() => useTasks());
    act(() => {
      result.current.setNewTaskText('Nova tarefa de teste');
    });
    act(() => {
      result.current.handleAdd();
    });
    expect(result.current.tasks.length).toBe(4);
    expect(result.current.tasks[3].title).toBe('Nova tarefa de teste');
    expect(result.current.tasks[3].subtitle).toBeUndefined();
    expect(result.current.tasks[3].completed).toBe(false);
  });
  it('should add a new task with a subtitle', () => {
    const { result } = renderHook(() => useTasks());
    act(() => {
      result.current.setNewTaskText('Ir ao mercado');
      result.current.setNewTaskSubtitle('Comprar frutas e vegetais');
    });
    act(() => {
      result.current.handleAdd();
    });
    const newTask = result.current.tasks.find(t => t.title === 'Ir ao mercado');
    expect(newTask).toBeDefined();
    expect(newTask?.subtitle).toBe('Comprar frutas e vegetais');
  });
  it('should not add extremely empty or whitespace tasks', () => {
    const { result } = renderHook(() => useTasks());
    const initialLength = result.current.tasks.length;
    act(() => {
      result.current.setNewTaskText('   ');
      result.current.handleAdd();
    });
    expect(result.current.tasks.length).toBe(initialLength);
  });
  it('should toggle a task completion status', () => {
    const { result } = renderHook(() => useTasks());
    const initialCompleted = result.current.tasks[0].completed;
    act(() => {
      result.current.toggleTask(result.current.tasks[0].id);
    });
    expect(result.current.tasks[0].completed).not.toBe(initialCompleted);
  });
  it('should filter tasks properly', () => {
    const { result } = renderHook(() => useTasks());
    act(() => {
      result.current.setFilter('Concluídas');
    });
    expect(result.current.tasks.every(t => t.completed)).toBe(true);
    act(() => {
      result.current.setFilter('Pendentes');
    });
    expect(result.current.tasks.every(t => !t.completed)).toBe(true);
  });
  it('should remove a task upon confirmation', () => {
    const { result } = renderHook(() => useTasks());
    const taskToDelete = result.current.tasks[0];
    act(() => {
      result.current.setTaskToDelete(taskToDelete.id);
    });
    act(() => {
      result.current.handleDeleteConfirm();
    });
    expect(result.current.tasks.find(t => t.id === taskToDelete.id)).toBeUndefined();
  });
});
