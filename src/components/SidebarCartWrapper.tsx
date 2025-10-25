"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NavBar } from "./Navbar";
import { SidebarCart } from "./SidebarCart";
import { getUser } from "@/shared/lib/cookies";
import { useCart } from "@/context/CartContext";
import { Props } from "@/shared/types/components";

export function SidebarCartWrapper({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const hideSidebar = pathname === "/login";

  const [cartOpen, setCartOpen] = useState(false);
  const user = getUser();

  const { refreshCart } = useCart();

  useEffect(() => {
    refreshCart();
  }, [cartOpen]);

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

      {children}

      {user && !hideSidebar && (
        <SidebarCart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      )}
    </>
  );
}
