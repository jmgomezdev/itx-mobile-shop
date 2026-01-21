import {
  productDetailSchema,
  productSummarySchema,
} from '@/domain/product/Product.schema';
import type {
  ProductDetail,
  ProductSummary,
} from '@/domain/product/Product.types';
import type {
  ProductCameraDTO,
  ProductDetailDTO,
  ProductSummaryDTO,
} from '@/infrastructure/product/product.dto';

const normalizeCamera = (value: ProductCameraDTO | undefined): string[] => {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
};

export const mapProductSummaryFromDTO = (
  dto: ProductSummaryDTO
): ProductSummary =>
  productSummarySchema.parse({
    id: dto.id,
    brand: dto.brand,
    model: dto.model,
    price: dto.price,
    imgUrl: dto.imgUrl,
  });

export const mapProductDetailFromDTO = (dto: ProductDetailDTO): ProductDetail =>
  productDetailSchema.parse({
    id: dto.id,
    brand: dto.brand,
    model: dto.model,
    price: dto.price,
    imgUrl: dto.imgUrl,
    cpu:
      (Array.isArray(dto.cpu) ? dto.cpu.join(' / ') : dto.cpu)?.trim() ||
      'No disponible',
    ram:
      (Array.isArray(dto.ram) ? dto.ram.join(' / ') : dto.ram)?.trim() ||
      'No disponible',
    os: Array.isArray(dto.os) ? dto.os.join(' / ') : dto.os,
    displayResolution: dto.displayResolution,
    battery: dto.battery?.trim() || 'No disponible',
    primaryCamera: normalizeCamera(dto.primaryCamera),
    secondaryCamera: normalizeCamera(dto.secondaryCmera ?? dto.secondaryCamera),
    dimensions: dto.dimensions ?? 'No disponible',
    weight: String(dto.weight ?? '')?.trim() || 'No disponible',
    options: {
      colors: dto.options.colors,
      storages: dto.options.storages,
    },
  });
