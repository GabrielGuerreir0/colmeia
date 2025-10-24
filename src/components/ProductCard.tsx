"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductModal } from "@/components/ProductModal";
import { CartService } from "@/services/cartService";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { ProductCardProps } from "@/shared/types/products";

export function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { refreshCart } = useCart();

  const handleAddOneToCart = () => {
    try {
      CartService.addToCart(product, 1);
      refreshCart();
    } catch {
      alert("Você precisa estar logado para adicionar produtos ao carrinho.");
    }
  };

  return (
    <>
      <Card
        tabIndex={0}
        onDoubleClick={() => setIsModalOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsModalOpen(true);
          }
        }}
        className="cursor-pointer hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 pt-0 max-w-[250px] w-full rounded-xl overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
          className="h-[150px] w-full object-cover border-b"
        />
        <CardContent className="p-4">
          <h2 className="text-base font-semibold mb-1 truncate">
            {product.name}
          </h2>
          <p className="text-sm text-gray-400 mb-2 line-clamp-2">
            {product.description}
          </p>
          <p className="text-sm font-medium text-gray-700 mb-3">
            R${product.price.toFixed(2)}
          </p>
          <Button
            size="sm"
            className="w-full text-sm py-1.5"
            onClick={(e) => {
              e.stopPropagation();
              handleAddOneToCart();
            }}
          >
            <ShoppingCart size={16} /> Add to Cart
          </Button>
        </CardContent>
      </Card>

      <ProductModal
        product={product}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
