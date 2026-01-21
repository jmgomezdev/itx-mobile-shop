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
import { ProductListPage } from '@/presentation/product/ProductList.page';

describe('ProductListPage', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('renders header, search and product cards', async () => {
    const rootRoute = createRootRoute({
      component: () => <ProductListPage />,
    });

    const productDetailRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/product/$productId',
      component: () => <div />,
    });

    const routeTree = rootRoute.addChildren([productDetailRoute]);
    const router = createRouter({
      routeTree,
      history: createMemoryHistory({ initialEntries: ['/'] }),
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

    expect(await screen.findByText('Listado de productos')).toBeTruthy();
    expect(
      await screen.findByRole('heading', {
        name: 'Encuentra tu próximo móvil',
      })
    ).toBeTruthy();

    expect(await screen.findByLabelText('Buscar productos')).toBeTruthy();
    expect(await screen.findByText('Acme')).toBeTruthy();
    expect(await screen.findByText('X')).toBeTruthy();
  });
});
