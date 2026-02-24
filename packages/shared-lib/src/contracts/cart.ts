import { createEvent } from 'effector';

export interface CartSummary {
  count: number;
  total: number;
}

export const cartUpdated = createEvent<CartSummary>();
