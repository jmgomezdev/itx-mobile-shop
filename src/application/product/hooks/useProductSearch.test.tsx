import { useSuspenseQuery } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useProductSearch } from '@/application/product/hooks/useProductSearch';

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-query')>();

  return {
    ...actual,
    useSuspenseQuery: vi.fn(),
  };
});

vi.mock('@/application/product/store/productSearch.store', () => ({
  useProductSearchStore: (selector: (state: { query: string }) => unknown) =>
    selector({ query: 'acme' }),
}));

describe('useProductSearch', () => {
  it('filters products by brand or model', () => {
    const useSuspenseQueryMock = vi.mocked(useSuspenseQuery);

    useSuspenseQueryMock.mockReturnValue({
      data: [
        { brand: 'Acme', model: 'X' },
        { brand: 'Other', model: 'Z' },
      ],
    } as ReturnType<typeof useSuspenseQuery>);

    const { result } = renderHook(() => useProductSearch());

    expect(result.current.products).toEqual([{ brand: 'Acme', model: 'X' }]);
  });
});
