import { createEvent } from 'effector';

export interface ProductInfo {
  id: string;
  name: string;
  price: number;
  image: string;
}

export const productAddedToCart = createEvent<ProductInfo>();
export const productViewed = createEvent<string>();
