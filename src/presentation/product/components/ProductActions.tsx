import { useState } from 'react';

import { useAddToCart } from '@/application/cart/hooks/useAddToCart';
import type { ProductDetail } from '@/domain/product/Product';

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

  const handleAdd = () => {
    if (selectedColor === null || selectedStorage === null) {
      return;
    }

    addToCart({
      productId: product.id,
      colorCode: selectedColor,
      storageCode: selectedStorage,
    });
  };

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
          <select
            id="storage"
            value={selectedStorage ?? ''}
            onChange={(event) => setSelectedStorage(Number(event.target.value))}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          >
            {product.options.storages.map((storage) => (
              <option key={storage.code} value={storage.code}>
                {storage.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="color">
            Color
          </label>
          <select
            id="color"
            value={selectedColor ?? ''}
            onChange={(event) => setSelectedColor(Number(event.target.value))}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          >
            {product.options.colors.map((color) => (
              <option key={color.code} value={color.code}>
                {color.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={isDisabled}
          className="w-full rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isPending ? 'Añadiendo...' : 'Añadir al carrito'}
        </button>
      </div>
    </div>
  );
};
