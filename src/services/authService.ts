import { mockUserCarts } from "@/shared/mock/userCart";
import { mockUsers } from "@/shared/mock/users";
import { Cart } from "@/shared/types/cart";
import type {
  AuthenticatedUser,
  RegisterUser,
  User,
} from "@/shared/types/users";

export async function registerUser(
  userData: RegisterUser
): Promise<AuthenticatedUser> {
  const existingUser = mockUsers.find((u) => u.email === userData.email);
  if (existingUser) {
    throw new Error("E-mail já cadastrado");
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    email: userData.email,
    password: userData.password,
    name: userData.name,
  };
  mockUsers.push(newUser);

  const newCart: Cart = {
    id: `cart_${newUser.id}`,
    items: [],
    total: 0,
  };
  mockUserCarts.push({
    user: newUser,
    cart: newCart,
  });

  const token = "TokenSimulado";

  return {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    token,
  };
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<AuthenticatedUser> {
  const user = mockUsers.find((u) => u.email === email);
  if (!user) throw new Error("Usuário não encontrado");
  if (user.password !== password) throw new Error("Senha incorreta");

  const token = "TokenSimulado";
  return { id: user.id, email: user.email, name: user.name, token };
}
