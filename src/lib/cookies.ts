import Cookies from "js-cookie";
export function setAuthToken(token: string) {
  Cookies.set("authToken", token, { expires: 7 });
}

export function removeAuthToken() {
  Cookies.remove("authToken");
}

export function getAuthToken() {
  return Cookies.get("authToken");
}
