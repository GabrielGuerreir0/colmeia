"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { CartContextProps, CartItem } from "@/shared/types/cart";
import { CartService } from "@/services/cartService";
import { useUser } from "@/context/UserContext";
import { Product } from "@/shared/types/products";

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const refreshCart = useCallback(() => {
    if (!user) return;
    const cart = CartService.getCart();
    setCartItems(cart.items || []);
    setLastUpdated(Date.now());
  }, [user]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product: Product, quantity: number = 1) => {
    if (!user) throw new Error("Usuário não está logado");

    CartService.addToCart(product, quantity);
    refreshCart();
    openCart();
  };

  useEffect(() => {
    if (user) refreshCart();
    else setCartItems([]);
  }, [user, refreshCart]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        refreshCart,
        lastUpdated,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
