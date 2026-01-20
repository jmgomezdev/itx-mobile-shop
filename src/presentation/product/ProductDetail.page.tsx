import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, getRouteApi } from '@tanstack/react-router';

import { productQueries } from '@/application/product/product.queries';
import { ProductActions } from '@/presentation/product/components/ProductActions';
import { ProductDescription } from '@/presentation/product/components/ProductDescription';
import { ProductDetailImage } from '@/presentation/product/components/ProductDetailImage';

const routeApi = getRouteApi('/product/$productId');

export const ProductDetailPage = () => {
  const { productId } = routeApi.useParams();
  const { data } = useSuspenseQuery(productQueries.detail(productId));

  return (
    <section className="space-y-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
      >
        ← Volver al listado
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <ProductDetailImage product={data} />
        <div className="space-y-6">
          <ProductDescription product={data} />
          <ProductActions key={data.id} product={data} />
        </div>
      </div>
    </section>
  );
};
