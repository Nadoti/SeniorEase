import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createStore, Provider, useAtomValue } from 'jotai';
import { MemoryRouter, useLocation } from 'react-router';
import { authState } from '@/entities/session';
import { useSignOut } from './useSignOut';

function SessionControls() {
  const signOut = useSignOut();
  const authenticated = useAtomValue(authState);
  const location = useLocation();
  return <>
    <output data-testid="session">{String(authenticated)}</output>
    <output data-testid="route">{location.pathname}</output>
    <button onClick={signOut}>Sair</button>
  </>;
}

describe('sign out', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  it('clears the persisted session and returns to login', () => {
    const store = createStore();
    store.set(authState, true);
    render(<Provider store={store}>
      <MemoryRouter initialEntries={['/dashboard/painel']}>
        <SessionControls />
      </MemoryRouter>
    </Provider>);

    expect(screen.getByTestId('session')).toHaveTextContent('true');
    fireEvent.click(screen.getByRole('button', { name: 'Sair' }));
    expect(screen.getByTestId('session')).toHaveTextContent('false');
    expect(screen.getByTestId('route')).toHaveTextContent('/login');
    expect(localStorage.getItem('seniorease_auth')).toBe('false');
  });
});
