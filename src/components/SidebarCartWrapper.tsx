"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NavBar } from "./Navbar";
import { SidebarCart } from "./SidebarCart";
import { AddToCartChildProps, Product } from "@/shared/types/products";
import { getUser } from "@/shared/lib/cookies";
import { useCart } from "@/context/CartContext";
import { Props } from "@/shared/types/components";

export function SidebarCartWrapper({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const hideSidebar = pathname === "/login";

  const [cartOpen, setCartOpen] = useState(false);
  const user = getUser();

  const { cartItems, refreshCart } = useCart();

  useEffect(() => {
    refreshCart();
  }, [cartOpen]);

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    if (!user) {
      alert("Você precisa estar logado para adicionar produtos ao carrinho.");
      router.push("/login");
      return;
    }

    refreshCart();
    setCartOpen(true);
  };

  const handleOpenCart = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    setCartOpen(true);
  };

  return (
    <>
      {!hideSidebar && <NavBar onOpenCart={handleOpenCart} />}

      {React.Children.map(children, (child) =>
        React.isValidElement<AddToCartChildProps>(child)
          ? React.cloneElement(child, { onAddToCart: handleAddToCart })
          : child
      )}

      {user && !hideSidebar && (
        <SidebarCart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      )}
    </>
  );
}
