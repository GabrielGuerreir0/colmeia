"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { FaTimes } from "react-icons/fa";
import { CartService } from "@/services/cartService";
import { useCart } from "@/context/CartContext";
import type { BuyCardProps } from "@/shared/types/cart";

export const BuyCard: React.FC<BuyCardProps> = ({ item }) => {
  const { cartItems, refreshCart } = useCart();

  const currentItem =
    cartItems.find((i) => i.product.id === item.product.id) || item;

  const handleRemove = () => {
    CartService.removeFromCart(item.product.id);
    refreshCart();
  };

  const handleChangeQuantity = (quantity: number) => {
    CartService.updateQuantity(item.product.id, quantity);
    refreshCart();
  };

  return (
    <Card className="flex flex-col md:flex-row gap-4 p-4">
      {item.product.image && (
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-full md:w-32 h-32 object-cover rounded-lg"
        />
      )}

      <div className="flex-1 flex flex-col justify-between">
        <CardHeader className="p-0 mb-2">
          <CardTitle className="text-lg font-semibold">
            {item.product.name}
          </CardTitle>
          {item.product.description && (
            <p className="text-gray-500 text-sm mt-1">
              {item.product.description}
            </p>
          )}
        </CardHeader>

        <CardFooter className="p-0 flex items-center justify-between mt-2 gap-2">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="w-8 h-8 p-0"
              onClick={() =>
                handleChangeQuantity(Math.max(1, currentItem.quantity - 1))
              }
            >
              -
            </Button>
            <span className="w-8 text-center">{currentItem.quantity}</span>
            <Button
              size="sm"
              variant="outline"
              className="w-8 h-8 p-0"
              onClick={() => handleChangeQuantity(currentItem.quantity + 1)}
            >
              +
            </Button>
          </div>
        </CardFooter>
      </div>
      <div className="flex flex-col-reverse  justify-end ">
        <span className="font-semibold text-lg">
          R$ {(item.product.price * currentItem.quantity).toFixed(2)}
        </span>
      </div>
      <div className="flex justify-end">
        <Button
          size="sm"
          variant="ghost"
          className="text-red-500 hover:text-red-700 p-1"
          onClick={handleRemove}
        >
          <FaTimes size={16} />
        </Button>
      </div>
    </Card>
  );
};
