import type { ProductDetail } from '@/domain/product/Product.types';

interface ProductDetailImageProps {
  product: ProductDetail;
}

export const ProductDetailImage = ({ product }: ProductDetailImageProps) => (
  <div className="flex h-full w-full items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <img
      src={product.imgUrl}
      alt={`${product.brand} ${product.model}`}
      className="h-72 w-auto object-contain"
    />
  </div>
);
