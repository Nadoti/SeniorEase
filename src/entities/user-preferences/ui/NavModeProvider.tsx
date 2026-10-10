import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { NavModeContext } from '../model/navModeContext';
import type { NavMode } from '../model/navModeContext';
export function NavModeProvider({ children }: { children: ReactNode }) {
  const [navMode, setNavMode] = useState<NavMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('seniorease_navMode');
      if (saved === 'lateral' || saved === 'flutuante') {
        return saved;
      }
    }
    return 'lateral'; 
  });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('seniorease_navMode', navMode);
    }
  }, [navMode]);
  return (
    <NavModeContext.Provider value={{ navMode, setNavMode }}>
      {children}
    </NavModeContext.Provider>
  );
}
