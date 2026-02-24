import { lazy } from 'react';

// ── Prefetch стратегия ──
// Загружаем критичные ремоуты сразу, остальные \u2014 по hover/intent

// Критичные (загрузка сразу после Shell)
const CartWidget = lazy(() => import('cart/CartWidget'));

// По требованию (загрузка при навигации)
const ProductList = lazy(() => import('catalog/ProductList'));
const CartPage = lazy(() => import('cart/CartPage'));

// ── Prefetch при hover на ссылку ──
export function prefetchRemote(remoteName: string) {
  switch (remoteName) {
    case 'catalog':
      import('catalog/ProductList');
      break;
    case 'cart':
      import('cart/CartPage');
      break;
  }
}

// Использование:
<Link
  to="/catalog"
  onMouseEnter={() => prefetchRemote('catalog')}
>
  Каталог
</Link>