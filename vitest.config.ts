import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/core/test/setup.ts',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: [
        'src/main.tsx',
        'src/core/config',
        'src/core/test',
        'src/domain/**/*.types.ts',
        'src/infrastructure/**/*.dto.ts',
      ],
      reporter: ['text', 'json', 'html'],
      reportsDirectory: 'coverage',
      enabled: true,
    },
  },
});
