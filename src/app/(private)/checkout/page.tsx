"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShowOrderSummary } from "@/components/ShowOrderSummary";
import { AddressForm, CheckoutFormValues } from "@/shared/types/forms";
import { getUser } from "@/shared/lib/cookies";

export default function CheckoutPage() {
  const { data, setCheckoutData } = useCheckout();
  const { cartItems } = useCart();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });

  useEffect(() => {
    const user = getUser();
    if (user) {
      setValue("fullName", user.name ?? "");
      setValue("email", user.email ?? "");
    }
  }, [setValue]);

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
      <h1 className="text-3xl font-bold text-[#11286b]">Endereço de Entrega</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-[#11286b]">Nome completo</Label>
                <Controller
                  control={control}
                  name="fullName"
                  rules={{ required: "Nome obrigatório" }}
                  render={({ field }) => (
                    <Input {...field} value={field.value ?? ""} />
                  )}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-[#11286b]">Email</Label>
                <Controller
                  control={control}
                  name="email"
                  rules={{ required: "Email obrigatório" }}
                  render={({ field }) => (
                    <Input {...field} type="email" value={field.value ?? ""} />
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label className="text-[#11286b]">Endereço</Label>
              <Controller
                control={control}
                name="address"
                rules={{ required: "Endereço obrigatório" }}
                render={({ field }) => (
                  <Input {...field} value={field.value ?? ""} />
                )}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-[#11286b]">Cidade</Label>
                <Controller
                  control={control}
                  name="city"
                  rules={{ required: "Cidade obrigatória" }}
                  render={({ field }) => (
                    <Input {...field} value={field.value ?? ""} />
                  )}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-[#11286b]">CEP</Label>
                <Controller
                  control={control}
                  name="postalCode"
                  rules={{ required: "CEP obrigatório" }}
                  render={({ field }) => (
                    <Input {...field} value={field.value ?? ""} />
                  )}
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-3 hover:text-[#11286b] hover:bg-[#ffbd00] bg-[#11286b] text-[#ffbd00] cursor-pointer"
            >
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
