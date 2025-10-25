"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaTimes } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { CartCardProps } from "@/shared/types/cart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { CartService } from "@/services/cartService";

export const CartCard: React.FC<CartCardProps> = ({ item }) => {
  const { refreshCart } = useCart();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

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
      <div className="flex items-center gap-3 border-b pb-2">
        {item.product.image && (
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-14 h-14 object-cover rounded"
          />
        )}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="font-medium text-sm text-[#11286b]">
            {item.product.name}
          </h3>
          <p className="text-gray-500 text-xs">
            R$ {(item.product.price * item.quantity).toFixed(2)}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <Button
              size="sm"
              variant="outline"
              className="w-6 h-6 p-0 text-sm text-[#11286b] hover:bg-[#11286b] hover:text-[#ffbd00] cursor-pointer"
              onClick={() =>
                handleChangeQuantity(Math.max(1, item.quantity - 1))
              }
            >
              -
            </Button>
            <span className="w-5 text-center text-sm text-[#11286b]">
              {item.quantity}
            </span>
            <Button
              size="sm"
              variant="outline"
              className="w-6 h-6 p-0 text-sm text-[#11286b] hover:bg-[#11286b] hover:text-[#ffbd00] cursor-pointer"
              onClick={() => handleChangeQuantity(item.quantity + 1)}
            >
              +
            </Button>
          </div>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
          onClick={() => setIsConfirmOpen(true)}
        >
          <FaTimes size={14} />
        </Button>
      </div>

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
