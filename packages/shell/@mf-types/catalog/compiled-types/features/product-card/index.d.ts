import type { Product } from '../../model';
interface ProductCardProps {
    product: Product;
    onAddToCart: () => void;
}
export default function ProductCard({ product, onAddToCart }: ProductCardProps): import("react/jsx-runtime").JSX.Element;
export {};
