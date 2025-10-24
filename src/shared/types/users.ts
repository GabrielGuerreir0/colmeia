import { Cart } from "./cart";

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
};

export type RegisterUser = Omit<User, "id">;

export type LoginUser = Pick<User, "email" | "password">;

export type AuthenticatedUser = {
  id: string;
  email: string;
  name: string;
  token: string;
};

export type UserCart = {
  user: AuthenticatedUser | User;
  cart: Cart;
};
