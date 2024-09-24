import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), tsconfigPaths()].filter(Boolean),
    server: {
      port: parseInt(process.env.PORT || '3000'),
      host: true,
    },
    preview: {
      port: 5000,
    },
    test: {
      globals: true,
      setupFiles: 'src/test-utils/setup',
      environment: 'jsdom',
      exclude: ['node_modules'],
      retry: 2,
    },
  });
};
