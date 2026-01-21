import { createMemoryHistory } from '@tanstack/history';
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useCartStore } from '@/application/cart/store/cart.store';
import { AppLayout } from '@/presentation/shared/layouts/AppLayout';

describe('AppLayout', () => {
  it('renders header and outlet content', async () => {
    useCartStore.setState({ count: 4 });

    const rootRoute = createRootRoute({
      component: () => <AppLayout />,
    });
    const indexRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: () => (
        <div>
          <span>Contenido</span>
          <Outlet />
        </div>
      ),
    });
    const productRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/product/$productId',
      component: () => <div />,
    });
    const routeTree = rootRoute.addChildren([indexRoute, productRoute]);
    const router = createRouter({
      routeTree,
      history: createMemoryHistory({ initialEntries: ['/'] }),
    });

    render(<RouterProvider router={router} />);

    await act(async () => {
      await router.load();
    });

    expect(screen.getByText('ITX Mobile Shop')).toBeTruthy();
    expect(screen.getByText('Carrito')).toBeTruthy();
    expect(screen.getByText('4')).toBeTruthy();
    expect(screen.getByText('Contenido')).toBeTruthy();
  });
});
