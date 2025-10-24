"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShowOrderSummary } from "@/components/ShowOrderSummary";
import { AddressForm, CheckoutFormValues } from "@/shared/types/forms";

export default function CheckoutPage() {
  const { data, setCheckoutData } = useCheckout();
  const { cartItems } = useCart();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = 15;
  const total = subtotal + shipping;

  const onSubmit = (formData: CheckoutFormValues) => {
    const addressData: AddressForm = {
      name: formData.fullName,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      cep: formData.postalCode,
    };

    setCheckoutData({ addressData, shippingCost: shipping });
    router.push("/payment");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Endereço de Entrega</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Nome completo</Label>
                <Input
                  {...register("fullName", { required: "Nome obrigatório" })}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  {...register("email", { required: "Email obrigatório" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label>Endereço</Label>
              <Input
                {...register("address", { required: "Endereço obrigatório" })}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Cidade</Label>
                <Input
                  {...register("city", { required: "Cidade obrigatória" })}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div>
                <Label>CEP</Label>
                <Input
                  {...register("postalCode", { required: "CEP obrigatório" })}
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full py-3">
              Continuar
            </Button>
          </form>
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
