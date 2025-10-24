"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FaTimes } from "react-icons/fa";
import { CartService } from "@/services/cartService";
import { useCart } from "@/context/CartContext";
import { CartCardProps } from "@/shared/types/cart";

export const CartCard: React.FC<CartCardProps> = ({ item }) => {
  const { refreshCart } = useCart();

  const handleRemove = () => {
    CartService.removeFromCart(item.product.id);
    refreshCart();
  };

  const handleChangeQuantity = (quantity: number) => {
    CartService.updateQuantity(item.product.id, quantity);
    refreshCart();
  };

  return (
    <div className="flex items-center gap-3 border-b pb-2">
      {item.product.image && (
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-14 h-14 object-cover rounded"
        />
      )}
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="font-medium text-sm">{item.product.name}</h3>
        <p className="text-gray-500 text-xs">
          R$ {(item.product.price * item.quantity).toFixed(2)}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <Button
            size="sm"
            variant="outline"
            className="w-6 h-6 p-0 text-sm"
            onClick={() => handleChangeQuantity(Math.max(1, item.quantity - 1))}
          >
            -
          </Button>
          <span className="w-5 text-center text-sm">{item.quantity}</span>
          <Button
            size="sm"
            variant="outline"
            className="w-6 h-6 p-0 text-sm"
            onClick={() => handleChangeQuantity(item.quantity + 1)}
          >
            +
          </Button>
        </div>
      </div>
      <Button
        size="sm"
        variant="ghost"
        className="text-red-500 hover:text-red-700 p-1"
        onClick={handleRemove}
      >
        <FaTimes size={14} />
      </Button>
    </div>
  );
};
