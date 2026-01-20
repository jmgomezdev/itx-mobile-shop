import { createRouter } from '@tanstack/react-router';

import { queryClient } from '@/core/query/queryClient';
import { productDetailRoute } from '@/interface/router/routes/product/productDetail.route';
import { productListRoute } from '@/interface/router/routes/product/productList.route';
import { rootRoute } from '@/interface/router/routes/root.route';

const routeTree = rootRoute.addChildren([productListRoute, productDetailRoute]);

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
