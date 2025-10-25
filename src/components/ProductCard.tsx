"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductModal } from "@/components/ProductModal";
import { ShoppingCart } from "lucide-react";
import { ProductCardProps } from "@/shared/types/products";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useCart } from "@/context/CartContext";
import { getUser } from "@/shared/lib/cookies";

export function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState<"default" | "destructive">(
    "default"
  );
  const [showAlert, setShowAlert] = useState(false);

  const { addToCart } = useCart();
  const router = useRouter();
  const user = getUser();

  const showToast = (message: string, variant: "default" | "destructive") => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleAddOneToCart = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      addToCart(product, 1);
      showToast(`${product.name} adicionado ao carrinho!`, "default");
    } catch {
      showToast(
        "Erro ao adicionar produto ao carrinho. Tente novamente.",
        "destructive"
      );
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
        className="cursor-pointer hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 pt-0 pb-0 max-w-[250px] w-full rounded-xl overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
          className="h-[150px] w-full object-cover border-b"
        />
        <CardContent className="p-4 pt-0">
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
            className="w-full text-sm py-1.5 cursor-pointer bg-[#11286b] hover:bg-[#ffbd00]"
            onClick={(e) => {
              e.stopPropagation();
              handleAddOneToCart();
            }}
          >
            <ShoppingCart size={16} /> Adicionar ao Carrinho
          </Button>
        </CardContent>
      </Card>

      <ProductModal
        product={product}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {showAlert && (
        <div className="fixed bottom-5 right-5 z-[9999] w-[300px] md:w-[400px]">
          <Alert variant={alertVariant}>
            <AlertTitle>
              {alertVariant === "destructive" ? "Erro" : "Sucesso"}
            </AlertTitle>
            <AlertDescription>{alertMessage}</AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
}
