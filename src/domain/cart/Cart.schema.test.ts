import { describe, expect, it } from 'vitest';

import { cartCountSchema } from '@/domain/cart/Cart.schema';

describe('cart schema', () => {
  it('parses valid cart count', () => {
    const result = cartCountSchema.parse({ count: 0 });

    expect(result.count).toBe(0);
  });

  it('rejects negative counts', () => {
    expect(() => cartCountSchema.parse({ count: -1 })).toThrow();
  });
});
