import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { server } from '@/core/test/msw/server';
import { ProductRepository } from '@/infrastructure/product/product.repository';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('ProductRepository', () => {
  it('fetches and maps product list', async () => {
    const result = await ProductRepository.getList();

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      id: '1',
      brand: 'Acme',
      model: 'X',
      price: 199,
    });
  });

  it('fetches and maps product detail', async () => {
    const result = await ProductRepository.getDetail('1');

    expect(result).toMatchObject({
      id: '1',
      brand: 'Acme',
      model: 'X',
      price: 299,
      cpu: 'CPU',
      options: {
        colors: [{ code: 1, name: 'Black' }],
        storages: [{ code: 2, name: '128GB' }],
      },
    });
  });
});
