import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore {
  count: number;
  setCount: (count: number) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      count: 0,
      setCount: (count) => set({ count }),
    }),
    {
      name: 'cart-count',
    }
  )
);
