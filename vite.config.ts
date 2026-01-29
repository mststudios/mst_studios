import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load environment variables from .env
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.')
      }
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    server: {
      port: 3003,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: 'http://localhost:3004',
          changeOrigin: true,
          secure: false,
        },
        '/submit': {
          target: 'http://localhost:3004',
          changeOrigin: true,
          secure: false,
        },
        '/cookie-consent': {
          target: 'http://localhost:3004',
          changeOrigin: true,
          secure: false,
        }
      }
    },
    build: {
      outDir: 'web-build',      // IMPORTANT: ikke dist
      emptyOutDir: true,    // ryd build folder før build
      sourcemap: false      // kan slås til hvis du vil
    }
  };
});