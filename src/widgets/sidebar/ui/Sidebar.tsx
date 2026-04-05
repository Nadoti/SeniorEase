import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Eye, LayoutDashboard, ListTodo, SlidersHorizontal, ChevronDown, ChevronUp, Type, Space, Palette, View, Speech, Volume2, Focus, Crosshair, Bell, Clock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cx } from '@/shared/lib';
import styles from './Sidebar.module.css';

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
      { label: 'Tipografia', icon: <Type size={16} />, link: '/dashboard/configuracoes/tipografia', shortcut: '2' },
      { label: 'Aparência', icon: <Palette size={16} />, link: '/dashboard/configuracoes/aparencia', shortcut: '1' },
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

interface SidebarProps {
  showShortcuts?: boolean;
}

export function Sidebar({ showShortcuts = false }: SidebarProps) {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    'Configurações': location.pathname.startsWith('/dashboard/configuracoes')
  });

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside className={styles.container}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <Eye size={24} color='white' />
        </div>
        <span className={styles.logoText}>SeniorEase</span>
      </div>

      <nav className={styles.menu}>
        {menuItems.map((item) => {
          const hasSubItems = !!item.subItems;
          const isOpen = openMenus[item.label];
          const isActive = item.link === '/dashboard'
            ? location.pathname === '/dashboard'
            : location.pathname.startsWith(item.link || '');

          return (
            <div key={item.label} className={styles.menuGroup}>
              {hasSubItems ? (
                <button
                  type="button"
                  onClick={() => toggleMenu(item.label)}
                  className={cx(styles.menuItem, isActive && styles.active)}
                >
                  {isActive && <motion.div layoutId="sidebar-active-indicator" className={styles.activeIndicator} />}
                  <span className={styles.icon}>{item.icon}</span>
                  <span className={`${styles.label} dynamic-text`}>{item.label}</span>
                  {showShortcuts && item.shortcut && <span className={styles.shortcutHint}>{item.shortcut}</span>}
                  <span className={styles.chevron}>
                    {isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                  </span>
                </button>
              ) : (
                <Link
                  to={item.link!}
                  className={cx(styles.menuItem, isActive && styles.active)}
                >
                  {isActive && <motion.div layoutId="sidebar-active-indicator" className={styles.activeIndicator} />}
                  <span className={styles.icon}>{item.icon}</span>
                  <span className={`${styles.label} dynamic-text`}>{item.label}</span>
                  {showShortcuts && item.shortcut && <span className={styles.shortcutHint}>{item.shortcut}</span>}
                </Link>
              )}

              <AnimatePresence initial={false}>
                {hasSubItems && isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className={styles.subMenuContainer}>
                      <div className={styles.verticalLine} />
                      <div className={styles.subMenuItems}>
                        {item.subItems!.map((subItem) => {
                          const isSubActive = location.pathname === subItem.link;
                          return (
                            <Link
                              key={subItem.label}
                              to={subItem.link}
                              className={cx(styles.subMenuItem, isSubActive && styles.subActive)}
                            >
                              {isSubActive && (
                                <motion.span
                                  layoutId="sidebar-sub-active-indicator"
                                  className={styles.subActiveIndicator}
                                />
                              )}
                              <span className={styles.subIcon}>{subItem.icon}</span>
                              <span style={{ flex: 1 }}>{subItem.label}</span>
                              {showShortcuts && subItem.shortcut && <span className={styles.shortcutHint}>{subItem.shortcut}</span>}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
