import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore {
  count: number;
  setCount: (count: number) => void;
  addQuantity: (quantity: number) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      count: 0,
      setCount: (count) => set({ count }),
      addQuantity: (quantity) =>
        set((state) => ({
          count: state.count + quantity,
        })),
    }),
    {
      name: 'cart-count',
    }
  )
);
