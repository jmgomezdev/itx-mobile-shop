import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ProductListFallback } from '@/presentation/product/components/ProductListFallback';

describe('ProductListFallback', () => {
  it('renders loading state', () => {
    render(<ProductListFallback />);

    expect(screen.getByText('Cargando productos...')).toBeTruthy();
  });
});
