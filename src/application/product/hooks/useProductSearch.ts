import { useDeferredValue, useMemo } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { productQueries } from '@/application/product/product.queries';
import { useProductSearchStore } from '@/application/product/store/productSearch.store';
import type { ProductSummary } from '@/domain/product/Product.types';

const normalize = (value: string) => value.trim().toLowerCase();

const filterProducts = (products: ProductSummary[], query: string) => {
  if (!query) {
    return products;
  }

  const normalizedQuery = normalize(query);

  return products.filter((product) => {
    const brand = normalize(product.brand);
    const model = normalize(product.model);

    return brand.includes(normalizedQuery) || model.includes(normalizedQuery);
  });
};

export const useProductSearch = () => {
  const { data } = useSuspenseQuery(productQueries.list());
  const query = useProductSearchStore((state) => state.query);
  const deferredQuery = useDeferredValue(query);

  const filteredProducts = useMemo(
    () => filterProducts(data, deferredQuery),
    [data, deferredQuery]
  );

  return {
    products: filteredProducts,
  };
};
