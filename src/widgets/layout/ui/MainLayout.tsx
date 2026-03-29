import { Outlet } from 'react-router';
import { Sidebar } from '@/widgets/sidebar';
import styles from './MainLayout.module.css';
import { FloatingSidebar } from '@/widgets/floating-sidebar';

export function MainLayout() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

