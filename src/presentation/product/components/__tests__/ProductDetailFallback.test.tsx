import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ProductDetailFallback } from '@/presentation/product/components/ProductDetailFallback';

describe('ProductDetailFallback', () => {
  it('renders loading skeleton', () => {
    const { container } = render(<ProductDetailFallback />);

    expect(container.querySelector('section')).toBeTruthy();
  });
});
