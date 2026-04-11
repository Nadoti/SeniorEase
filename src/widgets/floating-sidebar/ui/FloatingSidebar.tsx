import { Link } from 'react-router';
import { LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cx } from '@/shared/lib';
import { useFloatingSidebar } from '../model/useFloatingSidebar';
import styles from './FloatingSidebar.module.css';

interface FloatingSidebarProps {
  showShortcuts?: boolean;
}

export function FloatingSidebar({ showShortcuts = false }: FloatingSidebarProps) {
  const {
    menuItems,
    subMenuItemsConfig,
    location,
    isConfigOpen,
    handleItemClick,
    handleLogout
  } = useFloatingSidebar();

  return (
    <div className={styles.dockContainer}>
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
                  {showShortcuts && <div className={styles.shortcutBadge}>{item.shortcut}</div>}
                </div>
                <span className={styles.label} title={item.label}>{item.label}</span>
              </Link>
            );
          })}
        </AnimatePresence>
        <button
          className={cx(styles.dockItem, styles.logoutDockItem)}
          onClick={handleLogout}
        >
          <div className={cx(styles.iconWrapper, styles.logoutIconWrapper)}>
            <LogOut size={20} />
            {showShortcuts && <div className={styles.shortcutBadge}>ESC</div>}
          </div>
          <span className={styles.label} title="Sair">Sair</span>
        </button>
      </nav>
    </div>
  );
}