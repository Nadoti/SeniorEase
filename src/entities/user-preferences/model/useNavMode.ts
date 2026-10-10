import { useContext } from 'react';
import { NavModeContext } from './navModeContext';
export function useNavMode() {
  const context = useContext(NavModeContext);
  if (context === undefined) {
    throw new Error('useNavMode must be used within a NavModeProvider');
  }
  return context;
}
