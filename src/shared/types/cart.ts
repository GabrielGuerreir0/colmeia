import { Product } from "./products";

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Cart = {
  id: string;
  items: CartItem[];
  total: number;
};
