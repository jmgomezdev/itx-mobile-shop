import { useProductSearch } from '@/application/product/hooks/useProductSearch';
import { ProductCard } from '@/presentation/product/components/ProductCard';
import { ProductSearch } from '@/presentation/product/components/ProductSearch';

export const ProductListPage = () => {
  const { products } = useProductSearch();

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs tracking-wide text-slate-400 uppercase">
            Listado de productos
          </p>
          <h1 className="text-lg font-semibold text-slate-900">
            Encuentra tu próximo móvil
          </h1>
        </div>
        <ProductSearch />
      </div>

      <div
        data-testid="product-list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
