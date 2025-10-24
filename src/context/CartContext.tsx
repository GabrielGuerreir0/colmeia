"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { CartItem } from "@/shared/types/cart";
import { CartService } from "@/services/cartService";
import { useUser } from "@/context/UserContext";

interface CartContextProps {
  cartItems: CartItem[];
  refreshCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (user) {
      const cart = CartService.getCart();
      setCartItems(cart.items || []);
    } else {
      setCartItems([]);
    }
  }, [user]);

  const refreshCart = () => {
    if (!user) return;
    const cart = CartService.getCart();
    setCartItems(cart.items || []);
  };

  return (
    <CartContext.Provider value={{ cartItems, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};
