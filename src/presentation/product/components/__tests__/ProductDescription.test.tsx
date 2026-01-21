import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { ProductDetail } from '@/domain/product/Product.types';
import { ProductDescription } from '@/presentation/product/components/ProductDescription';

describe('ProductDescription', () => {
  it('renders product specs and price', () => {
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

    render(<ProductDescription product={product} />);

    expect(screen.getByText('Acme X')).toBeTruthy();
    expect(screen.getAllByText('CPU').length).toBeGreaterThan(0);
    expect(screen.getByText('8GB')).toBeTruthy();
    expect(screen.getByText(/299,00/)).toBeTruthy();
  });

  it('renders cameras fallback when none available', () => {
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
      primaryCamera: [],
      secondaryCamera: [],
      dimensions: '1x1',
      weight: '100g',
      options: {
        colors: [{ code: 1, name: 'Black' }],
        storages: [{ code: 2, name: '128GB' }],
      },
    };

    render(<ProductDescription product={product} />);

    expect(screen.getByText('No disponible')).toBeTruthy();
  });
});
