import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [
  { path: "/login", whenAuthenticated: "redirect" },
  { path: "/", whenAuthenticated: "no-redirect" },
  { path: "/logo.png", whenAuthenticated: "no-redirect" },
  { path: "/tenis.jpg", whenAuthenticated: "no-redirect" },
  { path: "/camiseta.jpg", whenAuthenticated: "no-redirect" },
  { path: "/garrafa.jpg", whenAuthenticated: "no-redirect" },
  { path: "/mochila.jpg", whenAuthenticated: "no-redirect" },
  { path: "/fone.jpg", whenAuthenticated: "no-redirect" },
  { path: "/tapete.jpg", whenAuthenticated: "no-redirect" },
  { path: "/bolsaTermica.jpg", whenAuthenticated: "no-redirect" },
  { path: "/suplemento.jpg", whenAuthenticated: "no-redirect" },
  { path: "/corda.jpg", whenAuthenticated: "no-redirect" },
  { path: "/oculosNatacao.jpg", whenAuthenticated: "no-redirect" },
  { path: "/bola.jpg", whenAuthenticated: "no-redirect" },
  { path: "/meia.jpg", whenAuthenticated: "no-redirect" },
];

const REDIRECT_WHEN_NOT_AUTHENTICATED = "/login";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get("authToken")?.value;

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
    return NextResponse.redirect(redirectUrl);
  }
  if (authToken && publicRoute?.whenAuthenticated === "redirect") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Corresponde a todas as rotas, exceto as de:
     * - api (rotas de API)
     * - _next/static (arquivos estáticos)
     * - _next/image (otimização de imagem)
     * - favicon.ico (ícone)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
