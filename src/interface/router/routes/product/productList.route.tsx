import { createRoute } from '@tanstack/react-router';

import { productQueries } from '@/application/product/product.queries';
import { rootRoute } from '@/interface/router/routes/root.route';
import { ProductListPage } from '@/presentation/product/ProductList.page';
import { ProductListFallback } from '@/presentation/product/components/ProductListFallback';

export const productListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(productQueries.list());
  },
  pendingComponent: () => <ProductListFallback />,
  component: ProductListPage,
});
