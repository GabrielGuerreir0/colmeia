"use client";

import { BuyCard } from "@/components/BuyCard";
import { OrderSummaryContent } from "@/components/OrderSummaryContent";
import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";
import { usePayment } from "@/context/PaymentContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cartItems } = useCart();
  const { data } = useCheckout();
  const shippingCost = data.shippingCost;
  const { method } = usePayment();
  const router = useRouter();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const total = subtotal + (shippingCost ?? 0);

  const handleCheckout = () => router.push("/checkout");

  if (cartItems.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-10">
        Seu carrinho está vazio.
      </p>
    );
  }

  return (
    <div className="container mx-auto p-6 lg:p-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Carrinho</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-4 max-h-[75vh] overflow-y-auto pr-2">
          {cartItems.map((item) => (
            <BuyCard key={item.product.id} item={item} />
          ))}
        </div>

        <OrderSummaryContent
          cartItems={cartItems}
          subtotal={subtotal}
          shippingCost={shippingCost}
          total={total}
          method={method}
          showCheckoutButton
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
}
