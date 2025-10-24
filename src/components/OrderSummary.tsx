"use client";

import { OrderSummaryProps } from "@/shared/types/cart";
import { OrderSummaryContent } from "./OrderSummaryContent";

export function OrderSummary(props: OrderSummaryProps) {
  return (
    <div className="lg:sticky lg:top-20 bg-white border rounded-2xl shadow-lg p-6 h-fit flex flex-col gap-4">
      <OrderSummaryContent {...props} />
    </div>
  );
}
