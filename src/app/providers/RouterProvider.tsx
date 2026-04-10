import { createBrowserRouter, RouterProvider } from 'react-router';
import { NavModeProvider } from '@/shared/model/navModeState';
import { MainLayout } from '@/widgets/layout';

// Standard imports instead of lazy loading to prevent Suspense layout shifts and loading states
import { HomePage } from '@/pages/(dashboard)/home';
import { AppearancePage } from '@/pages/(dashboard)/appearance';
import { TypographyPage } from '@/pages/(dashboard)/typography';
import { ColorFiltersPage } from '@/pages/(dashboard)/color-filters';
import { TextToSpeechPage } from '@/pages/(dashboard)/text-to-speech';
import { FocusIndicatorsPage } from '@/pages/(dashboard)/focus-indicators';
import { TasksPage } from '@/pages/(dashboard)/tasks';
import { RemindersPage } from '@/pages/(dashboard)/reminders';
import { HistoryPage } from '@/pages/(dashboard)/history';
import { ProfilePage } from '@/pages/(dashboard)/profile';
import { NotFoundPage } from '@/pages/not-found';

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

export function AppRouterProvider() {
  return (
    <NavModeProvider>
      <RouterProvider router={router} />
    </NavModeProvider>
  );
}
