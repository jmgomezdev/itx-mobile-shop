import type { ErrorRouteComponent } from '@tanstack/react-router';
import { describe, expect, it, vi } from 'vitest';

import { rootRoute } from '@/interface/router/routes/root.route';

const appLayoutMock = vi.hoisted(() => () => null);
const notFoundPageMock = vi.hoisted(() => () => null);
const routerErrorBoundaryMock = vi.hoisted(() => () => null);

vi.mock('@/presentation/shared/layouts/AppLayout', () => ({
  AppLayout: appLayoutMock,
}));
vi.mock('@/presentation/shared/components/NotFoundPage', () => ({
  NotFoundPage: notFoundPageMock,
}));
vi.mock('@/presentation/shared/components/RouterErrorBoundary', () => ({
  RouterErrorBoundary: routerErrorBoundaryMock,
}));

describe('rootRoute', () => {
  it('renders AppLayout as component', () => {
    const componentProps = {} as Parameters<
      NonNullable<typeof rootRoute.options.component>
    >[0];
    const element = rootRoute.options.component?.(componentProps);

    expect(element?.type).toBe(appLayoutMock);
  });

  it('renders RouterErrorBoundary in errorComponent', () => {
    const errorProps = {
      error: new Error('boom'),
      reset: () => undefined,
    };
    const errorComponent = rootRoute.options.errorComponent;
    const element =
      typeof errorComponent === 'function'
        ? (errorComponent as ErrorRouteComponent)(errorProps)
        : undefined;

    expect(element?.type).toBe(routerErrorBoundaryMock);
  });

  it('renders NotFoundPage as notFoundComponent', () => {
    const notFoundProps = {} as Parameters<
      NonNullable<typeof rootRoute.options.notFoundComponent>
    >[0];
    const element = rootRoute.options.notFoundComponent?.(notFoundProps);

    expect(element?.type).toBe(notFoundPageMock);
  });
});
