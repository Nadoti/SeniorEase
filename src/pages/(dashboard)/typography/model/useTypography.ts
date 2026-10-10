import { useAtom } from 'jotai';
import { typographyState, DEFAULT_TYPOGRAPHY } from '@/entities/user-preferences';
import type { TypographyConfig } from '@/entities/user-preferences';
import { useState } from 'react';
import { toast } from 'sonner';
import { securityState } from '@/entities/user-preferences';
export function useTypography() {
  const [extraSecurity] = useAtom(securityState);
  const [typography, setTypography] = useAtom(typographyState);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const updateTypo = <K extends keyof TypographyConfig>(key: K, val: TypographyConfig[K]) => {
    setTypography(prev => ({ ...prev, [key]: val }));
  };
  const confirmResetDefaults = () => {
    setTypography(DEFAULT_TYPOGRAPHY);
    toast.success('Tipografia restaurada com sucesso');
    setIsResetModalOpen(false);
  };

  const handleResetRequest = () => {
    if (extraSecurity) setIsResetModalOpen(true);
    else confirmResetDefaults();
  };

  return {
    typography,
    updateTypo,
    isResetModalOpen,
    setIsResetModalOpen,
    confirmResetDefaults,
    handleResetRequest,
  };
}
