import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './helpers';

export async function middleware({ url, cookies, nextUrl, headers }: NextRequest) {

  //GET TOKEN-COOKIES
  const token = cookies.get("authToken")?.value;


  if (!token && nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL('/auth/login', url));
  }

  if (token && nextUrl.pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/dashboard", url));
  }

  const data = await verifyToken(token!);

  const requestHeader = new Headers(headers);
  requestHeader.set("x-user-info", JSON.stringify(data));

  return NextResponse.next({
    request: {
      headers: requestHeader
    }
  });

}

export const config = {
  matcher: ["/dashboard/:path*"],
}