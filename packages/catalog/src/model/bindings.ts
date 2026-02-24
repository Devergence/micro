import {createEvent, sample} from 'effector';
import { productSelected } from './index';
import {productAddedToCart, ProductInfo, productViewed} from '@shared/contracts/catalog';

export const addToCartClicked = createEvent<ProductInfo>();

sample({
  clock: addToCartClicked,
  target: productAddedToCart,
});

sample({
  clock: productSelected,
  target: productViewed,
});