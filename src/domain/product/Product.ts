export interface ProductSummary {
  id: string;
  brand: string;
  model: string;
  price: number;
  imgUrl: string;
}

export interface ProductOptionColor {
  code: number;
  name: string;
}

export interface ProductOptionStorage {
  code: number;
  name: string;
}

export interface ProductOptions {
  colors: ProductOptionColor[];
  storages: ProductOptionStorage[];
}

export interface ProductDetail extends ProductSummary {
  cpu: string;
  ram: string;
  os: string;
  displayResolution: string;
  battery: string;
  primaryCamera: string[];
  secondaryCamera: string[];
  dimensions: string;
  weight: string;
  options: ProductOptions;
}
