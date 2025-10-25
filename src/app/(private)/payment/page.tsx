"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = 15;
  const total = subtotal + shipping;

  const [isCardValid, setIsCardValid] = useState<boolean | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const cardForm = useForm<CardFormValues>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const boletoForm = useForm<BoletoFormValues>({
    resolver: zodResolver(boletoSchema),
    defaultValues: {
      name: "",
      cpf: "",
    },
  });

  const handleCardSubmit = (cardData: CardFormValues) => {
    setIsValidating(true);
    setIsCardValid(null);

    setTimeout(() => {
      const isValid = ["3", "4", "5", "6"].some((digit) =>
        cardData.cardNumber.startsWith(digit)
      );
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
    cardForm.reset();
    boletoForm.reset();
  };

  const handleNext = () => router.push("/preview");

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-[#11286b]">
        Escolha o Método de Pagamento
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <RadioGroup
            value={data.paymentMethod ?? ""}
            onValueChange={handleSelectPayment}
            className="space-y-2"
          >
            {["card", "boleto", "pix"].map((method) => (
              <div
                key={method}
                className="flex items-center space-x-2 text-[#11286b]"
              >
                <RadioGroupItem value={method} id={method} />
                <Label htmlFor={method}>
                  {method === "card"
                    ? "Cartão de Crédito"
                    : method === "boleto"
                    ? "Boleto"
                    : "PIX"}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {data.paymentMethod === "card" && (
            <form
              onSubmit={cardForm.handleSubmit(handleCardSubmit)}
              className="space-y-4 mt-4 p-4 border rounded-lg bg-gray-50"
            >
              <Controller
                control={cardForm.control}
                name="cardNumber"
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      placeholder="Número do cartão"
                      inputMode="numeric"
                    />
                    {cardForm.formState.errors.cardNumber && (
                      <p className="text-red-500 text-xs mt-1">
                        {cardForm.formState.errors.cardNumber?.message}
                      </p>
                    )}
                  </>
                )}
              />

              <Controller
                control={cardForm.control}
                name="cardName"
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      placeholder="Nome do titular"
                    />
                    {cardForm.formState.errors.cardName && (
                      <p className="text-red-500 text-xs mt-1">
                        {cardForm.formState.errors.cardName?.message}
                      </p>
                    )}
                  </>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <Controller
                  control={cardForm.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Validade (MM/AA)"
                      />
                      {cardForm.formState.errors.expiryDate && (
                        <p className="text-red-500 text-xs mt-1">
                          {cardForm.formState.errors.expiryDate?.message}
                        </p>
                      )}
                    </>
                  )}
                />
                <Controller
                  control={cardForm.control}
                  name="cvv"
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="CVV"
                        inputMode="numeric"
                      />
                      {cardForm.formState.errors.cvv && (
                        <p className="text-red-500 text-xs mt-1">
                          {cardForm.formState.errors.cvv?.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>

              <Button
                className="bg-[#11286b] hover:text-[#11286b] hover:bg-[#ffbd00] cursor-pointer"
                type="submit"
                disabled={isValidating || isCardValid === true}
              >
                {isValidating ? "Validando..." : "Validar Cartão"}
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
              onSubmit={boletoForm.handleSubmit(handleBoletoSubmit)}
              className="space-y-4 mt-4 p-4 border rounded-lg bg-gray-50"
            >
              <Controller
                control={boletoForm.control}
                name="name"
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      placeholder="Nome do comprador"
                    />
                    {boletoForm.formState.errors.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {boletoForm.formState.errors.name?.message}
                      </p>
                    )}
                  </>
                )}
              />

              <Controller
                control={boletoForm.control}
                name="cpf"
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      placeholder="CPF (somente números)"
                      inputMode="numeric"
                    />
                    {boletoForm.formState.errors.cpf && (
                      <p className="text-red-500 text-xs mt-1">
                        {boletoForm.formState.errors.cpf?.message}
                      </p>
                    )}
                  </>
                )}
              />

              <Button
                type="submit"
                className="w-full py-3 mt-4 text-white bg-[#11286b] hover:text-[#11286b] hover:bg-[#ffbd00] cursor-pointer"
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
                  : "bg-[#11286b] hover:text-[#11286b] hover:bg-[#ffbd00] cursor-pointer"
              }`}
              disabled={data.paymentMethod === "card" && !isCardValid}
            >
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
