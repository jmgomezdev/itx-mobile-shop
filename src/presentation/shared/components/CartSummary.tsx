import { useCartStore } from '@/application/cart/store/cart.store';

export const CartSummary = () => {
  const cartCount = useCartStore((state) => state.count);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-slate-500">Carrito</span>
      <span
        data-testid="cart-count"
        className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-slate-900 px-2 text-xs font-semibold text-white"
      >
        {cartCount}
      </span>
    </div>
  );
};
