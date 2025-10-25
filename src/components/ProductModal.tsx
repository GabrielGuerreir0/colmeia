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
import { ShoppingCart } from "lucide-react";
import { ProductModalProps } from "@/shared/types/products";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { getUser } from "@/shared/lib/cookies";

export function ProductModal({ product, open, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();
  const user = getUser();

  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState<"default" | "destructive">(
    "default"
  );
  const [showAlert, setShowAlert] = useState(false);

  const showToast = (message: string, variant: "default" | "destructive") => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  if (!product) return null;

  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      addToCart(product, quantity);
      showToast(`${product.name} adicionado ao carrinho!`, "default");
      onClose();
    } catch {
      showToast("Erro ao adicionar produto ao carrinho.", "destructive");
    }
  };

  return (
    <>
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
                <DialogTitle className="text-2xl font-semibold mb-1 text-[#11286b]">
                  {product.name}
                </DialogTitle>
                <DialogDescription className="text-gray-600 text-sm leading-relaxed">
                  {product.longDescription || "No description available."}
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
                    className="w-7 h-7 text-[#11286b] hover:bg-[#11286b] hover:text-[#ffbd00] cursor-pointer"
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
                    className="w-7 h-7 text-[#11286b] hover:bg-[#11286b] hover:text-[#ffbd00] cursor-pointer"
                  >
                    +
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-6">
                  <Button
                    size="sm"
                    className="w-full sm:w-auto px-6 py-4 text-sm font-medium flex items-center gap-2 hover:text-[#11286b] bg-[#11286b] hover:bg-[#ffbd00] cursor-pointer text-white rounded-lg"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart size={16} /> Adicionar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
