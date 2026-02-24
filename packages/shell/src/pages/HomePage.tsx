import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>🏪</h1>
      <h1 style={{ fontSize: '32px', marginBottom: '8px', color: '#1e293b' }}>
        MFE Shop Demo
      </h1>
      <p style={{ color: '#64748b', fontSize: '18px', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
        Демонстрация микрофронтендной архитектуры.
        Shell (этот модуль) загружает Каталог и Корзину
        как отдельные приложения через Module Federation.
      </p>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/catalog" style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '24px 40px',
            backgroundColor: '#1a56db',
            color: '#fff',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: 'bold',
          }}>
            🛍 Открыть каталог
          </div>
        </Link>

        <Link to="/cart" style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '24px 40px',
            backgroundColor: '#059669',
            color: '#fff',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: 'bold',
          }}>
            🛒 Перейти в корзину
          </div>
        </Link>
      </div>

      {/* Инфо для доклада */}
      <div style={{
        marginTop: '60px',
        padding: '24px',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        maxWidth: '700px',
        margin: '60px auto 0',
        textAlign: 'left',
      }}>
        <h3 style={{ marginTop: 0 }}>📋 Архитектура этого демо</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left', padding: '8px' }}>Модуль</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Порт</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Роль</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '8px', fontWeight: 'bold' }}>Shell</td>
              <td style={{ padding: '8px' }}>:3000</td>
              <td style={{ padding: '8px' }}>Host — навигация, layout, роутинг</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '8px', fontWeight: 'bold' }}>Catalog</td>
              <td style={{ padding: '8px' }}>:3001</td>
              <td style={{ padding: '8px' }}>Remote — список товаров, карточки</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', fontWeight: 'bold' }}>Cart</td>
              <td style={{ padding: '8px' }}>:3002</td>
              <td style={{ padding: '8px' }}>Remote — виджет и страница корзины</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
