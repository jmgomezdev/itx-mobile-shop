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

import { NotFoundPage } from '@/presentation/shared/components/NotFoundPage';

describe('NotFoundPage', () => {
  it('renders not found message and link', async () => {
    const rootRoute = createRootRoute({
      component: () => <Outlet />,
    });
    const indexRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: () => <NotFoundPage />,
    });
    const routeTree = rootRoute.addChildren([indexRoute]);
    const router = createRouter({
      routeTree,
      history: createMemoryHistory({ initialEntries: ['/'] }),
    });

    render(<RouterProvider router={router} />);

    await act(async () => {
      await router.load();
    });

    expect(screen.getByText('Página no encontrada')).toBeTruthy();

    const link = screen.getByRole('link', { name: 'Ir al inicio' });
    expect(link.getAttribute('href')).toBe('/');
  });
});
