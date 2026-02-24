import React from 'react';
import { useUnit } from 'effector-react';
import { $cartCount, $cartTotal } from '../../model';

export default function CartWidget() {
  const { count, total } = useUnit({
    count: $cartCount,
    total: $cartTotal,
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        backgroundColor: count > 0 ? '#1a56db' : '#e2e8f0',
        color: count > 0 ? '#fff' : '#666',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
    >
      <span>🛒</span>
      <span>{count}</span>
      {count > 0 && (
        <span style={{ fontSize: '12px', opacity: 0.8 }}>
          ({total.toLocaleString('ru-RU')} ₽)
        </span>
      )}
    </div>
  );
}
