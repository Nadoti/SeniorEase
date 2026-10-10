import { createContext } from 'react';
export type NavMode = 'lateral' | 'flutuante';
export interface NavModeContextType {
  navMode: NavMode;
  setNavMode: (mode: NavMode) => void;
}
export const NavModeContext = createContext<NavModeContextType | undefined>(undefined);
