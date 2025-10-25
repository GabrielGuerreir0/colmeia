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

export interface CartContextProps {
  cartItems: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  refreshCart: () => void;
  lastUpdated: number;
}

export interface ShowOrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  method?: string;
}

export interface SidebarCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface CartCardProps {
  item: CartItem;
}

export interface BuyCardProps {
  item: CartItem;
}

export interface OrderSummaryContentProps {
  cartItems: CartItem[];
  subtotal: number;
  shippingCost: number | undefined;
  total: number;
  method?: string;
  showCheckoutButton?: boolean;
  onCheckout: () => void;
}

export interface OrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  method?: string;
  showCheckoutButton?: boolean;
  onCheckout: () => void;
}
