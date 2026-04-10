import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
export type NavMode = 'lateral' | 'flutuante';
interface NavModeContextType {
  navMode: NavMode;
  setNavMode: (mode: NavMode) => void;
}
const NavModeContext = createContext<NavModeContextType | undefined>(undefined);
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
export function useNavMode() {
  const context = useContext(NavModeContext);
  if (context === undefined) {
    throw new Error('useNavMode must be used within a NavModeProvider');
  }
  return context;
}
