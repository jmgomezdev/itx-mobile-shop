import { useProductSearchStore } from '@/application/product/store/productSearch.store';

export const ProductSearch = () => {
  const query = useProductSearchStore((state) => state.query);
  const setQuery = useProductSearchStore((state) => state.setQuery);

  return (
    <div className="w-full max-w-sm">
      <label className="sr-only" htmlFor="product-search">
        Buscar productos
      </label>
      <input
        id="product-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Buscar por marca o modelo"
        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm transition outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
      />
    </div>
  );
};
