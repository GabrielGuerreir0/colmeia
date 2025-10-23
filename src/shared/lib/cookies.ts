import Cookies from "js-cookie";
import { AuthenticatedUser } from "../types/users";

export function setUser(user: AuthenticatedUser) {
  Cookies.set("user", JSON.stringify(user), { expires: 7 });
}

export function setAuthToken(token: string) {
  Cookies.set("authToken", token, { expires: 7 });
}

export function removeAuthToken() {
  Cookies.remove("authToken");
}
export function removeUser() {
  Cookies.remove("user");
}

export function getUser() {
  const user = Cookies.get("user");
  return user ? (JSON.parse(user) as AuthenticatedUser) : null;
}

export function getAuthToken() {
  return Cookies.get("authToken");
}
