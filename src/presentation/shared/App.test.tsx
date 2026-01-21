import { render, screen } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { server } from '@/core/test/msw/server';
import App from '@/presentation/shared/App';

describe('App', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('renders the product list page', async () => {
    render(<App />);

    expect(await screen.findByText('Listado de productos')).toBeTruthy();
  });
});
