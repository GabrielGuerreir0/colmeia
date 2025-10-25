"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { FaTimes } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { CartService } from "@/services/cartService";
import type { BuyCardProps } from "@/shared/types/cart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export const BuyCard: React.FC<BuyCardProps> = ({ item }) => {
  const { cartItems, refreshCart } = useCart();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const currentItem =
    cartItems.find((i) => i.product.id === item.product.id) || item;

  const handleRemove = () => {
    CartService.removeFromCart(item.product.id);
    refreshCart();
    setIsConfirmOpen(false);
  };

  const handleChangeQuantity = (quantity: number) => {
    CartService.updateQuantity(item.product.id, quantity);
    refreshCart();
  };

  return (
    <>
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
            <CardTitle className="text-lg font-semibold text-[#11286b]">
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
                className="w-8 h-8 p-0 text-[#11286b] hover:bg-[#11286b] hover:text-[#ffbd00] cursor-pointer"
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
                className="w-8 h-8 p-0 text-[#11286b] hover:bg-[#11286b] hover:text-[#ffbd00] cursor-pointer"
                onClick={() => handleChangeQuantity(currentItem.quantity + 1)}
              >
                +
              </Button>
            </div>
          </CardFooter>
        </div>

        <div className="flex flex-col-reverse justify-end ">
          <span className="font-semibold text-lg">
            R$ {(item.product.price * currentItem.quantity).toFixed(2)}
          </span>
        </div>

        <div className="flex justify-end">
          <Button
            size="sm"
            variant="ghost"
            className="text-red-500 hover:text-red-700 p-1"
            onClick={() => setIsConfirmOpen(true)}
          >
            <FaTimes size={16} />
          </Button>
        </div>
      </Card>

      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="w-[300px] p-4 rounded-lg">
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600 mt-2">
            Tem certeza que deseja remover <strong>{item.product.name}</strong>{" "}
            do carrinho?
          </p>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              className="cursor-pointer"
              variant="outline"
              size="sm"
              onClick={() => setIsConfirmOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="cursor-pointer hover:bg-amber-900"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
            >
              Remover
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
