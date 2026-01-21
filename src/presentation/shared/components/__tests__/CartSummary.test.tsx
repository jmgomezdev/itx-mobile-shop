import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useCartStore } from '@/application/cart/store/cart.store';
import { CartSummary } from '@/presentation/shared/components/CartSummary';

describe('CartSummary', () => {
  it('renders cart count from store', () => {
    useCartStore.setState({ count: 3 });

    render(<CartSummary />);

    expect(screen.getByText('Carrito')).toBeTruthy();
    expect(screen.getByText('3')).toBeTruthy();
  });
});
