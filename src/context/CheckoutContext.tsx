"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { CheckoutData } from "@/shared/types/payment";

interface CheckoutContextType {
  data: CheckoutData;
  setCheckoutData: (newData: Partial<CheckoutData>) => void;
  resetCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<CheckoutData>({
    addressData: null,
    shippingCost: 0,
    paymentMethod: undefined,
    OrderStatus: "inicial",
  });

  const setCheckoutData = (newData: Partial<CheckoutData>) => {
    setData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const resetCheckout = () => {
    setData({
      addressData: null,
      shippingCost: 0,
      paymentMethod: undefined,
      OrderStatus: "inicial",
    });
  };

  return (
    <CheckoutContext.Provider value={{ data, setCheckoutData, resetCheckout }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};
