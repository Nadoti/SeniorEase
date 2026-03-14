import { Outlet } from 'react-router';
import { Sidebar } from '@/widgets/sidebar';

export function MainLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Menu Lateral */}
      <Sidebar />

      {/* Área Principal de Conteúdo */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ padding: 'var(--spacing-4)', borderBottom: '1px solid var(--surface-border)' }}>
          <nav>
            <span style={{ fontWeight: 'bold' }}>SeniorEase Dashboard</span>
          </nav>
        </header>

        <main style={{ flex: 1, padding: 'var(--spacing-6)', overflowY: 'auto' }}>
          <Outlet />
        </main>

        <footer style={{ padding: 'var(--spacing-4)', textAlign: 'center', borderTop: '1px solid var(--surface-border)' }}>
          <p style={{ color: 'var(--surface-text-muted)', fontSize: '0.875rem' }}>
            &copy; {new Date().getFullYear()} SeniorEase
          </p>
        </footer>
      </div>
    </div>
  );
}

