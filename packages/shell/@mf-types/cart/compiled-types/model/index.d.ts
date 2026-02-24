export interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}
export declare const addToCart: import("effector").EventCallable<Omit<CartItem, "quantity">>;
export declare const removeFromCart: import("effector").EventCallable<string>;
export declare const updateQuantity: import("effector").EventCallable<{
    productId: string;
    quantity: number;
}>;
export declare const clearCart: import("effector").EventCallable<void>;
export declare const checkoutClicked: import("effector").EventCallable<void>;
export declare const checkoutFx: import("effector").Effect<CartItem[], {
    orderId: string;
}, Error>;
export declare const $cartItems: import("effector").StoreWritable<CartItem[]>;
export declare const $cartTotal: import("effector").Store<number>;
export declare const $cartCount: import("effector").Store<number>;
export declare const $isCheckingOut: import("effector").Store<boolean>;
export declare const $checkoutError: import("effector").StoreWritable<string | null>;
export declare const $lastOrderId: import("effector").StoreWritable<string | null>;
