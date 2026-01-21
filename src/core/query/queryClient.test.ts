import { describe, expect, it } from 'vitest';

import { queryClient } from '@/core/query/queryClient';

describe('queryClient', () => {
  it('configures default retry for queries', () => {
    const defaults = queryClient.getDefaultOptions();

    expect(defaults.queries?.retry).toBe(1);
  });
});
