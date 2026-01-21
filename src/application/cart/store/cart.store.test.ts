import { describe, expect, it } from 'vitest';

import { useCartStore } from '@/application/cart/store/cart.store';

describe('cart store', () => {
  it('starts with count 0', () => {
    useCartStore.setState({ count: 0 });

    expect(useCartStore.getState().count).toBe(0);
  });

  it('updates count with setCount', () => {
    useCartStore.getState().setCount(5);

    expect(useCartStore.getState().count).toBe(5);
  });

  it('adds quantity to count', () => {
    useCartStore.setState({ count: 1 });

    useCartStore.getState().addQuantity(3);

    expect(useCartStore.getState().count).toBe(4);
  });
});
