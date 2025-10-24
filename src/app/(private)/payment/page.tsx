"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  useCheckout,
  CardInfo,
  PaymentMethod,
} from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";
import { ShowOrderSummary } from "@/components/ShowOrderSummary";
import { useCart } from "@/context/CartContext";

export type CardFormValues = z.infer<typeof cardSchema>;
const cardSchema = z.object({
  cardNumber: z.string().min(16, "Número do cartão deve ter 16 dígitos"),
  cardName: z.string().min(2, "Nome do titular é obrigatório"),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, "Formato MM/AA"),
  cvv: z.string().min(3).max(4),
});

export default function PaymentPage() {
  const { data, setCheckoutData } = useCheckout();
  const { cartItems } = useCart();
  const router = useRouter();
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = 15;
  const total = subtotal + shipping;

  const [isCardValid, setIsCardValid] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CardFormValues>({ resolver: zodResolver(cardSchema) });

  const handleCardSubmit = (cardData: CardInfo) => {
    setIsValidating(true);
    setIsCardValid(false);

    setTimeout(() => {
      setCheckoutData({ paymentMethod: "card", cardInfo: cardData });
      setIsCardValid(true);
      setIsValidating(false);
    }, 5000);
  };

  const handleSelectPayment = (method: PaymentMethod) => {
    setCheckoutData({ paymentMethod: method });
    setIsCardValid(false);
    reset();
  };

  const handleNext = () => {
    router.push("/preview");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">
        Escolha o Método de Pagamento
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <RadioGroup
            value={data.paymentMethod}
            onValueChange={handleSelectPayment}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card">Cartão de Crédito</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="boleto" id="boleto" />
              <Label htmlFor="boleto">Boleto</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pix" id="pix" />
              <Label htmlFor="pix">PIX</Label>
            </div>
          </RadioGroup>

          {data.paymentMethod === "card" && (
            <form
              onSubmit={handleSubmit(handleCardSubmit)}
              className="space-y-4 mt-4 p-4 border rounded-lg bg-gray-50"
            >
              <Input
                {...register("cardNumber")}
                placeholder="Número do cartão"
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-xs">
                  {errors.cardNumber.message}
                </p>
              )}
              <Input {...register("cardName")} placeholder="Nome do titular" />
              {errors.cardName && (
                <p className="text-red-500 text-xs">
                  {errors.cardName.message}
                </p>
              )}
              <div className="grid grid-cols-2 gap-4">
                <Input {...register("expiryDate")} placeholder="MM/AA" />
                {errors.expiryDate && (
                  <p className="text-red-500 text-xs">
                    {errors.expiryDate.message}
                  </p>
                )}
                <Input {...register("cvv")} placeholder="CVV" />
                {errors.cvv && (
                  <p className="text-red-500 text-xs">{errors.cvv.message}</p>
                )}
              </div>
              <Button type="submit" disabled={isValidating}>
                {isValidating ? (
                  <div className="flex items-center justify-center space-x-2">
                    <span className="loader h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                    <span>Validando...</span>
                  </div>
                ) : (
                  "Validar Cartão"
                )}
              </Button>
            </form>
          )}

          {((data.paymentMethod === "card" && isCardValid) ||
            data.paymentMethod === "boleto" ||
            data.paymentMethod === "pix") && (
            <Button onClick={handleNext} className="w-full py-3 mt-4">
              Continuar
            </Button>
          )}
        </div>

        <div className="lg:col-span-1">
          <ShowOrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            shippingCost={data.shippingCost || 0}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}
