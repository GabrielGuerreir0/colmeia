import { User } from "./users";
import { Cart } from "./cart";

export type UserCart = {
  user: User;
  cart: Cart;
};
