import React from 'react';
import type { Product } from '../../model';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const stars = '★'.repeat(Math.round(product.rating)) +
                '☆'.repeat(5 - Math.round(product.rating));

  return (
    <div
      style={{
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '20px',
        transition: 'box-shadow 0.2s',
        cursor: 'pointer',
        backgroundColor: '#fff',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '12px' }}>
        {product.image}
      </div>

      <h3 style={{ margin: '0 0 8px', fontSize: '16px' }}>{product.name}</h3>

      <div style={{ color: '#f59e0b', marginBottom: '4px' }}>{stars}</div>

      <p style={{ color: '#666', fontSize: '14px', margin: '0 0 12px' }}>
        {product.description}
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a56db' }}>
          {product.price.toLocaleString('ru-RU')} ₽
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          style={{
            padding: '8px 16px',
            backgroundColor: '#1a56db',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          В корзину
        </button>
      </div>
    </div>
  );
}
