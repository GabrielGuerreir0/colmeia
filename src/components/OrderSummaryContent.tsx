"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { OrderSummaryContentProps } from "@/shared/types/cart";

export function OrderSummaryContent({
  cartItems,
  subtotal,
  shippingCost,
  total,
  method,
  showCheckoutButton,
  onCheckout,
}: OrderSummaryContentProps) {
  return (
    <Card className="p-4 space-y-4">
      <CardHeader className="p-0">
        <CardTitle className="text-xl font-semibold  mb-2 text-[#11286b]">
          Resumo do Pedido
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 space-y-2 text-gray-700">
        {cartItems.map((item) => (
          <div key={item.product.id} className="flex justify-between">
            <span className="text-[#11286b]">
              {item.product.name} x {item.quantity}
            </span>
            <span>R$ {(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        <div className="flex justify-between border-t pt-2 font-medium text-[#11286b]">
          <span>Subtotal</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>

        {(shippingCost ?? 0) > 0 && (
          <>
            <div className="flex justify-between">
              <span>Frete</span>
              <span>R$ {(shippingCost ?? 0).toFixed(2)}</span>
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

      {showCheckoutButton && (
        <CardFooter className="p-0">
          <Button
            className="w-full py-3  text-white rounded-xl transition-all duration-200 bg-[#11286b] hover:bg-[#ffbd00] hover:text-[#11286b] cursor-pointer"
            onClick={onCheckout}
          >
            Pagar Agora
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
