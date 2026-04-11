import { useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { authState } from '@/shared/model/authState';

export function useLogin() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [manterConectado, setManterConectado] = useState(false);
  
  const [, setIsAuthenticated] = useAtom(authState);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
    toast.success('Login efetuado com sucesso!');
    setTimeout(() => {
      navigate('/dashboard/painel', { replace: true });
    }, 500);
  };

  return {
    mostrarSenha,
    setMostrarSenha,
    manterConectado,
    setManterConectado,
    handleLogin,
  };
}
