const env = {
  apiBaseUrl:
    import.meta.env.VITE_API_BASE_URL ??
    'https://itx-frontend-test.onrender.com',
} as const;

export { env };
