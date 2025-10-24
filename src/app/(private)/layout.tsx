"use client";

import { PrivateLayoutProps } from "@/shared/types/layout";

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return <div className="container mx-auto p-6 lg:p-10">{children}</div>;
}
