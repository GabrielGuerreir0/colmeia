import { Cart } from "@/shared/types/cart";
import { mockProducts } from "@/shared/mock/products";

export const mockCart: Cart = {
  id: "cart1",
  items: [
    {
      product: mockProducts[0],
      quantity: 2,
    },
    {
      product: mockProducts[1],
      quantity: 1,
    },
  ],
  total: mockProducts[0].price * 2 + mockProducts[1].price,
};
