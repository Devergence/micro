import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'effector-react';
import { fork } from 'effector';
import CartPage from './features/cart-page';

const scope = fork();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider value={scope}>
      <div style={{ padding: '24px', fontFamily: 'Arial, sans-serif' }}>
        <h1>🛒 Корзина (standalone)</h1>
        <p style={{ color: '#666' }}>
          Standalone-режим корзины для разработки.
        </p>
        <hr />
        <CartPage />
      </div>
    </Provider>
  </React.StrictMode>
);
