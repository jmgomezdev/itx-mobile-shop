import { describe, expect, it } from 'vitest';

import {
  productKeys,
  productQueries,
} from '@/application/product/product.queries';

describe('product queries', () => {
  it('builds list query options', () => {
    const options = productQueries.list();

    expect(options.queryKey).toEqual(productKeys.list());
    expect(options.staleTime).toBeGreaterThan(0);
    expect(options.gcTime).toBeGreaterThan(0);
  });

  it('builds detail query options', () => {
    const options = productQueries.detail('123');

    expect(options.queryKey).toEqual(productKeys.detail('123'));
  });
});
