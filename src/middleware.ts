import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Redirect root path to /intro
  // if (request.nextUrl.pathname === "/") {
  //   return NextResponse.redirect(new URL("/intro", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
