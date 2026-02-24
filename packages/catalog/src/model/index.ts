import {
  createStore,
  createEvent,
  createEffect,
  sample,
  combine,
} from 'effector';

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

export const pageOpened = createEvent();
export const filtersChanged = createEvent<Partial<Filters>>();
export const productSelected = createEvent<string>();
export const searchQueryChanged = createEvent<string>();

export const fetchProductsFx = createEffect<void, Product[]>(async () => {
  await new Promise((r) => setTimeout(r, 500));

  return [
    {
      id: '1',
      name: 'Ноутбук ProBook 15',
      price: 79990,
      description: 'Мощный ноутбук для работы и учёбы',
      image: '💻',
      category: 'electronics',
      rating: 4.5,
    },
    {
      id: '2',
      name: 'Наушники SoundMax',
      price: 4990,
      description: 'Беспроводные наушники с шумоподавлением',
      image: '🎧',
      category: 'electronics',
      rating: 4.2,
    },
    {
      id: '3',
      name: 'Рюкзак CityWalk',
      price: 3490,
      description: 'Городской рюкзак с отделением для ноутбука',
      image: '🎒',
      category: 'accessories',
      rating: 4.8,
    },
    {
      id: '4',
      name: 'Кружка Developer',
      price: 890,
      description: 'Кружка для настоящих разработчиков',
      image: '☕',
      category: 'accessories',
      rating: 4.9,
    },
    {
      id: '5',
      name: 'Клавиатура MechType',
      price: 12990,
      description: 'Механическая клавиатура с подсветкой',
      image: '⌨️',
      category: 'electronics',
      rating: 4.7,
    },
    {
      id: '6',
      name: 'Футболка CodeLife',
      price: 1990,
      description: 'Стильная футболка для программистов',
      image: '👕',
      category: 'clothing',
      rating: 4.3,
    },
  ];
});

export const $filters = createStore<Filters>({
  category: null,
  sortBy: 'rating',
  sortOrder: 'desc',
}).on(filtersChanged, (state, patch) => ({ ...state, ...patch }));

export const $products = createStore<Product[]>([]).on(
  fetchProductsFx.doneData,
  (_, products) => products
);

export const $isLoading = fetchProductsFx.pending;

export const $error = createStore<string | null>(null)
  .on(fetchProductsFx.failData, (_, error) => error.message)
  .reset(fetchProductsFx);

export const $searchQuery = createStore('').on(
  searchQueryChanged,
  (_, query) => query
);

export const $filteredProducts = combine(
  $products,
  $searchQuery,
  $filters,
  (products, query, filters) => {
    let result = products;

    if (query.trim()) {
      const lower = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.description.toLowerCase().includes(lower)
      );
    }

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    // Сортировка
    result = [...result].sort((a, b) => {
      const mul = filters.sortOrder === 'asc' ? 1 : -1;
      if (filters.sortBy === 'price') return (a.price - b.price) * mul;
      if (filters.sortBy === 'rating') return (a.rating - b.rating) * mul;
      return a.name.localeCompare(b.name) * mul;
    });

    return result;
  }
);

sample({
  clock: pageOpened,
  target: fetchProductsFx,
});
