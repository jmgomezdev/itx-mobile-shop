import { createMemoryHistory } from '@tanstack/history';
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { RouterErrorBoundary } from '@/presentation/shared/components/RouterErrorBoundary';

describe('RouterErrorBoundary', () => {
  it('renders error message and actions', async () => {
    const user = userEvent.setup();
    const reloadSpy = vi.fn();

    Object.defineProperty(window, 'location', {
      value: { ...window.location, reload: reloadSpy },
      writable: true,
    });

    const rootRoute = createRootRoute({
      component: () => <Outlet />,
    });
    const indexRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: () => <RouterErrorBoundary error={new Error('boom')} />,
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

    expect(screen.getByText('Ha ocurrido un error')).toBeTruthy();
    expect(screen.getByText('boom')).toBeTruthy();

    const reloadButton = screen.getByRole('button', { name: 'Recargar' });
    await user.click(reloadButton);

    expect(reloadSpy).toHaveBeenCalledTimes(1);

    const link = screen.getByRole('link', { name: 'Volver al inicio' });
    expect(link.getAttribute('href')).toBe('/');
  });

  it('renders fallback message for non-Error values', async () => {
    const rootRoute = createRootRoute({
      component: () => <Outlet />,
    });
    const indexRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: () => <RouterErrorBoundary error={'boom'} />,
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

    expect(screen.getByText('Error inesperado')).toBeTruthy();
  });
});
