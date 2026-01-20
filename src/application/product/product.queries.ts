import { queryOptions } from '@tanstack/react-query';

import { ProductRepository } from '@/infrastructure/product/product.repository';

const CACHE_TTL_MS = 1000 * 60 * 60;

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: () => [...productKeys.lists()] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

export const productQueries = {
  list: () =>
    queryOptions({
      queryKey: productKeys.list(),
      queryFn: () => ProductRepository.getList(),
      staleTime: CACHE_TTL_MS,
      gcTime: CACHE_TTL_MS,
    }),
  detail: (id: string) =>
    queryOptions({
      queryKey: productKeys.detail(id),
      queryFn: () => ProductRepository.getDetail(id),
      staleTime: CACHE_TTL_MS,
      gcTime: CACHE_TTL_MS,
    }),
};
