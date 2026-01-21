import { useState } from 'react';

import { useAddToCart } from '@/application/cart/hooks/useAddToCart';
import type { ProductDetail } from '@/domain/product/Product.types';

interface ProductActionsProps {
  product: ProductDetail;
}

export const ProductActions = ({ product }: ProductActionsProps) => {
  const [selectedColor, setSelectedColor] = useState<number | null>(
    product.options.colors[0]?.code ?? null
  );
  const [selectedStorage, setSelectedStorage] = useState<number | null>(
    product.options.storages[0]?.code ?? null
  );
  const { addToCart, isPending } = useAddToCart();

  const isDisabled =
    selectedColor === null || selectedStorage === null || isPending;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs tracking-wide text-slate-400 uppercase">Acciones</p>
      <div className="mt-4 space-y-4">
        <div className="space-y-2">
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="storage"
          >
            Almacenamiento
          </label>
          <div className="relative">
            <select
              id="storage"
              data-testid="product-storage-select"
              value={selectedStorage ?? ''}
              onChange={(event) =>
                setSelectedStorage(Number(event.target.value))
              }
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-2 pr-12 text-sm text-slate-700 shadow-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            >
              {product.options.storages.map((storage) => (
                <option key={storage.code} value={storage.code}>
                  {storage.name}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.25a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="color">
            Color
          </label>
          <div className="relative">
            <select
              id="color"
              data-testid="product-color-select"
              value={selectedColor ?? ''}
              onChange={(event) => setSelectedColor(Number(event.target.value))}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-2 pr-12 text-sm text-slate-700 shadow-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            >
              {product.options.colors.map((color) => (
                <option key={color.code} value={color.code}>
                  {color.name}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.25a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>

        <button
          type="button"
          data-testid="add-to-cart-button"
          onClick={() =>
            !isDisabled &&
            addToCart({
              productId: product.id,
              colorCode: selectedColor,
              storageCode: selectedStorage,
            })
          }
          disabled={isDisabled}
          className="w-full rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isPending ? 'Añadiendo...' : 'Añadir al carrito'}
        </button>
      </div>
    </div>
  );
};
