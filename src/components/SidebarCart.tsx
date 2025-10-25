"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { CartCard } from "./CartCard";
import { useCart } from "@/context/CartContext";
import { SidebarCartProps } from "@/shared/types/cart";

export const SidebarCart: React.FC<SidebarCartProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const { cartItems } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleGoToCart = () => {
    onClose();
    router.push("/cart");
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity ${
          isOpen
            ? "opacity-70 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-xl z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-[#11286b]">
            <FaShoppingCart /> Seu Carrinho
          </h2>
          <button onClick={onClose} className="text-[#11286b] ">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              Seu carrinho está vazio
            </p>
          ) : (
            cartItems.map((item) => (
              <Card key={item.product.id + "-" + item.quantity}>
                <CardContent>
                  <CartCard item={item} />
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <Card className="p-4 border-t flex flex-col gap-3">
            <div className="flex justify-between font-semibold text-lg text-[#11286b]">
              <span>Total:</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <Button
              variant="default"
              className="w-full py-3 bg-[#11286b] hover:text-[#11286b] hover:bg-[#ffbd00] cursor-pointer"
              onClick={handleGoToCart}
            >
              Finalizar Compra
            </Button>
          </Card>
        )}
      </div>
    </>
  );
};
