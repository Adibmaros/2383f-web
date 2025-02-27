// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Mengambil nilai dari cookie auth
  const authCookie = request.cookies.get("auth_user")?.value;

  // Parse cookie untuk memeriksa status autentikasi
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

  const isLoginPage = request.nextUrl.pathname === "/login";
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

  // Jika user tidak authenticated dan mencoba akses dashboard
  if (!isAuthenticated && isDashboardPage) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Jika user sudah authenticated dan mencoba akses login
  if (isAuthenticated && isLoginPage) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

// Konfigurasi halaman yang terkena middleware
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
