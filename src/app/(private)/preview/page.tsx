"use client";

import React from "react";
import { useCheckout } from "@/context/CheckoutContext";
import { useCart } from "@/context/CartContext";
import { ShowOrderSummary } from "@/components/ShowOrderSummary";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PreviewPage() {
  const { data, resetCheckout } = useCheckout();
  const { cartItems } = useCart();
  const router = useRouter();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = data.shippingCost || 0;
  const total = subtotal + shipping;

  const handleConfirmOrder = () => {
    router.push("/statusPayment");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Resumo do Pedido</h1>

      <Card>
        <CardHeader>
          <CardTitle>Endereço de Entrega</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {data.addressData ? (
            <>
              <p>
                <strong>Nome:</strong> {data.addressData.name}
              </p>
              <p>
                <strong>Email:</strong> {data.addressData.email}
              </p>
              <p>
                <strong>Endereço:</strong> {data.addressData.address}
              </p>
              <p>
                <strong>Cidade:</strong> {data.addressData.city}
              </p>
              <p>
                <strong>CEP:</strong> {data.addressData.cep}
              </p>
            </>
          ) : (
            <p className="text-gray-500 text-sm">Nenhum endereço informado.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pagamento</CardTitle>
        </CardHeader>
        <CardContent>
          {data.paymentMethod ? (
            <>
              <p>
                <strong>Método:</strong> {data.paymentMethod.toUpperCase()}
              </p>

              {data.paymentMethod === "card" && data.cardInfo && (
                <>
                  <p>
                    <strong>Número:</strong> **** **** ****{" "}
                    {data.cardInfo.cardNumber.slice(-4)}
                  </p>
                  <p>
                    <strong>Titular:</strong> {data.cardInfo.cardName}
                  </p>
                  <p>
                    <strong>Validade:</strong> {data.cardInfo.expiryDate}
                  </p>
                </>
              )}

              {data.paymentMethod === "boleto" && data.boletoInfo && (
                <>
                  <p>
                    <strong>Nome:</strong> {data.boletoInfo.name}
                  </p>
                  <p>
                    <strong>CPF:</strong> {data.boletoInfo.cpf}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    O boleto será gerado. Pagamento pode levar até 2 dias úteis
                    para ser processado.
                  </p>
                </>
              )}

              {data.paymentMethod === "pix" && (
                <>
                  <p>
                    <strong>Chave PIX:</strong> mock@checkout.com
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Escaneie o QR Code que será exibido para concluir o
                    pagamento.
                  </p>
                </>
              )}
            </>
          ) : (
            <p className="text-gray-500 text-sm">Nenhum método selecionado.</p>
          )}
        </CardContent>
      </Card>

      <ShowOrderSummary
        cartItems={cartItems}
        subtotal={subtotal}
        shippingCost={shipping}
        total={total}
      />

      <Button
        className="w-full py-3 mt-4 bg-green-600 hover:bg-green-700"
        onClick={handleConfirmOrder}
      >
        Confirmar Pedido
      </Button>
    </div>
  );
}
