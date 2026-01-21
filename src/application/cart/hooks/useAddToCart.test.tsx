import { useMutation } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useAddToCart } from '@/application/cart/hooks/useAddToCart';
import type { AddToCartInput } from '@/domain/cart/Cart.types';
import { CartRepository } from '@/infrastructure/cart/cart.repository';

const addQuantityMock = vi.fn();

vi.mock('@/application/cart/store/cart.store', () => ({
  useCartStore: (
    selector: (state: { addQuantity: (count: number) => void }) => unknown
  ) => selector({ addQuantity: addQuantityMock }),
}));

vi.mock('@tanstack/react-query', () => ({
  useMutation: vi.fn(),
}));

vi.mock('@/infrastructure/cart/cart.repository', () => ({
  CartRepository: {
    addToCart: vi.fn(),
  },
}));

describe('useAddToCart', () => {
  it('invokes repository and updates store on success', () => {
    const mutateSpy = vi.fn();

    const useMutationMock = vi.mocked(useMutation);

    useMutationMock.mockImplementation(((config) => {
      const { mutationFn, onSuccess } = config as {
        mutationFn?: (input: AddToCartInput) => unknown;
        onSuccess?: (
          data: { count: number },
          variables: AddToCartInput,
          context: unknown
        ) => void;
      };

      return {
        mutate: (input: AddToCartInput) => {
          mutateSpy(input);
          if (mutationFn) {
            void mutationFn(input);
          }
          onSuccess?.({ count: 2 }, input, undefined);
        },
        isPending: false,
      } as ReturnType<typeof useMutation>;
    }) as typeof useMutation);

    const addToCartMock = vi.mocked(CartRepository.addToCart);

    addToCartMock.mockResolvedValue({ count: 2 });

    const { result } = renderHook(() => useAddToCart());

    result.current.addToCart({ productId: '1', colorCode: 1, storageCode: 2 });

    expect(CartRepository.addToCart).toHaveBeenCalledWith({
      productId: '1',
      colorCode: 1,
      storageCode: 2,
    });
    expect(addQuantityMock).toHaveBeenCalledWith(2);
    expect(mutateSpy).toHaveBeenCalledTimes(1);
  });
});
