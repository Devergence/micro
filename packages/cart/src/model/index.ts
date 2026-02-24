import {
  createStore,
  createEvent,
  createEffect,
  sample,
} from 'effector';
import { productAddedToCart, cartUpdated } from '@mfe/shared-lib';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export const addToCart = createEvent<Omit<CartItem, 'quantity'>>();
export const removeFromCart = createEvent<string>();
export const updateQuantity = createEvent<{ productId: string; quantity: number }>();
export const clearCart = createEvent();
export const checkoutClicked = createEvent();

export const checkoutFx = createEffect<CartItem[], { orderId: string }>(
  async () => {
    await new Promise((r) => setTimeout(r, 1000));
    return { orderId: `ORD-${Date.now()}` };
  }
);

export const $cartItems = createStore<CartItem[]>([])
  .on(addToCart, (items, newItem) => {
    const existing = items.find((i) => i.productId === newItem.productId);
    if (existing) {
      return items.map((i) =>
        i.productId === newItem.productId
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    }
    return [...items, { ...newItem, quantity: 1 }];
  })
  .on(removeFromCart, (items, productId) =>
    items.filter((i) => i.productId !== productId)
  )
  .on(updateQuantity, (items, { productId, quantity }) =>
    quantity <= 0
      ? items.filter((i) => i.productId !== productId)
      : items.map((i) =>
          i.productId === productId ? { ...i, quantity } : i
        )
  )
  .reset(clearCart)
  .reset(checkoutFx.done);

export const $cartTotal = $cartItems.map((items) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0)
);

export const $cartCount = $cartItems.map((items) =>
  items.reduce((sum, i) => sum + i.quantity, 0)
);

export const $isCheckingOut = checkoutFx.pending;

export const $lastOrderId = createStore<string | null>(null)
  .on(checkoutFx.doneData, (_, { orderId }) => orderId)
  .reset(addToCart);

// Когда каталог публикует productAddedToCart → добавляем в корзину
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

// Когда нажали "Оформить" → запускаем чекаут
sample({
  clock: checkoutClicked,
  source: $cartItems,
  filter: (items) => items.length > 0,
  target: checkoutFx,
});

// Когда корзина меняется → публикуем обновление для других модулей
sample({
  clock: $cartItems,
  source: { count: $cartCount, total: $cartTotal },
  target: cartUpdated,
});
