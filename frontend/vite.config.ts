import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isDocker = fs.existsSync('/.dockerenv');
  const defaultTarget = isDocker ? 'http://backend:8000' : 'http://127.0.0.1:8080';
  const target = env.BACKEND_URL || process.env.BACKEND_URL || defaultTarget;

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        '/api': {
          target,
          changeOrigin: true,
        },
        '/technology-stack': {
          target,
          changeOrigin: true,
        },
      },
    },
  };
});

