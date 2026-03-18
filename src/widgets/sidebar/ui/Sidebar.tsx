import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Eye, LayoutDashboard, ListTodo, SlidersHorizontal, ChevronDown, ChevronUp, Type, Space, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cx } from '@/shared/lib';
import styles from './Sidebar.module.css';

const menuItems = [
  {
    label: 'Painel Principal',
    icon: <LayoutDashboard size={20} />,
    link: '/dashboard/painel'
  },
  {
    label: 'Configurações',
    icon: <SlidersHorizontal size={20} />,
    link: '/dashboard/configuracoes',
    subItems: [
      { label: 'Tipografia', icon: <Type size={16} />, link: '/dashboard/configuracoes/tipografia' },
      { label: 'Espaçamento', icon: <Space size={16} />, link: '/dashboard/configuracoes/espacamento' },
      { label: 'Aparência', icon: <Palette size={16} />, link: '/dashboard/configuracoes/aparencia' }
    ]
  },
  {
    label: 'Minhas Tarefas',
    icon: <ListTodo size={20} />,
    link: '/dashboard/tasks'
  }
];

export function Sidebar() {
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
        <span style={{ color: 'white', fontWeight: 600, fontSize: '1.25rem' }}>SeniorEase</span>
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
                  <span className={styles.label}>{item.label}</span>
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
                  <span className={styles.label}>{item.label}</span>
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
                              <span>{subItem.label}</span>
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
