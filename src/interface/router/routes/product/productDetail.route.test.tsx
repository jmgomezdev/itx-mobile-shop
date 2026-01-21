import { describe, expect, it, vi } from 'vitest';

import { productDetailRoute } from '@/interface/router/routes/product/productDetail.route';

const productDetailFallbackMock = vi.hoisted(() => () => null);

vi.mock('@/presentation/shared/layouts/AppLayout', () => ({
  AppLayout: () => null,
}));
vi.mock('@/presentation/shared/components/NotFoundPage', () => ({
  NotFoundPage: () => null,
}));
vi.mock('@/presentation/shared/components/RouterErrorBoundary', () => ({
  RouterErrorBoundary: () => null,
}));
vi.mock('@/presentation/product/ProductDetail.page', () => ({
  ProductDetailPage: () => null,
}));
vi.mock('@/presentation/product/components/ProductDetailFallback', () => ({
  ProductDetailFallback: productDetailFallbackMock,
}));

const detailMock = vi.hoisted(() => vi.fn());

vi.mock('@/application/product/product.queries', () => ({
  productQueries: {
    detail: detailMock,
  },
}));

describe('productDetailRoute', () => {
  it('uses ProductDetailFallback as pending component', () => {
    const pendingProps = {} as Parameters<
      NonNullable<typeof productDetailRoute.options.pendingComponent>
    >[0];
    const pending = productDetailRoute.options.pendingComponent?.(pendingProps);

    expect(pending?.type).toBe(productDetailFallbackMock);
  });

  it('calls ensureQueryData with detail query options', async () => {
    const ensureQueryData = vi.fn().mockResolvedValue({});
    const detailOptions = { queryKey: ['products', 'detail', 'abc'] };

    detailMock.mockReturnValue(detailOptions);

    const loader = productDetailRoute.options.loader as (args: {
      context: {
        queryClient: {
          ensureQueryData: (options: unknown) => Promise<unknown>;
        };
      };
      params: { productId: string };
    }) => Promise<unknown>;

    await loader({
      context: { queryClient: { ensureQueryData } },
      params: { productId: 'abc' },
    });

    expect(detailMock).toHaveBeenCalledWith('abc');
    expect(ensureQueryData).toHaveBeenCalledWith(detailOptions);
  });
});
