import { useAtom } from 'jotai';
import { typographyState } from '@/shared/model/typographyState';
import { useState } from 'react';
import { toast } from 'sonner';

const DEFAULT_TYPOGRAPHY = {
  fontFamily: 'Inter, sans-serif',
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 1.5,
  letterSpacing: 0,
};

export function useTypography() {
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

  return {
    typography,
    updateTypo,
    isResetModalOpen,
    setIsResetModalOpen,
    confirmResetDefaults,
  };
}
