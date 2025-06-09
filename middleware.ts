import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth_user")?.value;

  let isAuthenticated = false;
  try {
    if (authCookie) {
      const authData = JSON.parse(decodeURIComponent(authCookie));
      isAuthenticated = authData?.isAuthenticated === true;
    }
  } catch (error) {
    console.error("Error parsing auth cookie:", error);
    isAuthenticated = false;
  }

  const { pathname } = request.nextUrl;

  // Protected routes yang hanya bisa diakses admin
  const adminOnlyRoutes = ["/dashboard"];
  const isAdminOnlyRoute = adminOnlyRoutes.some((route) => pathname.startsWith(route));

  // Jika mengakses route admin tanpa autentikasi
  if (isAdminOnlyRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Jika sudah login dan mengakses halaman login
  if (pathname === "/login" && isAuthenticated) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Redirect root ke tamu
  if (pathname === "/") {
    const tamuUrl = new URL("/tamu", request.url);
    return NextResponse.redirect(tamuUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$).*)"],
};
