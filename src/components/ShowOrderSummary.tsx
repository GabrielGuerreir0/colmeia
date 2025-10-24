"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShowOrderSummaryProps } from "@/shared/types/cart";

export function ShowOrderSummary({
  cartItems,
  subtotal,
  shippingCost,
  total,
  method,
}: ShowOrderSummaryProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Resumo do Pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {cartItems.map((item) => (
          <div key={item.product.id} className="flex justify-between">
            <span>
              {item.product.name} x {item.quantity}
            </span>
            <span>R$ {(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        <div className="flex justify-between border-t pt-2 font-medium">
          <span>Subtotal</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>

        {shippingCost > 0 && (
          <>
            <div className="flex justify-between">
              <span>Frete</span>
              <span>R$ {shippingCost.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-bold text-lg border-t pt-3">
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </>
        )}

        {method && (
          <div className="mt-2 text-sm text-gray-600">
            Forma de pagamento: <span className="font-medium">{method}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
