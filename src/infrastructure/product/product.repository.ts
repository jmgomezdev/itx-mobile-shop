import { httpClient } from '@/core/http/httpClient';
import type { ProductDetail, ProductSummary } from '@/domain/product/Product';
import type {
  ProductDetailDTO,
  ProductSummaryDTO,
} from '@/infrastructure/product/product.dto';
import {
  mapProductDetailFromDTO,
  mapProductSummaryFromDTO,
} from '@/infrastructure/product/product.mapper';

const PRODUCT_LIST_PATH = '/api/product';
const PRODUCT_DETAIL_PATH = (id: string) => `/api/product/${id}`;

export const ProductRepository = {
  async getList(): Promise<ProductSummary[]> {
    const response =
      await httpClient.get<ProductSummaryDTO[]>(PRODUCT_LIST_PATH);
    const mapped = response.map(mapProductSummaryFromDTO);
    return mapped;
  },

  async getDetail(id: string): Promise<ProductDetail> {
    const response = await httpClient.get<ProductDetailDTO>(
      PRODUCT_DETAIL_PATH(id)
    );
    const mapped = mapProductDetailFromDTO(response);
    return mapped;
  },
};
