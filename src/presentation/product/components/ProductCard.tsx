import { Link } from '@tanstack/react-router';

import type { ProductSummary } from '@/domain/product/Product';

interface ProductCardProps {
  product: ProductSummary;
}

const priceFormatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
});

export const ProductCard = ({ product }: ProductCardProps) => (
  <Link
    to="/product/$productId"
    params={{ productId: product.id }}
    className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
  >
    <div className="flex h-40 w-full items-center justify-center rounded-xl bg-slate-50">
      <img
        src={product.imgUrl}
        alt={`${product.brand} ${product.model}`}
        className="h-32 w-auto object-contain"
        loading="lazy"
      />
    </div>
    <div className="mt-4 space-y-1">
      <p className="text-xs tracking-wide text-slate-400 uppercase">
        {product.brand}
      </p>
      <h3 className="text-sm font-semibold text-slate-900">{product.model}</h3>
      <p className="text-sm font-medium text-slate-700">
        {priceFormatter.format(product.price)}
      </p>
    </div>
  </Link>
);
