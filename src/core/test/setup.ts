import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

vi.mock('@/core/config/env', () => ({
  env: {
    apiBaseUrl: 'http://localhost',
  },
}));

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});
