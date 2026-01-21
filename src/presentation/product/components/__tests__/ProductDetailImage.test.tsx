import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { ProductDetail } from '@/domain/product/Product.types';
import { ProductDetailImage } from '@/presentation/product/components/ProductDetailImage';

describe('ProductDetailImage', () => {
  it('renders the product image', () => {
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

    render(<ProductDetailImage product={product} />);

    const img = screen.getByAltText('Acme X');
    expect(img.getAttribute('src')).toBe('https://example.com/img.png');
  });
});
