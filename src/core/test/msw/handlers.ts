import { HttpResponse, http } from 'msw';

import type { AddToCartRequestDTO } from '@/infrastructure/cart/cart.dto';
import type {
  ProductDetailDTO,
  ProductSummaryDTO,
} from '@/infrastructure/product/product.dto';

export const productHandlers = [
  http.get('http://localhost/api/product', () => {
    const payload: ProductSummaryDTO[] = [
      {
        id: '1',
        brand: 'Acme',
        model: 'X',
        price: '199',
        imgUrl: 'https://example.com/img.png',
      },
    ];

    return HttpResponse.json(payload);
  }),
  http.get('http://localhost/api/product/:id', ({ params }) => {
    const payload: ProductDetailDTO = {
      id: String(params.id),
      brand: 'Acme',
      model: 'X',
      price: '299',
      imgUrl: 'https://example.com/img.png',
      cpu: 'CPU',
      ram: '8GB',
      os: 'OS',
      displayResolution: '1080p',
      battery: '4000mAh',
      primaryCamera: ['12MP'],
      secondaryCamera: ['8MP'],
      dimensions: '1x1',
      weight: '100g',
      options: {
        colors: [{ code: 1, name: 'Black' }],
        storages: [{ code: 2, name: '128GB' }],
      },
    };

    return HttpResponse.json(payload);
  }),
];

export const cartHandlers = [
  http.post('http://localhost/api/cart', async ({ request }) => {
    const body = (await request.json()) as AddToCartRequestDTO;

    if (body.id !== '1' || body.colorCode !== 1 || body.storageCode !== 2) {
      return HttpResponse.json({ count: 0 }, { status: 400 });
    }

    return HttpResponse.json({ count: 2 });
  }),
];

export const handlers = [...productHandlers, ...cartHandlers];
