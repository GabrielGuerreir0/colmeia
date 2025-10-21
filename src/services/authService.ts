import { setAuthToken } from "@/lib/cookies";
import { mockUsers } from "@/mock/users";

export async function authenticateUser(email: string, password: string) {
  const user = mockUsers.find(
    (user) => user.email === email && user.password === password
  );
  if (!user) throw new Error("Usuário ou senha inválidos.");

  const SimulatedToken = "Token";
  setAuthToken(SimulatedToken);
  return { email: user.email, name: user.name, token: SimulatedToken };
}
