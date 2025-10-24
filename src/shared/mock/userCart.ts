import { UserCart } from "@/shared/types/userCart";
import { mockUsers } from "@/shared/mock/users";
import { mockCart } from "@/shared/mock/cart";

export const mockUserCarts: UserCart[] = [
  {
    user: mockUsers[0],
    cart: mockCart,
  },
  {
    user: mockUsers[1],
    cart: { ...mockCart, id: "cart2", items: [] },
  },
  {
    user: mockUsers[2],
    cart: { ...mockCart, id: "cart3", items: [] },
  },
];
