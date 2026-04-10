import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAtomValue } from 'jotai';
import { keyboardNavState } from '@/shared/model/keyboardNavState';
export function useKeyboardNavigation() {
  const enabled = useAtomValue(keyboardNavState);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!enabled) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const key = e.key.toLowerCase();
      switch (key) {
        case 'p':
          navigate('/dashboard/painel');
          return;
        case 'c':
          navigate('/dashboard/configuracoes/aparencia');
          return;
        case 't':
          navigate('/dashboard/tarefas');
          return;
        case 'g':
          navigate('/dashboard/guiada');
          return;
        case 'l':
          navigate('/dashboard/lembretes');
          return;
        case 'h':
          navigate('/dashboard/historico');
          return;
        case 'u':
          navigate('/dashboard/perfil');
          return;
      }
      if (location.pathname.startsWith('/dashboard/configuracoes')) {
        const numberNav: Record<string, string> = {
          '1': '/dashboard/configuracoes/aparencia',
          '2': '/dashboard/configuracoes/tipografia',
          '3': '/dashboard/configuracoes/indicadores-de-foco',
          '4': '/dashboard/configuracoes/filtros-de-cor',
          '5': '/dashboard/configuracoes/texto-para-fala',
        };
        if (numberNav[key]) {
          navigate(numberNav[key]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, navigate, location.pathname]);
}
