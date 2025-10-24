"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { PaymentMethod } from "./CheckoutContext";

interface PaymentContextType {
  method: PaymentMethod;
  setMethod: (method: PaymentMethod) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [method, setMethod] = useState<PaymentMethod>("");

  return (
    <PaymentContext.Provider value={{ method, setMethod }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context)
    throw new Error("usePayment must be used within PaymentProvider");
  return context;
};
