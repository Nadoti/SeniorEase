import { useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router';
import { authState } from '@/entities/session';

export function useSignOut() {
  const setIsAuthenticated = useSetAtom(authState);
  const navigate = useNavigate();
  return useCallback(() => {
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  }, [setIsAuthenticated, navigate]);
}
