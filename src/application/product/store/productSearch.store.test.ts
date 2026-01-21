import { describe, expect, it } from 'vitest';

import { useProductSearchStore } from '@/application/product/store/productSearch.store';

describe('product search store', () => {
  it('updates query', () => {
    useProductSearchStore.getState().setQuery('iphone');

    expect(useProductSearchStore.getState().query).toBe('iphone');
  });
});
