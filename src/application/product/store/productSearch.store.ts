import { create } from 'zustand';

interface ProductSearchStore {
  query: string;
  setQuery: (query: string) => void;
}

export const useProductSearchStore = create<ProductSearchStore>((set) => ({
  query: '',
  setQuery: (query) => set({ query }),
}));
