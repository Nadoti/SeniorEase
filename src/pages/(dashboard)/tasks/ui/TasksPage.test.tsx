import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TasksPage } from './TasksPage';
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  }
}));
describe('TasksPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should render the tasks page with initial active tasks', () => {
    render(<TasksPage />);
    expect(screen.getByText('Minhas Tarefas')).toBeInTheDocument();
    expect(screen.getByText('Caminhada leve')).toBeInTheDocument();
    expect(screen.getByText('Ligar para os netos')).toBeInTheDocument();
  });
  it('should allow adding a new task and rendering it on the screen', () => {
    render(<TasksPage />);
    const inputMain = screen.getByPlaceholderText('O que você precisa fazer hoje?');
    const inputDesc = screen.getByPlaceholderText('Detalhes adicionais (opcional)');
    const addButton = screen.getByRole('button', { name: /adicionar/i });
    fireEvent.change(inputMain, { target: { value: 'Comprar frutas' } });
    fireEvent.change(inputDesc, { target: { value: 'No supermercado da esquina' } });
    fireEvent.click(addButton);
    expect(screen.getByText('Comprar frutas')).toBeInTheDocument();
    expect(screen.getByText('No supermercado da esquina')).toBeInTheDocument();
  });
});
