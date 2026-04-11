import { Link } from 'react-router';
import { ChevronDown, ChevronUp, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cx } from '@/shared/lib';
import { useSidebar } from '../model/useSidebar';
import styles from './Sidebar.module.css';

interface SidebarProps {
  showShortcuts?: boolean;
}

export function Sidebar({ showShortcuts = false }: SidebarProps) {
  const { location, openMenus, toggleMenu, handleLogout, menuItems } = useSidebar();

  return (
    <aside className={styles.container}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}></div>
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

      <div className={styles.bottomSection}>
        <button className={styles.logoutButton} onClick={handleLogout} title="Sair">
          <span className={styles.icon}><LogOut size={20} /></span>
          <span className={`${styles.label} dynamic-text`}>Sair</span>
          {showShortcuts && <span className={styles.shortcutHint}>ESC</span>}
        </button>
      </div>
    </aside>
  );
}
