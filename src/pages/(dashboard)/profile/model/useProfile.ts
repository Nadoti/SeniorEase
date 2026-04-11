import { useState } from 'react';
import { toast } from 'sonner';
import { useAtom } from 'jotai';
import { securityState } from '@/shared/model/securityState';
export function useProfile() {
  const [userName, setUserName] = useState('João da Silva');
  const [extraSecurity, setExtraSecurity] = useAtom(securityState);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const confirmReset = () => {
    toast.success('Padrões de perfil restaurados com sucesso');
    setIsResetModalOpen(false);
  };

  const handleResetRequest = () => {
    if (extraSecurity) setIsResetModalOpen(true);
    else confirmReset();
  };

  const handleSaveName = () => {
    toast.success(`Seu nome foi atualizado para ${userName}.`);
  };

  return {
    userName,
    setUserName,
    extraSecurity,
    setExtraSecurity,
    isResetModalOpen,
    setIsResetModalOpen,
    confirmReset,
    handleSaveName,
    handleResetRequest,
  };
}
