import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { useProductSearchStore } from '@/application/product/store/productSearch.store';
import { ProductSearch } from '@/presentation/product/components/ProductSearch';

describe('ProductSearch', () => {
  it('updates the query in store', async () => {
    const user = userEvent.setup();

    useProductSearchStore.setState({ query: '' });

    render(<ProductSearch />);

    const input = screen.getByLabelText('Buscar productos');
    await user.type(input, 'iphone');

    expect(useProductSearchStore.getState().query).toBe('iphone');
  });
});
