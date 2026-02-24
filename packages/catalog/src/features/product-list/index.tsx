import React, { useEffect } from 'react';
import { useUnit } from 'effector-react';
import {
  $filteredProducts,
  $isLoading,
  $error,
  pageOpened,
  searchQueryChanged,
} from '../../model';
import { productAddedToCart } from '@mfe/shared-lib';
import ProductCard from '../product-card';

export default function ProductList() {
  const { products, isLoading, error, onPageOpened, onSearch, onAddToCart } = useUnit({
    products: $filteredProducts,
    isLoading: $isLoading,
    error: $error,
    onPageOpened: pageOpened,
    onSearch: searchQueryChanged,
    onAddToCart: productAddedToCart,
  });

  useEffect(() => {
    onPageOpened();
  }, []);

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        Ошибка загрузки: {error}
      </div>
    );
  }

  return (
    <div>
      <input
        type="text"
        placeholder="🔍 Поиск товаров..."
        onChange={(e) => onSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px',
          fontSize: '16px',
          border: '2px solid #e2e8f0',
          borderRadius: '8px',
          marginBottom: '24px',
          boxSizing: 'border-box',
        }}
      />

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px' }}>
          ⏳ Загрузка товаров...
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() =>
                onAddToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                })
              }
            />
          ))}
        </div>
      )}

      {!isLoading && products.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
          Ничего не найдено
        </div>
      )}
    </div>
  );
}
