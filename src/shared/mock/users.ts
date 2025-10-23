import { User } from "../types/users";

export const mockUsers: User[] = [
  {
    id: crypto.randomUUID(),
    email: "user@teste.com",
    password: "123456",
    name: "Gabriel",
  },
  {
    id: crypto.randomUUID(),
    email: "Colmeia@colmeia.com",
    password: "colmeia",
    name: "Colmeia",
  },
];
