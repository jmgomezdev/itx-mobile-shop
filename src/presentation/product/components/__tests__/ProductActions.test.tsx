import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HttpResponse, delay, http } from 'msw';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { useCartStore } from '@/application/cart/store/cart.store';
import { server } from '@/core/test/msw/server';
import type { ProductDetail } from '@/domain/product/Product.types';
import type { AddToCartRequestDTO } from '@/infrastructure/cart/cart.dto';
import { ProductActions } from '@/presentation/product/components/ProductActions';

describe('ProductActions', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    useCartStore.setState({ count: 0 });
  });

  afterAll(() => {
    server.close();
  });

  it('adds product to cart with default options', async () => {
    const user = userEvent.setup();
    const product: ProductDetail = {
      id: '1',
      brand: 'Acme',
      model: 'X',
      price: 299,
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
    };

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <ProductActions product={product} />
      </QueryClientProvider>
    );

    const button = screen.getByRole('button', { name: 'Añadir al carrito' });
    await user.click(button);

    await waitFor(() => {
      expect(useCartStore.getState().count).toBe(2);
    });
  });

  it('updates selected options via selects and sends them', async () => {
    const user = userEvent.setup();
    let lastBody: AddToCartRequestDTO | null = null;

    server.use(
      http.post('http://localhost/api/cart', async ({ request }) => {
        lastBody = (await request.json()) as AddToCartRequestDTO;
        return HttpResponse.json({ count: 2 });
      })
    );

    const product: ProductDetail = {
      id: '1',
      brand: 'Acme',
      model: 'X',
      price: 299,
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
        colors: [
          { code: 1, name: 'Black' },
          { code: 3, name: 'Red' },
        ],
        storages: [
          { code: 2, name: '128GB' },
          { code: 4, name: '256GB' },
        ],
      },
    };

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <ProductActions product={product} />
      </QueryClientProvider>
    );

    await user.selectOptions(screen.getByLabelText('Almacenamiento'), '4');
    await user.selectOptions(screen.getByLabelText('Color'), '3');

    await user.click(screen.getByRole('button', { name: 'Añadir al carrito' }));

    await waitFor(() => {
      expect(useCartStore.getState().count).toBe(2);
    });

    expect(lastBody).toEqual({
      id: '1',
      colorCode: 3,
      storageCode: 4,
    });
  });

  it('disables add-to-cart when there are no options', async () => {
    const user = userEvent.setup();
    let callCount = 0;

    server.use(
      http.post('http://localhost/api/cart', () => {
        callCount += 1;
        return HttpResponse.json({ count: 2 });
      })
    );

    const product: ProductDetail = {
      id: '1',
      brand: 'Acme',
      model: 'X',
      price: 299,
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
        colors: [],
        storages: [],
      },
    };

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <ProductActions product={product} />
      </QueryClientProvider>
    );

    const button = screen.getByRole('button', { name: 'Añadir al carrito' });
    expect(button.getAttribute('disabled')).not.toBeNull();

    await user.click(button);

    await waitFor(() => {
      expect(useCartStore.getState().count).toBe(0);
    });
    expect(callCount).toBe(0);
  });

  it('does not add to cart when selectedColor is null', async () => {
    const user = userEvent.setup();
    let callCount = 0;

    server.use(
      http.post('http://localhost/api/cart', () => {
        callCount += 1;
        return HttpResponse.json({ count: 2 });
      })
    );

    const product: ProductDetail = {
      id: '1',
      brand: 'Acme',
      model: 'X',
      price: 299,
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
        colors: [],
        storages: [{ code: 2, name: '128GB' }],
      },
    };

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <ProductActions product={product} />
      </QueryClientProvider>
    );

    const button = screen.getByRole('button', { name: 'Añadir al carrito' });
    expect(button.getAttribute('disabled')).not.toBeNull();

    await user.click(button);
    expect(callCount).toBe(0);

    // Ejecuta el onClick para cubrir la guard clause aunque el botón esté disabled
    button.removeAttribute('disabled');
    fireEvent.click(button);
    expect(callCount).toBe(0);
  });

  it('does not add to cart when selectedStorage is null', async () => {
    const user = userEvent.setup();
    let callCount = 0;

    server.use(
      http.post('http://localhost/api/cart', () => {
        callCount += 1;
        return HttpResponse.json({ count: 2 });
      })
    );

    const product: ProductDetail = {
      id: '1',
      brand: 'Acme',
      model: 'X',
      price: 299,
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
        storages: [],
      },
    };

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <ProductActions product={product} />
      </QueryClientProvider>
    );

    const button = screen.getByRole('button', { name: 'Añadir al carrito' });
    expect(button.getAttribute('disabled')).not.toBeNull();

    await user.click(button);
    expect(callCount).toBe(0);

    // Ejecuta el onClick para cubrir la guard clause aunque el botón esté disabled
    button.removeAttribute('disabled');
    fireEvent.click(button);
    expect(callCount).toBe(0);
  });

  it('shows pending state while add-to-cart is in flight', async () => {
    const user = userEvent.setup();

    server.use(
      http.post('http://localhost/api/cart', async () => {
        await delay(200);
        return HttpResponse.json({ count: 2 });
      })
    );

    const product: ProductDetail = {
      id: '1',
      brand: 'Acme',
      model: 'X',
      price: 299,
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
    };

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <ProductActions product={product} />
      </QueryClientProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Añadir al carrito' }));

    expect(await screen.findByText('Añadiendo...')).toBeTruthy();

    await waitFor(() => {
      expect(useCartStore.getState().count).toBe(2);
    });
  });
});
