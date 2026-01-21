import { describe, expect, it, vi } from 'vitest';

import { queryClient } from '@/core/query/queryClient';
import { router } from '@/interface/router';

vi.mock('@/presentation/shared/layouts/AppLayout', () => ({
  AppLayout: () => null,
}));
vi.mock('@/presentation/shared/components/NotFoundPage', () => ({
  NotFoundPage: () => null,
}));
vi.mock('@/presentation/shared/components/RouterErrorBoundary', () => ({
  RouterErrorBoundary: () => null,
}));
vi.mock('@/presentation/product/ProductList.page', () => ({
  ProductListPage: () => null,
}));
vi.mock('@/presentation/product/components/ProductListFallback', () => ({
  ProductListFallback: () => null,
}));
vi.mock('@/presentation/product/ProductDetail.page', () => ({
  ProductDetailPage: () => null,
}));
vi.mock('@/presentation/product/components/ProductDetailFallback', () => ({
  ProductDetailFallback: () => null,
}));

describe('router', () => {
  it('uses the shared query client in context', () => {
    expect(router.options.context.queryClient).toBe(queryClient);
  });

  it('registers the route tree', () => {
    expect(router.routeTree).toBeDefined();
  });
});
