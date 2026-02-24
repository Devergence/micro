// packages/catalog/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'catalog',
      filename: 'remoteEntry.js',
// Что экспортируем наружу
      exposes: {
        './ProductList': './src/features/product-list/index.tsx',
        './ProductCard': './src/features/product-card/index.tsx',
        './catalogModel': './src/model/index.ts',
      },
// Общие зависимости (singleton!)
      shared: {
        react: {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
        effector: {
          singleton: true,
        },
        'effector-react': {
          singleton: true,
        },
        '@mfe/shared-lib': {
          singleton: true,
        },
      },
    }),
  ],
  build: {
    target: 'esnext',
    minify: true,
    cssCodeSplit: true,
  },
  server: {
    port: 3001,
    cors: true,
    strictPort: true,
  },
});