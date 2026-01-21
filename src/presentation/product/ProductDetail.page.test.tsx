import { Suspense } from 'react';

import { createMemoryHistory } from '@tanstack/history';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { render, screen } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { server } from '@/core/test/msw/server';
import { ProductDetailPage } from '@/presentation/product/ProductDetail.page';

describe('ProductDetailPage', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('renders product detail content', async () => {
    const rootRoute = createRootRoute({
      component: () => <ProductDetailPage />,
    });

    const productDetailRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/product/$productId',
      component: () => <ProductDetailPage />,
    });

    const routeTree = rootRoute.addChildren([productDetailRoute]);
    const router = createRouter({
      routeTree,
      history: createMemoryHistory({ initialEntries: ['/product/1'] }),
    });

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Cargando...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    );

    expect(await screen.findByText('← Volver al listado')).toBeTruthy();
    expect(await screen.findByText('Acme X')).toBeTruthy();
    const cpuNodes = await screen.findAllByText('CPU');
    expect(cpuNodes.length).toBeGreaterThan(0);
    expect(await screen.findByText('Añadir al carrito')).toBeTruthy();
  });
});
