import { describe, expect, it } from 'vitest';

import {
  productDetailSchema,
  productSummarySchema,
} from '@/domain/product/Product.schema';

describe('product schemas', () => {
  it('coerces price to number in product summary', () => {
    const result = productSummarySchema.parse({
      id: '1',
      brand: 'Acme',
      model: 'X',
      price: '999',
      imgUrl: 'https://example.com/img.png',
    });

    expect(result.price).toBe(999);
  });

  it('rejects invalid imgUrl', () => {
    expect(() =>
      productSummarySchema.parse({
        id: '1',
        brand: 'Acme',
        model: 'X',
        price: '10',
        imgUrl: 'not-a-url',
      })
    ).toThrow();
  });

  it('parses product detail with camera arrays', () => {
    const result = productDetailSchema.parse({
      id: '1',
      brand: 'Acme',
      model: 'X',
      price: 199,
      imgUrl: 'https://example.com/img.png',
      cpu: 'CPU',
      ram: '8GB',
      os: 'OS',
      displayResolution: '1080p',
      battery: '4000mAh',
      primaryCamera: ['12MP'],
      secondaryCamera: ['8MP'],
      dimensions: '1x1',
      weight: '100g',
      options: {
        colors: [{ code: 1, name: 'Black' }],
        storages: [{ code: 2, name: '128GB' }],
      },
    });

    expect(result.primaryCamera).toEqual(['12MP']);
    expect(result.secondaryCamera).toEqual(['8MP']);
  });
});
