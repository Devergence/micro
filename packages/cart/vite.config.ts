import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'cart',
      filename: 'remoteEntry.js',

      exposes: {
        './CartWidget': './src/features/cart-widget/index.tsx',
        './CartPage': './src/features/cart-page/index.tsx',
        './cartModel': './src/model/index.ts',
      },

      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        effector: { singleton: true },
        'effector-react': { singleton: true },
        '@mfe/shared-lib': { singleton: true },
      },
    }),
  ],

  server: {
    port: 3002,
    cors: true,
    strictPort: true,
  },
});
