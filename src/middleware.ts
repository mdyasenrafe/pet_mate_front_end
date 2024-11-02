import { retrieveAndDecodeToken, verifyToken } from "@/utils";
import { JwtPayload } from "jwt-decode";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const roleBasedRoutes = {
  ADMIN: [/^\/dashboard\/admin/],
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const user = verifyToken(token as string) as JwtPayload & {
    role?: string;
  };
  if (user && user?.role === "ADMIN") {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/admin/:page*"],
};
