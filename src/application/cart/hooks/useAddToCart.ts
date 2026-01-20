import { useMutation } from '@tanstack/react-query';

import { useCartStore } from '@/application/cart/store/cart.store';
import type { AddToCartInput } from '@/domain/cart/Cart';
import { CartRepository } from '@/infrastructure/cart/cart.repository';

export const useAddToCart = () => {
  const addQuantity = useCartStore((state) => state.addQuantity);

  const mutation = useMutation({
    mutationFn: (input: AddToCartInput) => CartRepository.addToCart(input),
    onSuccess: (data) => addQuantity(data.count),
  });

  return {
    addToCart: mutation.mutate,
    isPending: mutation.isPending,
  };
};
