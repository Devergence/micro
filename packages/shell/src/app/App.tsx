import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './ErrorBoundary';
import Header from './layout/Header';
import HomePage from '../pages/HomePage';

// ═══════════════════════════════════════════════════
// Динамический импорт УДАЛЁННЫХ модулей!
// Эти компоненты загружаются по сети с других серверов
// ═══════════════════════════════════════════════════
const ProductList = lazy(() => import('catalog/ProductList'));
const CartWidget = lazy(() => import('cart/CartWidget'));
const CartPage = lazy(() => import('cart/CartPage'));

// Fallback-компоненты при ошибках загрузки
function RemoteUnavailable({ name }: { name: string }) {
  return (
    <div
      style={{
        padding: '40px',
        textAlign: 'center',
        backgroundColor: '#fef2f2',
        borderRadius: '12px',
        margin: '20px',
        border: '1px solid #fecaca',
      }}
    >
      <div style={{ fontSize: '48px', marginBottom: '12px' }}>⚠️</div>
      <h2 style={{ color: '#dc2626' }}>Модуль «{name}» недоступен</h2>
      <p style={{ color: '#666' }}>
        Убедитесь, что remote-сервер запущен.
      </p>
      <button
        onClick={() => window.location.reload()}
        style={{
          marginTop: '12px',
          padding: '8px 24px',
          border: '1px solid #dc2626',
          borderRadius: '8px',
          backgroundColor: '#fff',
          color: '#dc2626',
          cursor: 'pointer',
        }}
      >
        Обновить страницу
      </button>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div style={{ padding: '60px', textAlign: 'center', fontSize: '18px', color: '#666' }}>
      ⏳ Загрузка модуля...
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Header с виджетом корзины из remote */}
      <Header
        cartWidget={
          <ErrorBoundary fallback={<span style={{ color: '#fff' }}>🛒 0</span>}>
            <Suspense fallback={<span style={{ color: '#fff' }}>🛒 ...</span>}>
              <CartWidget />
            </Suspense>
          </ErrorBoundary>
        }
      />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <Routes>
          {/* Домашняя — локальный компонент shell */}
          <Route path="/" element={<HomePage />} />

          {/* Каталог — загружается из remote catalog:3001 */}
          <Route
            path="/catalog"
            element={
              <ErrorBoundary fallback={<RemoteUnavailable name="Каталог" />}>
                <Suspense fallback={<LoadingSpinner />}>
                  <ProductList />
                </Suspense>
              </ErrorBoundary>
            }
          />

          {/* Корзина — загружается из remote cart:3002 */}
          <Route
            path="/cart"
            element={
              <ErrorBoundary fallback={<RemoteUnavailable name="Корзина" />}>
                <Suspense fallback={<LoadingSpinner />}>
                  <CartPage />
                </Suspense>
              </ErrorBoundary>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
