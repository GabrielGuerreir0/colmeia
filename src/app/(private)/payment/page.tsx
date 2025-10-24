"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCheckout } from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";
import { ShowOrderSummary } from "@/components/ShowOrderSummary";
import { useCart } from "@/context/CartContext";
import type {
  CardInfo,
  BoletoInfo,
  PaymentMethod,
} from "@/shared/types/payment";

// 🔹 Validação com Zod
const cardSchema = z.object({
  cardNumber: z.string().min(16, "Número do cartão deve ter 16 dígitos"),
  cardName: z.string().min(2, "Nome do titular é obrigatório"),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, "Formato MM/AA"),
  cvv: z.string().min(3, "Insira um CVV válido").max(3, "CVV inválido"),
});

const boletoSchema = z.object({
  name: z.string().min(2, "Nome do comprador é obrigatório"),
  cpf: z
    .string()
    .regex(/^\d{11}$/, "CPF deve conter exatamente 11 dígitos numéricos"),
});

type CardFormValues = z.infer<typeof cardSchema>;
type BoletoFormValues = z.infer<typeof boletoSchema>;

export default function PaymentPage() {
  const { data, setCheckoutData } = useCheckout();
  const { cartItems } = useCart();
  const router = useRouter();

  // 🔹 Cálculo de valores
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = 15;
  const total = subtotal + shipping;

  const [isCardValid, setIsCardValid] = useState<boolean | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const {
    register: registerCard,
    handleSubmit: handleSubmitCard,
    formState: { errors: cardErrors },
    reset: resetCard,
  } = useForm<CardFormValues>({ resolver: zodResolver(cardSchema) });

  const {
    register: registerBoleto,
    handleSubmit: handleSubmitBoleto,
    formState: { errors: boletoErrors },
    reset: resetBoleto,
  } = useForm<BoletoFormValues>({ resolver: zodResolver(boletoSchema) });

  const handleCardSubmit = (cardData: CardFormValues) => {
    setIsValidating(true);
    setIsCardValid(null);

    setTimeout(() => {
      const isValid = cardData.cardNumber.startsWith("4");
      setIsCardValid(isValid);

      if (isValid) {
        setCheckoutData({
          paymentMethod: "card",
          cardInfo: cardData as CardInfo,
        });
      }

      setIsValidating(false);
    }, 2000);
  };

  const handleBoletoSubmit = (boletoData: BoletoFormValues) => {
    setCheckoutData({
      paymentMethod: "boleto",
      boletoInfo: boletoData as BoletoInfo,
    });
    router.push("/preview");
  };

  const handleSelectPayment = (method: PaymentMethod) => {
    setCheckoutData({ paymentMethod: method });
    setIsCardValid(null);
    resetCard();
    resetBoleto();
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
              onSubmit={handleSubmitCard(handleCardSubmit)}
              className="space-y-4 mt-4 p-4 border rounded-lg bg-gray-50"
            >
              <Input
                {...registerCard("cardNumber")}
                placeholder="Número do cartão"
                inputMode="numeric"
                aria-label="Número do cartão"
              />
              {cardErrors.cardNumber && (
                <p className="text-red-500 text-xs">
                  {cardErrors.cardNumber.message}
                </p>
              )}

              <Input
                {...registerCard("cardName")}
                placeholder="Nome do titular"
                aria-label="Nome do titular"
              />
              {cardErrors.cardName && (
                <p className="text-red-500 text-xs">
                  {cardErrors.cardName.message}
                </p>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Input
                  {...registerCard("expiryDate")}
                  placeholder="MM/AA"
                  aria-label="Validade"
                />
                <Input
                  {...registerCard("cvv")}
                  placeholder="CVV"
                  inputMode="numeric"
                  aria-label="CVV"
                />
              </div>
              {cardErrors.expiryDate && (
                <p className="text-red-500 text-xs">
                  {cardErrors.expiryDate.message}
                </p>
              )}
              {cardErrors.cvv && (
                <p className="text-red-500 text-xs">{cardErrors.cvv.message}</p>
              )}

              <Button
                type="submit"
                disabled={isValidating || isCardValid === true}
              >
                {isValidating ? (
                  <div className="flex items-center justify-center space-x-2">
                    <span className="loader h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                    <span>Validando...</span>
                  </div>
                ) : (
                  "Validar Cartão"
                )}
              </Button>

              {isCardValid !== null && (
                <p
                  className={`mt-2 font-medium ${
                    isCardValid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isCardValid ? "Cartão válido" : "Cartão inválido"}
                </p>
              )}
            </form>
          )}

          {data.paymentMethod === "boleto" && (
            <form
              onSubmit={handleSubmitBoleto(handleBoletoSubmit)}
              className="space-y-4 mt-4 p-4 border rounded-lg bg-gray-50"
            >
              <Input
                {...registerBoleto("name")}
                placeholder="Nome do comprador"
                aria-label="Nome do comprador"
              />
              {boletoErrors.name && (
                <p className="text-red-500 text-xs">
                  {boletoErrors.name.message}
                </p>
              )}

              <Input
                {...registerBoleto("cpf")}
                placeholder="CPF (somente números)"
                inputMode="numeric"
                aria-label="CPF do comprador"
              />
              {boletoErrors.cpf && (
                <p className="text-red-500 text-xs">
                  {boletoErrors.cpf.message}
                </p>
              )}

              <Button
                type="submit"
                className="w-full py-3 mt-4 bg-blue-600 text-white hover:bg-blue-700"
              >
                Gerar Boleto
              </Button>
            </form>
          )}

          {((data.paymentMethod === "card" && isCardValid) ||
            data.paymentMethod === "pix") && (
            <Button
              onClick={handleNext}
              className={`w-full py-3 mt-4 ${
                data.paymentMethod === "card" && !isCardValid
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              disabled={data.paymentMethod === "card" && !isCardValid}
            >
              Continuar
            </Button>
          )}
        </div>

        {/* 🔹 COLUNA RESUMO */}
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
