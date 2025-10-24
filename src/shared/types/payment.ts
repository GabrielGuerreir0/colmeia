export type PaymentMethod = "pix" | "card" | "boleto" | "";

export interface BoletoInfo {
  name: string;
  cpf: string;
}

export interface CardInfo {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

export interface CheckoutData {
  addressData?: {
    name: string;
    email: string;
    address: string;
    city: string;
    cep: string;
  } | null;
  paymentMethod: PaymentMethod | undefined;
  cardInfo?: CardInfo;
  boletoInfo?: BoletoInfo;
  shippingCost?: number;
  OrderStatus?: OrderStatus;
}
export type OrderStatus =
  | "inicial"
  | "processando"
  | "pago"
  | "falhado"
  | "expirado";
