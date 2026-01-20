export interface ProductSummaryDTO {
  id: string;
  brand: string;
  model: string;
  price: string;
  imgUrl: string;
}

export interface ProductOptionColorDTO {
  code: number;
  name: string;
}

export interface ProductOptionStorageDTO {
  code: number;
  name: string;
}

export interface ProductOptionsDTO {
  colors: ProductOptionColorDTO[];
  storages: ProductOptionStorageDTO[];
}

export type ProductCameraDTO = string | string[];

export interface ProductDetailDTO {
  id: string;
  brand: string;
  model: string;
  price: string;
  imgUrl: string;
  cpu: string;
  ram: string;
  os: string;
  displayResolution: string;
  battery: string;
  primaryCamera: ProductCameraDTO;
  secondaryCmera?: ProductCameraDTO;
  secondaryCamera?: ProductCameraDTO;
  dimensions?: string;
  weight: string | number;
  options: ProductOptionsDTO;
}
