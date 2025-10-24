"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Zap } from "lucide-react";
import { CartService } from "@/services/cartService";
import { useCart } from "@/context/CartContext";
import { ProductModalProps } from "@/shared/types/products";

export function ProductModal({ product, open, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { refreshCart } = useCart();
  if (!product) return null;

  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    try {
      CartService.addToCart(product, quantity);
      refreshCart();
      onClose();
    } catch (error) {
      alert("Você precisa estar logado para adicionar produtos ao carrinho.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[45vw] max-w-3xl p-6 rounded-2xl shadow-xl bg-gradient-to-br from-white to-gray-50 overflow-y-auto">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="relative w-full md:w-[400px] h-[400px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl shadow-md border border-gray-200"
            />
          </div>

          <div className="flex flex-col justify-between h-full w-full text-gray-800">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold mb-1">
                {product.name}
              </DialogTitle>
              <DialogDescription className="text-gray-600 text-sm leading-relaxed">
                {product.description || "No description available."}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-2">
              <p className="text-2xl font-semibold text-gray-900">
                R$ {product.price.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">
                Disponível:{" "}
                <span className="font-medium text-gray-800">
                  {product.amount}
                </span>
              </p>

              <div className="flex items-center gap-2 mt-3">
                <span className="text-gray-600 text-sm">Quantidade:</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDecrease}
                  className="w-7 h-7"
                >
                  -
                </Button>
                <span className="font-medium text-base w-5 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleIncrease}
                  className="w-7 h-7"
                >
                  +
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mt-6">
                <Button
                  size="sm"
                  className="w-full sm:w-auto px-6 py-4 text-sm font-medium flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={16} /> Adicionar
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="w-full sm:w-auto px-6 py-4 text-sm font-medium flex items-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg"
                  onClick={handleAddToCart}
                >
                  <Zap size={16} /> Comprar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
