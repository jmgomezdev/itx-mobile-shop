import { z } from 'zod';

export const productOptionColorSchema = z.object({
  code: z.number(),
  name: z.string().min(1),
});

export const productOptionStorageSchema = z.object({
  code: z.number(),
  name: z.string().min(1),
});

export const productOptionsSchema = z.object({
  colors: z.array(productOptionColorSchema),
  storages: z.array(productOptionStorageSchema),
});

export const productSummarySchema = z.object({
  id: z.string().min(1),
  brand: z.string().min(1),
  model: z.string().min(1),
  price: z.coerce.number().min(0),
  imgUrl: z.url(),
});

export const productDetailSchema = z.object({
  id: z.string().min(1),
  brand: z.string().min(1),
  model: z.string().min(1),
  price: z.coerce.number().min(0),
  imgUrl: z.url(),
  cpu: z.string().min(1),
  ram: z.string().min(1),
  os: z.string().min(1),
  displayResolution: z.string().min(1),
  battery: z.string().min(1),
  primaryCamera: z.array(z.string()),
  secondaryCamera: z.array(z.string()),
  dimensions: z.string().min(1),
  weight: z.string().min(1),
  options: productOptionsSchema,
});
