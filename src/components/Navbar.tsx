"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getUser, removeAuthToken, removeUser } from "@/shared/lib/cookies";
import { FaShoppingCart } from "react-icons/fa";
import { Label } from "@radix-ui/react-dropdown-menu";
import { usePathname } from "next/navigation";
import { NavBarProps } from "@/shared/types/components";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export function NavBar({ onOpenCart }: NavBarProps) {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const pathname = usePathname();
  const showActions = pathname !== "/login";
  const router = useRouter();

  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    removeAuthToken();
    removeUser();
    setUser(null);
    router.push("/login");
  };

  return (
    <>
      {showActions && (
        <nav className="bg-white shadow-sm px-3 py-2 flex justify-between items-center text-[#11286b]">
          <div className="flex items-center">
            <Link href="/">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-16 h-8 md:w-20 md:h-10 object-contain"
              />
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-4 relative ">
            <Button
              variant="outline"
              size="sm"
              className="p-2 hover:text-[#ffbd00] cursor-pointer relative"
              onClick={onOpenCart}
              aria-label="Abrir carrinho"
            >
              <FaShoppingCart className="text-base" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div
                    role="button"
                    tabIndex={0}
                    className="flex items-center focus:outline-none cursor-pointer"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.currentTarget.click();
                      }
                    }}
                  >
                    <Avatar className="rounded-full cursor-pointer">
                      <AvatarImage
                        className="rounded-full w-8 h-8 md:w-9 md:h-9"
                        src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                        alt="User Avatar"
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <Label className="ml-2 text-sm hidden md:inline">
                      {user.name.split(" ")[0]}
                    </Label>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="text-[#11286b] ">
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="hover:text-[#ffbd00] "
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button
                  variant="default"
                  size="sm"
                  className="px-3 py-1 text-sm bg-[#11286b] hover:bg-[#ffbd00] hover:text-[#11286b] cursor-pointer"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </nav>
      )}
    </>
  );
}
