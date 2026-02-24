import React from 'react';
import { useUnit } from 'effector-react';
import {
  $cartItems,
  $cartTotal,
  $isCheckingOut,
  $lastOrderId,
  removeFromCart,
  updateQuantity,
  clearCart,
  checkoutClicked,
} from '../../model';

export default function CartPage() {
  const {
    items,
    total,
    isCheckingOut,
    lastOrderId,
    onRemove,
    onUpdateQty,
    onClear,
    onCheckout,
  } = useUnit({
    items: $cartItems,
    total: $cartTotal,
    isCheckingOut: $isCheckingOut,
    lastOrderId: $lastOrderId,
    onRemove: removeFromCart,
    onUpdateQty: updateQuantity,
    onClear: clearCart,
    onCheckout: checkoutClicked,
  });

  if (lastOrderId) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>✅</div>
        <h2>Заказ оформлен!</h2>
        <p style={{ color: '#666' }}>Номер заказа: {lastOrderId}</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛒</div>
        <h2>Корзина пуста</h2>
        <p>Добавьте товары из каталога</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ margin: 0 }}>Корзина</h2>
        <button
          onClick={() => onClear()}
          style={{
            padding: '8px 16px',
            background: 'none',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            cursor: 'pointer',
            color: '#666',
          }}
        >
          Очистить
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        {items.map((item) => (
          <div
            key={item.productId}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
          >
            <span style={{ fontSize: '32px' }}>{item.image}</span>

            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold' }}>{item.name}</div>
              <div style={{ color: '#666' }}>
                {item.price.toLocaleString('ru-RU')} ₽ × {item.quantity}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => onUpdateQty({ productId: item.productId, quantity: item.quantity - 1 })}
                style={{ width: '32px', height: '32px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', background: '#fff' }}
              >
                −
              </button>
              <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 'bold' }}>
                {item.quantity}
              </span>
              <button
                onClick={() => onUpdateQty({ productId: item.productId, quantity: item.quantity + 1 })}
                style={{ width: '32px', height: '32px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', background: '#fff' }}
              >
                +
              </button>
            </div>

            <div style={{ fontWeight: 'bold', minWidth: '100px', textAlign: 'right' }}>
              {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
            </div>

            <button
              onClick={() => onRemove(item.productId)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#999' }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
        }}
      >
        <div>
          <span style={{ fontSize: '14px', color: '#666' }}>Итого: </span>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {total.toLocaleString('ru-RU')} ₽
          </span>
        </div>

        <button
          onClick={onCheckout}
          disabled={isCheckingOut}
          style={{
            padding: '12px 32px',
            backgroundColor: isCheckingOut ? '#94a3b8' : '#059669',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: isCheckingOut ? 'not-allowed' : 'pointer',
          }}
        >
          {isCheckingOut ? '⏳ Оформляем...' : 'Оформить заказ'}
        </button>
      </div>
    </div>
  );
}
