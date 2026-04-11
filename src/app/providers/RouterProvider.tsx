import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import { useAtom } from 'jotai';
import { authState } from '@/shared/model/authState';
import { NavModeProvider } from '@/shared/model/navModeState';
import { MainLayout } from '@/widgets/layout';
import { Toaster } from 'sonner';
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
import { LoginPage } from '@/pages/login/ui/LoginPage';
import { RegisterPage } from '@/pages/register/ui/RegisterPage';

function RootRedirect() {
  const [isAuthenticated] = useAtom(authState);
  if (isAuthenticated) return <Navigate to="/dashboard/painel" replace />;
  return <Navigate to="/login" replace />;
}

function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated] = useAtom(authState);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated] = useAtom(authState);
  if (isAuthenticated) return <Navigate to="/dashboard/painel" replace />;
  return <>{children}</>;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRedirect />,
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: '/cadastro',
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
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
      <div style={{ position: 'absolute', zIndex: 9999 }}>
        <Toaster
          position="top-right"
          richColors
          expand={true}

        />
      </div>

      <RouterProvider router={router} />
    </NavModeProvider>
  );
}
