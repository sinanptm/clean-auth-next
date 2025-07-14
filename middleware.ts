import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import JwtService from "@/lib/services/JwtService";

export const middleware = async (request: NextRequest) => {
  const protectedRoutes = ["/profile"];
  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  if (isProtectedRoute) {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }

    try {
      const jwtService = new JwtService();
      const decoded = await jwtService.verifyToken(token);

      if (!decoded) {
        return NextResponse.redirect(new URL("/not-found", request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/profile/:path*", "/admin/:path*"],
};
