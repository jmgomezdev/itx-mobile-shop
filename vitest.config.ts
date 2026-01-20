import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/core": "/src/core",
      "@/ui": "/src/ui",
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/__tests__/setup.ts",
    // environment: "happy-dom",
    coverage: {
      provider: "v8",
      include: ["src/**"],
      exclude: ["src/main.jsx", "src/App.jsx", "**/consts/**", "**/routes/**"],
      reporter: ["text", "json", "html"],
      reportsDirectory: "coverage",
      enabled: true,
    },
  },
});
