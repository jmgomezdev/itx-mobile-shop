import { describe, expect, it } from 'vitest';

import { mapCartCountFromDTO } from '@/infrastructure/cart/cart.mapper';

describe('cart mapper', () => {
  it('maps cart count DTO to domain entity', () => {
    const result = mapCartCountFromDTO({ count: 3 });

    expect(result.count).toBe(3);
  });
});
