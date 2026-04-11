import { useAtom } from 'jotai';
import { typographyState } from '@/shared/model/typographyState';
import { useState } from 'react';
import { toast } from 'sonner';
import { securityState } from '@/shared/model/securityState';
const DEFAULT_TYPOGRAPHY = {
  fontFamily: 'Inter, sans-serif',
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 1.5,
  letterSpacing: 0,
};
export function useTypography() {
  const [extraSecurity] = useAtom(securityState);
  const [typography, setTypography] = useAtom(typographyState);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const updateTypo = (key: string, val: number | string) => {
    setTypography((prev: any) => ({ ...prev, [key]: val }));
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
