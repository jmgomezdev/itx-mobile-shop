import { z } from 'zod';

export const cartCountSchema = z.object({
  count: z.number().min(0),
});
