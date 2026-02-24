import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'effector-react';
import { fork } from 'effector';
import ProductList from './features/product-list';

const scope = fork();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider value={scope}>
      <div style={{ padding: '24px', fontFamily: 'Arial, sans-serif' }}>
        <h1>🛍 Каталог (standalone)</h1>
        <p style={{ color: '#666' }}>
          Это standalone-режим каталога. В продакшне этот компонент
          загружается внутри Shell через Module Federation.
        </p>
        <hr />
        <ProductList />
      </div>
    </Provider>
  </React.StrictMode>
);
