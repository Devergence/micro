import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      filename: 'remoteEntry.js',

      // Откуда загружать удалённые модули
      remotes: {
        catalog: {
          type: 'module',
          name: 'catalog',
          entry: 'http://localhost:3001/remoteEntry.js',
        },
        cart: {
          type: 'module',
          name: 'cart',
          entry: 'http://localhost:3002/remoteEntry.js',
        },
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
    port: 3000,
  },
});
