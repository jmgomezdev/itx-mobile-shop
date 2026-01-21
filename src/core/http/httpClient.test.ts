import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { HttpError, httpClient } from '@/core/http/httpClient';

describe('httpClient', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('performs GET requests with base url', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ ok: true }),
    } as unknown as Response);

    const result = await httpClient.get<{ ok: boolean }>('/products');

    expect(fetchMock).toHaveBeenCalledWith('http://localhost/products', {
      method: 'GET',
    });
    expect(result.ok).toBe(true);
  });

  it('performs POST requests with JSON body', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ created: true }),
    } as unknown as Response);

    const result = await httpClient.post('/cart', {
      productId: '1',
      colorCode: 1,
      storageCode: 2,
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost/cart',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          productId: '1',
          colorCode: 1,
          storageCode: 2,
        }),
      })
    );
    expect(result).toEqual({ created: true });
  });

  it('merges custom headers for POST requests', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ created: true }),
    } as unknown as Response);

    await httpClient.post(
      '/cart',
      {
        productId: '1',
        colorCode: 1,
        storageCode: 2,
      },
      { headers: { 'X-Test': '1' } }
    );

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost/cart',
      expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          'X-Test': '1',
        }),
      })
    );
  });

  it('throws HttpError for non-ok responses', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      json: vi.fn().mockResolvedValue({ error: 'server' }),
    } as unknown as Response);

    try {
      await httpClient.get('/fail');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error).toMatchObject({
        status: 500,
        body: { error: 'server' },
      });
      return;
    }

    throw new Error('Expected HttpError to be thrown');
  });

  it('sets error body to null when response json fails', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      json: vi.fn().mockRejectedValue(new Error('bad json')),
    } as unknown as Response);

    try {
      await httpClient.get('/fail');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error).toMatchObject({
        status: 500,
        body: null,
      });
      return;
    }

    throw new Error('Expected HttpError to be thrown');
  });
});
