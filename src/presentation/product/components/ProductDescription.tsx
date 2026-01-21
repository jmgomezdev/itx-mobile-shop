import type { ProductDetail } from '@/domain/product/Product.types';

interface ProductDescriptionProps {
  product: ProductDetail;
}

const priceFormatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
});

export const ProductDescription = ({ product }: ProductDescriptionProps) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <p className="text-xs tracking-wide text-slate-400 uppercase">
      Descripción
    </p>
    <h2 className="mt-2 text-lg font-semibold text-slate-900">
      {product.brand} {product.model}
    </h2>

    <dl className="mt-4 space-y-3 text-sm text-slate-600">
      <div className="flex items-center justify-between gap-4">
        <dt className="text-slate-500">Precio</dt>
        <dd className="font-semibold text-slate-900">
          {priceFormatter.format(product.price)}
        </dd>
      </div>
      <div className="flex items-center justify-between gap-4">
        <dt className="text-slate-500">CPU</dt>
        <dd>{product.cpu}</dd>
      </div>
      <div className="flex items-center justify-between gap-4">
        <dt className="text-slate-500">RAM</dt>
        <dd>{product.ram}</dd>
      </div>
      <div className="flex items-center justify-between gap-4">
        <dt className="text-slate-500">Sistema Operativo</dt>
        <dd>{product.os}</dd>
      </div>
      <div className="flex items-center justify-between gap-4">
        <dt className="text-slate-500">Resolución</dt>
        <dd>{product.displayResolution}</dd>
      </div>
      <div className="flex items-center justify-between gap-4">
        <dt className="text-slate-500">Batería</dt>
        <dd>{product.battery}</dd>
      </div>
      <div className="flex items-center justify-between gap-4">
        <dt className="text-slate-500">Cámaras</dt>
        <dd>
          {product.primaryCamera.concat(product.secondaryCamera).join(' / ') ||
            'No disponible'}
        </dd>
      </div>
      <div className="flex items-center justify-between gap-4">
        <dt className="text-slate-500">Dimensiones</dt>
        <dd>{product.dimensions}</dd>
      </div>
      <div className="flex items-center justify-between gap-4">
        <dt className="text-slate-500">Peso</dt>
        <dd>{product.weight}</dd>
      </div>
    </dl>
  </div>
);
