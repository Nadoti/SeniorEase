import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export function useRegister() {
  const navigate = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Exemplo de submissão do form
  const handleRegister = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    toast.success('Conta criada com sucesso!');
    setTimeout(() => {
      navigate('/login', { replace: true });
    }, 800);
  };

  return {
    mostrarSenha,
    setMostrarSenha,
    handleRegister
  };
}
