import type { CartCount } from '@/domain/cart/Cart';
import { cartCountSchema } from '@/domain/cart/Cart.schema';
import type { AddToCartResponseDTO } from '@/infrastructure/cart/cart.dto';

export const mapCartCountFromDTO = (dto: AddToCartResponseDTO): CartCount =>
  cartCountSchema.parse(dto);
