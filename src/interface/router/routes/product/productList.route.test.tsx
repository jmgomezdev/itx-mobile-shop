import { describe, expect, it, vi } from 'vitest';

import { productListRoute } from '@/interface/router/routes/product/productList.route';

const productListFallbackMock = vi.hoisted(() => () => null);

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
  ProductListFallback: productListFallbackMock,
}));

const listMock = vi.hoisted(() => vi.fn());

vi.mock('@/application/product/product.queries', () => ({
  productQueries: {
    list: listMock,
  },
}));

describe('productListRoute', () => {
  it('uses ProductListFallback as pending component', () => {
    const pendingProps = {} as Parameters<
      NonNullable<typeof productListRoute.options.pendingComponent>
    >[0];
    const pending = productListRoute.options.pendingComponent?.(pendingProps);

    expect(pending?.type).toBe(productListFallbackMock);
  });

  it('calls ensureQueryData with list query options', async () => {
    const ensureQueryData = vi.fn().mockResolvedValue([]);
    const listOptions = { queryKey: ['products'] };

    listMock.mockReturnValue(listOptions);

    const loader = productListRoute.options.loader as (args: {
      context: {
        queryClient: {
          ensureQueryData: (options: unknown) => Promise<unknown>;
        };
      };
    }) => Promise<unknown>;

    await loader({
      context: { queryClient: { ensureQueryData } },
    });

    expect(listMock).toHaveBeenCalledTimes(1);
    expect(ensureQueryData).toHaveBeenCalledWith(listOptions);
  });
});
