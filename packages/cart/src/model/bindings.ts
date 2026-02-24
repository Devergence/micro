import { sample } from 'effector';
import { $cartTotal, $cartCount } from './index';
import { cartUpdated } from '@shared/contracts/cart';
import { productAddedToCart } from '@shared/contracts/catalog';
import { addToCart } from './index';

sample({
  clock: productAddedToCart,
  fn: (product) => ({
    productId: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
  }),
  target: addToCart,
});

sample({
  clock: [$cartCount, $cartTotal],
  source: { count: $cartCount, total: $cartTotal },
  target: cartUpdated,
});