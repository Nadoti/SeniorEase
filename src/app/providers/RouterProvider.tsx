import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { MainLayout } from '@/widgets/layout';

// Lazy load for pages (chunking strategy)
const HomePage = lazy(() => import('@/pages/home').then(module => ({ default: module.HomePage })));
const ProductsPage = lazy(() => import('@/pages/products').then(module => ({ default: module.ProductsPage })));
const ProductDetailPage = lazy(() => import('@/pages/product-detail').then(module => ({ default: module.ProductDetailPage })));
const CartPage = lazy(() => import('@/pages/cart').then(module => ({ default: module.CartPage })));
const NotFoundPage = lazy(() => import('@/pages/not-found').then(module => ({ default: module.NotFoundPage })));

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/products',
        element: <ProductsPage />,
      },
      {
        path: '/products/:id',
        element: <ProductDetailPage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
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
