export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    rating: number;
}
export interface Filters {
    category: string | null;
    sortBy: 'price' | 'rating' | 'name';
    sortOrder: 'asc' | 'desc';
}
export declare const pageOpened: import("effector").EventCallable<void>;
export declare const filtersChanged: import("effector").EventCallable<Partial<Filters>>;
export declare const productSelected: import("effector").EventCallable<string>;
export declare const searchQueryChanged: import("effector").EventCallable<string>;
export declare const fetchProductsFx: import("effector").Effect<void, Product[], Error>;
export declare const $filters: import("effector").StoreWritable<Filters>;
export declare const $products: import("effector").StoreWritable<Product[]>;
export declare const $isLoading: import("effector").Store<boolean>;
export declare const $error: import("effector").StoreWritable<string | null>;
export declare const $searchQuery: import("effector").StoreWritable<string>;
export declare const $filteredProducts: import("effector").Store<Product[]>;
