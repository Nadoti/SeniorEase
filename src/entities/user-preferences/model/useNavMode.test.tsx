import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, beforeEach, expect, it } from 'vitest';
import { NavModeProvider } from '../ui/NavModeProvider';
import { useNavMode } from './useNavMode';

function ModeControls() {
  const { navMode, setNavMode } = useNavMode();
  return <>
    <output data-testid="mode">{navMode}</output>
    <button onClick={() => setNavMode('flutuante')}>Alterar navegação</button>
  </>;
}

beforeEach(() => localStorage.clear());
afterEach(() => {
  cleanup();
  localStorage.clear();
});

it('preserves the navigation preference across provider remounts', () => {
  const view = render(<NavModeProvider><ModeControls /></NavModeProvider>);
  expect(screen.getByTestId('mode')).toHaveTextContent('lateral');
  fireEvent.click(screen.getByRole('button', { name: 'Alterar navegação' }));
  expect(localStorage.getItem('seniorease_navMode')).toBe('flutuante');
  view.unmount();

  render(<NavModeProvider><ModeControls /></NavModeProvider>);
  expect(screen.getByTestId('mode')).toHaveTextContent('flutuante');
});
