import type { Metadata } from "next";
import "../styles/globals.css";

import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { PaymentProvider } from "@/context/PaymentContext";
import { Footer } from "@/components/Footer";
import { SidebarCartWrapper } from "@/components/SidebarCartWrapper";

export const metadata: Metadata = {
  title: "Mock Checkout",
  description: "Mock Checkout Flow with Sample Data",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        <UserProvider>
          <CartProvider>
            <CheckoutProvider>
              <PaymentProvider>
                <SidebarCartWrapper>
                  {children}
                  <Footer />
                </SidebarCartWrapper>
              </PaymentProvider>
            </CheckoutProvider>
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
