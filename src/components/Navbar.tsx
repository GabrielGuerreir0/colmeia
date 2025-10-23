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

export function NavBar() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const pathname = usePathname();
  const showActions = pathname !== "/login";

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    removeAuthToken();
    removeUser();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <>
      {showActions && (
        <nav className="bg-white shadow-sm px-3 py-2 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/home">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-16 h-8 md:w-20 md:h-10 object-contain"
              />
            </Link>
          </div>

          {/* AÇÕES */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/carrinho">
              <Button
                variant="outline"
                size="sm"
                aria-label="Abrir carrinho"
                className="p-2"
              >
                <FaShoppingCart className="text-base" />
              </Button>
            </Link>

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
                    <Label className="ml-2 text-gray-700 text-sm hidden md:inline">
                      {user.name.split(" ")[0]}
                    </Label>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button
                  variant="default"
                  size="sm"
                  className="px-3 py-1 text-sm"
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
