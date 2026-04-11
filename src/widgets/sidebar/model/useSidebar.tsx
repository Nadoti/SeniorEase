import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAtom } from 'jotai';
import { authState } from '@/shared/model/authState';
import { LayoutDashboard, ListTodo, SlidersHorizontal, Type, Palette, View, Volume2, Crosshair, Bell, Clock, User } from 'lucide-react';

const menuItems = [
  {
    label: 'Painel Principal',
    icon: <LayoutDashboard size={20} />,
    link: '/dashboard/painel',
    shortcut: 'P'
  },
  {
    label: 'Configurações',
    icon: <SlidersHorizontal size={20} />,
    link: '/dashboard/configuracoes',
    shortcut: 'C',
    subItems: [
      { label: 'Tipografia', icon: <Type size={16} />, link: '/dashboard/configuracoes/tipografia', shortcut: '1' },
      { label: 'Aparência', icon: <Palette size={16} />, link: '/dashboard/configuracoes/aparencia', shortcut: '2' },
      { label: 'Indicadores de Foco', icon: <Crosshair size={16} />, link: '/dashboard/configuracoes/indicadores-de-foco', shortcut: '3' },
      { label: 'Filtros de Cor', icon: <View size={16} />, link: '/dashboard/configuracoes/filtros-de-cor', shortcut: '4' },
      { label: 'Texto para Fala', icon: <Volume2 size={16} />, link: '/dashboard/configuracoes/texto-para-fala', shortcut: '5' },
    ]
  },
  {
    label: 'Minhas Tarefas',
    icon: <ListTodo size={20} />,
    link: '/dashboard/tasks',
    shortcut: 'T'
  },
  {
    label: 'Lembretes',
    icon: <Bell size={20} />,
    link: '/dashboard/lembretes',
    shortcut: 'L'
  },
  {
    label: 'Histórico',
    icon: <Clock size={20} />,
    link: '/dashboard/historico',
    shortcut: 'H'
  },
  {
    label: 'Meu Perfil',
    icon: <User size={20} />,
    link: '/dashboard/perfil',
    shortcut: 'U'
  }
];

export function useSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [, setIsAuthenticated] = useAtom(authState);

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    'Configurações': location.pathname.startsWith('/dashboard/configuracoes')
  });

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  };

  return {
    menuItems,
    location,
    openMenus,
    toggleMenu,
    handleLogout
  };
}
