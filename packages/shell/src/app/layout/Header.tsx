import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  cartWidget: ReactNode;
}

export default function Header({ cartWidget }: HeaderProps) {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 32px',
        backgroundColor: '#1e293b',
        color: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
            🏪 MFE Shop
          </span>
        </Link>

        <nav style={{ display: 'flex', gap: '20px' }}>
          <Link
            to="/catalog"
            style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '15px' }}
          >
            Каталог
          </Link>
          <Link
            to="/cart"
            style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '15px' }}
          >
            Корзина
          </Link>
        </nav>
      </div>

      <Link to="/cart" style={{ textDecoration: 'none' }}>
        {cartWidget}
      </Link>
    </header>
  );
}
