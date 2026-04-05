import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { NavModeProvider } from '@/shared/model/navModeState';

import { MainLayout } from '@/widgets/layout';

// Lazy load for pages (chunking strategy)
const HomePage = lazy(() => import('@/pages/(dashboard)/home').then(module => ({ default: module.HomePage })));
const AppearancePage = lazy(() => import('@/pages/(dashboard)/appearance').then(module => ({ default: module.AppearancePage })));
const TypographyPage = lazy(() => import('@/pages/(dashboard)/typography').then(module => ({ default: module.TypographyPage })));
const ColorFiltersPage = lazy(() => import('@/pages/(dashboard)/color-filters').then(module => ({ default: module.ColorFiltersPage })));
const TextToSpeechPage = lazy(() => import('@/pages/(dashboard)/text-to-speech').then(module => ({ default: module.TextToSpeechPage })));
const FocusIndicatorsPage = lazy(() => import('@/pages/(dashboard)/focus-indicators').then(module => ({ default: module.FocusIndicatorsPage })));
const TasksPage = lazy(() => import('@/pages/(dashboard)/tasks').then(module => ({ default: module.TasksPage })));
const RemindersPage = lazy(() => import('@/pages/(dashboard)/reminders').then(module => ({ default: module.RemindersPage })));
const HistoryPage = lazy(() => import('@/pages/(dashboard)/history').then(module => ({ default: module.HistoryPage })));
const ProfilePage = lazy(() => import('@/pages/(dashboard)/profile').then(module => ({ default: module.ProfilePage })));
const NotFoundPage = lazy(() => import('@/pages/not-found').then(module => ({ default: module.NotFoundPage })));

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/dashboard/painel',
        element: <HomePage />,
      },
      {
        path: '/dashboard/tasks',
        element: <TasksPage />,
      },
      {
        path: '/dashboard/lembretes',
        element: <RemindersPage />,
      },
      {
        path: '/dashboard/historico',
        element: <HistoryPage />,
      },
      {
        path: '/dashboard/perfil',
        element: <ProfilePage />,
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
        path: '/dashboard/configuracoes/indicadores-de-foco',
        element: <FocusIndicatorsPage />,
      },
      {
        path: '/dashboard/configuracoes/filtros-de-cor',
        element: <ColorFiltersPage />,
      },
      {
        path: '/dashboard/configuracoes/texto-para-fala',
        element: <TextToSpeechPage />,
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
    <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-8)' }}>
      <span style={{ color: 'var(--surface-text-muted)' }}>Carregando...</span>
    </div>
  );
}

export function AppRouterProvider() {
  return (
    <Suspense fallback={<PageFallback />}>
      <NavModeProvider>
        <RouterProvider router={router} />
      </NavModeProvider>
    </Suspense>
  );
}
