// Типы для удалённых модулей (Module Federation)
// В реальном проекте они могут генерироваться автоматически

declare module 'catalog/ProductList' {
  import { FC } from 'react';
  const ProductList: FC;
  export default ProductList;
}

declare module 'catalog/ProductCard' {
  import { FC } from 'react';
  import type { Product } from '../../catalog/src/model';
  interface Props {
    product: Product;
    onAddToCart: () => void;
  }
  const ProductCard: FC<Props>;
  export default ProductCard;
}

declare module 'cart/CartWidget' {
  import { FC } from 'react';
  const CartWidget: FC;
  export default CartWidget;
}

declare module 'cart/CartPage' {
  import { FC } from 'react';
  const CartPage: FC;
  export default CartPage;
}
