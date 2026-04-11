import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAtom } from 'jotai';
import { authState } from '@/shared/model/authState';
import { LayoutDashboard, ListTodo, SlidersHorizontal, Type, Palette, View, Volume2, Crosshair, Bell, Clock, User } from 'lucide-react';

const subMenuItemsConfig = [
  { label: 'Tipografia', icon: <Type size={16} />, link: '/dashboard/configuracoes/tipografia', shortcut: '1' },
  { label: 'Aparência', icon: <Palette size={16} />, link: '/dashboard/configuracoes/aparencia', shortcut: '2' },
  { label: 'Indicadores de Foco', icon: <Crosshair size={16} />, link: '/dashboard/configuracoes/indicadores-de-foco', shortcut: '3' },
  { label: 'Filtros de Cor', icon: <View size={16} />, link: '/dashboard/configuracoes/filtros-de-cor', shortcut: '4' },
  { label: 'Texto para Fala', icon: <Volume2 size={16} />, link: '/dashboard/configuracoes/texto-para-fala', shortcut: '5' }
];

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
    hasSubMenu: true
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

export function useFloatingSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [, setIsAuthenticated] = useAtom(authState);

  const [isConfigOpen, setIsConfigOpen] = useState(
    location.pathname.startsWith('/dashboard/configuracoes')
  );

  const handleItemClick = (e: React.MouseEvent, item: typeof menuItems[0]) => {
    if (item.hasSubMenu) {
      e.preventDefault();
      setIsConfigOpen(!isConfigOpen);
    } else {
      setIsConfigOpen(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  };

  return {
    menuItems,
    subMenuItemsConfig,
    location,
    isConfigOpen,
    handleItemClick,
    handleLogout
  };
}
