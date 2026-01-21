import { setupServer } from 'msw/node';

import { handlers } from '@/core/test/msw/handlers';

export const server = setupServer(...handlers);
