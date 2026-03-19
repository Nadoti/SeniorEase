import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import {
  Eye,
  LayoutDashboard,
  ListTodo,
  SlidersHorizontal,
  Bell,
  Clock,
  User,
  Type,
  Space,
  Palette,
  Crosshair,
  Activity,
  EyeOff,
  Volume2,
  MousePointerClick
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cx } from '@/shared/lib';

import styles from './FloatingSidebar.module.css';

const subMenuItemsConfig = [
  { label: 'Tipografia', icon: <Type size={16} />, link: '/dashboard/configuracoes/tipografia', shortcut: '1' },
  { label: 'Espaçamento', icon: <Space size={16} />, link: '/dashboard/configuracoes/espacamento', shortcut: '2' },
  { label: 'Aparência', icon: <Palette size={16} />, link: '/dashboard/configuracoes/aparencia', shortcut: '3' },
  { label: 'Feedback Tátil', icon: <MousePointerClick size={16} />, link: '/dashboard/configuracoes/feedback', shortcut: '4' },
  { label: 'Indicadores', icon: <Crosshair size={16} />, link: '/dashboard/configuracoes/indicadores', shortcut: '5' },
  { label: 'Alto Contraste', icon: <Eye size={16} />, link: '/dashboard/configuracoes/contraste', shortcut: '6' },
  { label: 'Movimentação', icon: <Activity size={16} />, link: '/dashboard/configuracoes/movimentacao', shortcut: '7' },
  { label: 'Filtros de Cor', icon: <EyeOff size={16} />, link: '/dashboard/configuracoes/filtros', shortcut: '8' },
  { label: 'Texto para Voz', icon: <Volume2 size={16} />, link: '/dashboard/configuracoes/voz', shortcut: '9' }
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
    label: 'Atividades',
    icon: <Eye size={20} />,
    link: '/dashboard/atividades',
    shortcut: 'G'
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

interface FloatingSidebarProps {
  showShortcuts?: boolean;
}

export function FloatingSidebar({ showShortcuts = false }: FloatingSidebarProps) {
  const location = useLocation();
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

  return (
    <div className={styles.dockContainer}>

      {/* Sub menu de configurações flutuante estilo top-dock */}
      <AnimatePresence>
        {isConfigOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={styles.subDockWrapper}
          >
            <nav className={styles.subDock}>
              {subMenuItemsConfig.map((subItem) => {
                const isSubActive = location.pathname.startsWith(subItem.link);
                return (
                  <Link
                    key={subItem.label}
                    to={subItem.link}
                    className={cx(styles.dockItem, styles.subDockItem, isSubActive && styles.active)}
                  >
                    <div className={styles.iconWrapper}>
                      {subItem.icon}
                      {showShortcuts && <div className={styles.shortcutBadge}>{subItem.shortcut}</div>}
                    </div>
                    <span className={styles.label} title={subItem.label}>
                      {subItem.label}
                    </span>
                    {isSubActive && (
                      <motion.div
                        layoutId="sub-dock-active"
                        className={styles.activeIndicator}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className={styles.dock}>
        <AnimatePresence>
          {menuItems.map((item) => {
            const isActive = item.link === '/dashboard/configuracoes'
              ? isConfigOpen || location.pathname.startsWith(item.link)
              : location.pathname.startsWith(item.link);

            return (
              <Link
                key={item.label}
                to={item.link}
                onClick={(e) => handleItemClick(e, item)}
                className={cx(styles.dockItem, isActive && styles.active)}
              >
                <div className={styles.iconWrapper}>
                  {item.icon}
                  {/* Atalho de Teclado Badge */}
                  {showShortcuts && <div className={styles.shortcutBadge}>{item.shortcut}</div>}
                </div>

                <span className={styles.label} title={item.label}>{item.label}</span>
              </Link>
            );
          })}
        </AnimatePresence>
      </nav>
    </div>
  );
}