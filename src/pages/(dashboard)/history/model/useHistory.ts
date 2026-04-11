import { useState } from 'react';
import { toast } from 'sonner';
import { useAtom } from 'jotai';
import { securityState } from '@/shared/model/securityState';
interface HistoryLog {
  id: string;
  type: 'created' | 'completed';
  taskName: string;
  date: string;
}
const MOCK_HISTORY: HistoryLog[] = [
  { id: '1', type: 'completed', taskName: 'Tomar remédio da pressão', date: 'Hoje às 19:34' },
  { id: '2', type: 'created', taskName: 'Ligar para os netos', date: 'Hoje às 14:15' },
  { id: '3', type: 'completed', taskName: 'Caminhada leve', date: 'Ontem às 08:30' },
  { id: '4', type: 'created', taskName: 'Tomar remédio da pressão', date: 'Ontem às 07:00' },
];
export function useHistory() {
  const [extraSecurity] = useAtom(securityState);
  const [logs, setLogs] = useState<HistoryLog[]>(MOCK_HISTORY);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const handleClear = () => { 
    if (extraSecurity) setIsClearModalOpen(true);
    else confirmClear();
  };
  const confirmClear = () => {
    setLogs([]);
    toast.success('Histórico limpo com sucesso');
    setIsClearModalOpen(false);
  };
  return {
    logs,
    isClearModalOpen,
    setIsClearModalOpen,
    handleClear,
    confirmClear,
  };
}
export type { HistoryLog };
