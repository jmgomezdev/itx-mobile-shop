import { createRoute } from '@tanstack/react-router';

import { productQueries } from '@/application/product/product.queries';
import { rootRoute } from '@/interface/router/routes/root.route';
import { ProductDetailPage } from '@/presentation/product/ProductDetail.page';

export const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product/$productId',
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(productQueries.detail(params.productId));
  },
  component: ProductDetailPage,
});
