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

import type { ProductSummary } from '@/domain/product/Product.types';
import { ProductCard } from '@/presentation/product/components/ProductCard';

describe('ProductCard', () => {
  it('renders product info and link', async () => {
    const product: ProductSummary = {
      id: '1',
      brand: 'Acme',
      model: 'X',
      price: 199,
      imgUrl: 'https://example.com/img.png',
    };

    const rootRoute = createRootRoute({
      component: () => <Outlet />,
    });
    const indexRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: () => <ProductCard product={product} />,
    });
    const productRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/product/$productId',
      component: () => <div />,
    });
    const routeTree = rootRoute.addChildren([indexRoute, productRoute]);
    const router = createRouter({
      routeTree,
      history: createMemoryHistory({ initialEntries: ['/'] }),
    });

    render(<RouterProvider router={router} />);

    await act(async () => {
      await router.load();
    });

    expect(screen.getByText('Acme')).toBeTruthy();
    expect(screen.getByText('X')).toBeTruthy();

    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('/product/1');
  });
});
