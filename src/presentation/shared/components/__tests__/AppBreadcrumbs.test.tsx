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

import { AppBreadcrumbs } from '@/presentation/shared/components/AppBreadcrumbs';

describe('AppBreadcrumbs', () => {
  it('renders base breadcrumbs on home', async () => {
    const rootRoute = createRootRoute({
      component: () => <Outlet />,
    });
    const indexRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: () => <AppBreadcrumbs />,
    });
    const productRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/product/$productId',
      component: () => <AppBreadcrumbs />,
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
    expect(screen.getByText('Productos')).toBeTruthy();
  });

  it('renders detail breadcrumb on product page', async () => {
    const rootRoute = createRootRoute({
      component: () => <Outlet />,
    });
    const indexRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: () => <AppBreadcrumbs />,
    });
    const productRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/product/$productId',
      component: () => <AppBreadcrumbs />,
    });
    const routeTree = rootRoute.addChildren([indexRoute, productRoute]);
    const router = createRouter({
      routeTree,
      history: createMemoryHistory({ initialEntries: ['/product/1'] }),
    });

    render(<RouterProvider router={router} />);

    await act(async () => {
      await router.load();
    });

    expect(screen.getByText('Detalle')).toBeTruthy();
  });
});
