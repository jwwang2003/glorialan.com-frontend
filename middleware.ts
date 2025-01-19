import { NextResponse, type NextRequest } from "next/server";
import { apiRequest } from "./app/_lib/api";
import { getBaseHostname } from "@/_lib/environment";
import { definedPaths, findLongestProtectedMatch } from "./paths"; 

// (Wherever you placed the 'findLongestProtectedMatch' function)

export async function middleware(request: NextRequest) {
  //////////////////////////////////////////////////////////////////////////////
  //////////                   Authentication Logic                   //////////
  //////////////////////////////////////////////////////////////////////////////
  const currentPath = request.nextUrl.pathname;
  const currentSession: string | undefined = request.cookies.get("connect.sid")
    ?.value;

  if (currentPath.startsWith("/logout")) {
    // Handle logout by removing session cookie
    const response = NextResponse.next();
    response.cookies.delete("connect.sid");
    return response;
  }

  // If a user is already logged in, block access to /login
  if (currentSession && currentPath.startsWith("/login")) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // Check if this path is protected by searching the definedPaths tree
  const protectedNode = findLongestProtectedMatch(definedPaths, currentPath);

  // If there is a protectedNode, we must ensure the user is logged in + has the right role
  if (protectedNode) {
    // If not logged in at all, redirect
    if (!currentSession) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${currentPath}`, request.url)
      );
    }

    // If logged in, retrieve the user's role from the backend
    // (the same logic you had before)
    const cookieHeader = request.headers.get("cookie") || "";
    const result = await apiRequest<{
      uuid: string;
      name: string;
      username: string;
      role: number[];
      special_privledges: string[];
    }>("auth/retrieve_cookie", {
      headers: { cookie: cookieHeader },
      method: "GET",
    });

    if (result.data) {
      const userRole = result.data.role[0];
      const allowedRoles = protectedNode.protection; 
      // e.g. [ROLES.ADMIN] or [ROLES.ADMIN, ROLES.USER]

      if (allowedRoles && !allowedRoles.includes(userRole)) {
        // If role not allowed, redirect to login or a 403 page
        return NextResponse.redirect(
          new URL(`/login?redirect=${currentPath}`, request.url)
        );
      }
    } else {
      // If we couldn't retrieve user data for some reason, redirect to login
      return NextResponse.redirect(
        new URL(`/login?redirect=${currentPath}`, request.url)
      );
    }
  }

  // If the path was not protected or everything is valid, allow it
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
    },
  ],
};
