import { httpClient } from '@/core/http/httpClient';
import type { AddToCartInput, CartCount } from '@/domain/cart/Cart.types';
import type { AddToCartResponseDTO } from '@/infrastructure/cart/cart.dto';
import { mapCartCountFromDTO } from '@/infrastructure/cart/cart.mapper';

const ADD_TO_CART_PATH = '/api/cart';

export const CartRepository = {
  async addToCart(input: AddToCartInput): Promise<CartCount> {
    const body: Record<string, number | string> = {
      id: input.productId,
      colorCode: input.colorCode,
      storageCode: input.storageCode,
    };

    const response = await httpClient.post<AddToCartResponseDTO, typeof body>(
      ADD_TO_CART_PATH,
      body
    );

    return mapCartCountFromDTO(response);
  },
};
