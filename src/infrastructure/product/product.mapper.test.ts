import { describe, expect, it } from 'vitest';

import type {
  ProductDetailDTO,
  ProductSummaryDTO,
} from '@/infrastructure/product/product.dto';
import {
  mapProductDetailFromDTO,
  mapProductSummaryFromDTO,
} from '@/infrastructure/product/product.mapper';

describe('product mapper', () => {
  it('maps product summary DTO to domain entity', () => {
    const dto: ProductSummaryDTO = {
      id: '1',
      brand: 'Acme',
      model: 'X',
      price: '199',
      imgUrl: 'https://example.com/img.png',
    };

    const result = mapProductSummaryFromDTO(dto);

    expect(result.price).toBe(199);
    expect(result.model).toBe('X');
  });

  it('normalizes product detail data and fallbacks', () => {
    const dto: ProductDetailDTO = {
      id: '1',
      brand: 'Acme',
      model: 'X',
      price: '299',
      imgUrl: 'https://example.com/img.png',
      cpu: ' ',
      ram: '4GB',
      os: 'OS',
      displayResolution: '1080p',
      battery: ' ',
      primaryCamera: '12MP',
      secondaryCmera: ['8MP'],
      dimensions: undefined,
      weight: '',
      options: {
        colors: [{ code: 1, name: 'Black' }],
        storages: [{ code: 2, name: '128GB' }],
      },
    };

    const result = mapProductDetailFromDTO(dto);

    expect(result.cpu).toBe('No disponible');
    expect(result.battery).toBe('No disponible');
    expect(result.primaryCamera).toEqual(['12MP']);
    expect(result.secondaryCamera).toEqual(['8MP']);
    expect(result.dimensions).toBe('No disponible');
    expect(result.weight).toBe('No disponible');
  });

  it('returns empty arrays when camera fields are missing', () => {
    const dto: ProductDetailDTO = {
      id: '1',
      brand: 'Acme',
      model: 'X',
      price: '299',
      imgUrl: 'https://example.com/img.png',
      cpu: 'CPU',
      ram: '4GB',
      os: 'OS',
      displayResolution: '1080p',
      battery: 'Battery',
      primaryCamera: undefined as unknown as ProductDetailDTO['primaryCamera'],
      dimensions: '1x1',
      weight: '100g',
      options: {
        colors: [{ code: 1, name: 'Black' }],
        storages: [{ code: 2, name: '128GB' }],
      },
    };

    const result = mapProductDetailFromDTO(dto);

    expect(result.primaryCamera).toEqual([]);
    expect(result.secondaryCamera).toEqual([]);
  });

  it('joins array cpu/ram/os and reads secondaryCamera when typo field is missing', () => {
    const dto: ProductDetailDTO = {
      id: '1',
      brand: 'Acme',
      model: 'X',
      price: '299',
      imgUrl: 'https://example.com/img.png',
      cpu: ['CPU1', 'CPU2'],
      ram: ['4GB', '8GB'],
      os: ['OS1', 'OS2'],
      displayResolution: '1080p',
      battery: 'Battery',
      primaryCamera: ['12MP'],
      secondaryCamera: '8MP',
      // secondaryCmera omitido a propósito
      dimensions: '1x1',
      weight: '100g',
      options: {
        colors: [{ code: 1, name: 'Black' }],
        storages: [{ code: 2, name: '128GB' }],
      },
    };

    const result = mapProductDetailFromDTO(dto);

    expect(result.cpu).toBe('CPU1 / CPU2');
    expect(result.ram).toBe('4GB / 8GB');
    expect(result.os).toBe('OS1 / OS2');
    expect(result.secondaryCamera).toEqual(['8MP']);
  });

  it('falls back ram and weight when empty/missing', () => {
    const dto: ProductDetailDTO = {
      id: '1',
      brand: 'Acme',
      model: 'X',
      price: '299',
      imgUrl: 'https://example.com/img.png',
      cpu: 'CPU',
      ram: ' ',
      os: 'OS',
      displayResolution: '1080p',
      battery: 'Battery',
      primaryCamera: '12MP',
      secondaryCamera: '8MP',
      dimensions: '1x1',
      weight: undefined as unknown as ProductDetailDTO['weight'],
      options: {
        colors: [{ code: 1, name: 'Black' }],
        storages: [{ code: 2, name: '128GB' }],
      },
    };

    const result = mapProductDetailFromDTO(dto);

    expect(result.ram).toBe('No disponible');
    expect(result.weight).toBe('No disponible');
  });
});
