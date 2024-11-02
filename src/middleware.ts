import { retrieveAndDecodeToken, verifyToken } from "@/utils";
import { JwtPayload } from "jwt-decode";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const roleBasedRoutes = {
  ADMIN: [/^\/dashboard\/admin/],
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (token) {
    const user = verifyToken(token as string) as JwtPayload & {
      role?: string;
    };
    if (user && user?.role === "admin") {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/dashboard/admin/:page*"],
};
