import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_PATHS = ["/login", "/verify-otp", "/api/auth/request-otp", "/api/auth/verify-otp"];
const ADMIN_ONLY = ["/employees", "/reports", "/settings"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/public-delivery") ||
    PUBLIC_PATHS.some((publicPath) => pathname.startsWith(publicPath))
  ) {
    return NextResponse.next();
  }

  const cookieName = process.env.SESSION_COOKIE_NAME || "sai_session";
  const token = request.cookies.get(cookieName)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.SESSION_SECRET || "please-change-session-secret");
    const { payload } = await jwtVerify(token, secret);
    const role = String(payload.role ?? "employee");

    if (ADMIN_ONLY.some((route) => pathname.startsWith(route)) && role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api/uploads).*)"],
};
