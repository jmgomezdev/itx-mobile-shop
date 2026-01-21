import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { server } from '@/core/test/msw/server';
import { CartRepository } from '@/infrastructure/cart/cart.repository';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('CartRepository', () => {
  it('posts add-to-cart and maps response', async () => {
    const result = await CartRepository.addToCart({
      productId: '1',
      colorCode: 1,
      storageCode: 2,
    });

    expect(result.count).toBe(2);
  });
});
