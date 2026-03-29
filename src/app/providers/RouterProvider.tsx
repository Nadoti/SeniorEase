import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { MainLayout } from '@/widgets/layout';
import { AuthLayout } from '@/widgets/auth-layout';

// Lazy load for pages (chunking strategy)
const HomePage = lazy(() => import('@/pages/(dashboard)/home').then(module => ({ default: module.HomePage })));
const AppearancePage = lazy(() => import('@/pages/(dashboard)/appearance').then(module => ({ default: module.AppearancePage })));
const TypographyPage = lazy(() => import('@/pages/(dashboard)/typography').then(module => ({ default: module.TypographyPage })));
const ColorFiltersPage = lazy(() => import('@/pages/(dashboard)/color-filters').then(module => ({ default: module.ColorFiltersPage })));
// const CartPage = lazy(() => import('@/pages/cart').then(module => ({ default: module.CartPage })));

const RemindersPage = lazy(() => import('@/pages/(dashboard)/reminders').then(module => ({ default: module.RemindersPage })));
const LoginPage = lazy(() => import('@/pages/login').then(module => ({ default: module.LoginPage })));
const RegisterPage = lazy(() => import('@/pages/register').then(module => ({ default: module.RegisterPage })));
const NotFoundPage = lazy(() => import('@/pages/not-found').then(module => ({ default: module.NotFoundPage })));

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/entrar',
        element: <LoginPage />,
      },
      {
        path: '/cadastro',
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: '/dashboard/painel',
        element: <HomePage />,
      },
      {
        path: '/dashboard/configuracoes/aparencia',
        element: <AppearancePage />,
      },
      {
        path: '/dashboard/configuracoes/tipografia',
        element: <TypographyPage />,
      },
      {
        path: '/dashboard/configuracoes/filtros-de-cor',
        element: <ColorFiltersPage />,
      },
      {
        path: '/dashboard/lembretes',
        element: <RemindersPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

function PageFallback() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <span style={{ color: 'var(--surface-text-muted)' }}>Carregando...</span>
    </div>
  );
}

export function AppRouterProvider() {
  return (
    <Suspense fallback={<PageFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
