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
      <h1 className="text-3xl font-bold text-[#11286b]">Resumo do Pedido</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#11286b]">Endereço de Entrega</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {data.addressData ? (
            <>
              <p>
                <strong className="text-[#11286b]">Nome:</strong>{" "}
                {data.addressData.name}
              </p>
              <p>
                <strong className="text-[#11286b]">Email:</strong>{" "}
                {data.addressData.email}
              </p>
              <p>
                <strong className="text-[#11286b]">Endereço:</strong>{" "}
                {data.addressData.address}
              </p>
              <p>
                <strong className="text-[#11286b]">Cidade:</strong>{" "}
                {data.addressData.city}
              </p>
              <p>
                <strong className="text-[#11286b]">CEP:</strong>{" "}
                {data.addressData.cep}
              </p>
            </>
          ) : (
            <p className="text-gray-500 text-sm">Nenhum endereço informado.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#11286b]">Pagamento</CardTitle>
        </CardHeader>
        <CardContent>
          {data.paymentMethod ? (
            <>
              <p>
                <strong className="text-[#11286b]">Método:</strong>{" "}
                {data.paymentMethod.toUpperCase()}
              </p>

              {data.paymentMethod === "card" && data.cardInfo && (
                <>
                  <p>
                    <strong className="text-[#11286b]">Número:</strong> ****
                    **** **** {data.cardInfo.cardNumber.slice(-4)}
                  </p>
                  <p>
                    <strong className="text-[#11286b]">Titular:</strong>{" "}
                    {data.cardInfo.cardName}
                  </p>
                  <p>
                    <strong className="text-[#11286b]">Validade:</strong>{" "}
                    {data.cardInfo.expiryDate}
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
                    <strong className="text-[#11286b]">Chave PIX:</strong>{" "}
                    mock@checkout.com
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
        className="w-full py-3 mt-4 bg-[#11286b] hover:text-[#11286b] hover:bg-[#ffbd00] cursor-pointer"
        onClick={handleConfirmOrder}
      >
        Confirmar Pedido
      </Button>
    </div>
  );
}
