import { useState } from 'react';
import { toast } from 'sonner';

export function useProfile() {
  const [userName, setUserName] = useState('João da Silva');
  const [extraSecurity, setExtraSecurity] = useState(true);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const confirmReset = () => {
    toast.success('Padrões de perfil restaurados com sucesso');
    setIsResetModalOpen(false);
  };

  return {
    userName,
    setUserName,
    extraSecurity,
    setExtraSecurity,
    isResetModalOpen,
    setIsResetModalOpen,
    confirmReset,
  };
}
