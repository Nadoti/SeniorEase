import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { MainLayout } from '@/widgets/layout';

// Lazy load for pages (chunking strategy)
const HomePage = lazy(() => import('@/pages/home').then(module => ({ default: module.HomePage })));
const AppearancePage = lazy(() => import('@/pages/appearance').then(module => ({ default: module.AppearancePage })));
// const ProductDetailPage = lazy(() => import('@/pages/product-detail').then(module => ({ default: module.ProductDetailPage })));
// const CartPage = lazy(() => import('@/pages/cart').then(module => ({ default: module.CartPage })));
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
        path: '/dashboard/configuracoes/aparencia',
        element: <AppearancePage />,
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
