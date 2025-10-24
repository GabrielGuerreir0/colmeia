export type Product = {
  id: string;
  name: string;
  description?: string;
  longDescription?: string;
  price: number;
  amount: number;
  image: string;
};

export interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export interface ProductCardProps {
  product: Product;
}

export interface AddToCartChildProps {
  onAddToCart: (product: Product, quantity?: number) => void;
}
