import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext } from '@tanstack/react-router';

import { NotFoundPage } from '@/presentation/shared/error/NotFoundPage';
import { RouterErrorBoundary } from '@/presentation/shared/error/RouterErrorBoundary';
import { AppLayout } from '@/presentation/shared/layouts/AppLayout';

export interface RouterContext {
  queryClient: QueryClient;
}

export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: () => <AppLayout />,
  errorComponent: ({ error }) => <RouterErrorBoundary error={error} />,
  notFoundComponent: () => <NotFoundPage />,
});
