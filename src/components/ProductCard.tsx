"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductModal } from "@/components/ProductModal";
import type { Product } from "@/shared/types/products";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDoubleClick = () => setIsModalOpen(true);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <>
      <Card
        tabIndex={0}
        onDoubleClick={handleDoubleClick}
        onKeyDown={handleKeyDown}
        className="cursor-pointer hover:shadow-md transition-all duration-200 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
        pt-0 max-w-[250px] w-full rounded-xl overflow-hidden"
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
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>

      <ProductModal
        product={product}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={onAddToCart}
      />
    </>
  );
}
