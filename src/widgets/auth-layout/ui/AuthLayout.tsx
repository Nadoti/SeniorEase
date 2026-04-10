import { Outlet } from 'react-router';
import styles from './AuthLayout.module.css';
export function AuthLayout() {
  return (
    <div className={styles.layout}>
      <Outlet />
    </div>
  );
}
