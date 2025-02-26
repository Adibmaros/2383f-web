import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Mengambil nilai dari cookie auth (opsional, untuk keamanan tambahan)
  const auth = request.cookies.get("auth_user")?.value;
  const isAuthenticated = auth ? JSON.parse(auth)?.isAuthenticated : false;

  const isLoginPage = request.nextUrl.pathname === "/login";

  // Jika user tidak authenticated dan mencoba akses halaman selain login
  if (!isAuthenticated && !isLoginPage && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Jika user sudah authenticated dan mencoba akses halaman login
  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Konfigurasi halaman mana yang terkena middleware
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
