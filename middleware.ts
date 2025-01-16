import { NextResponse, type NextRequest } from "next/server";
import { apiRequest } from "./app/_lib/api";
import { PROTECTED_ROUTES } from "./protected";
import { redirect } from "next/dist/server/api-utils";

export async function middleware(request: NextRequest) {
  //////////////////////////////////////////////////////////////////////////////
  //////////                   Authentication Logic                   //////////
  //////////////////////////////////////////////////////////////////////////////

  if (request.nextUrl.pathname.startsWith('/logout')) {
    // Handles logout logic by removing session cookies
    // const response = NextResponse.next();
    // response.cookies.delete('connect.sid');
    // return response;
    return Response.redirect(new URL("/"));
  }

  // Next comes session management
  // Session ID is stored in a cookie called connect.sid
  const currentSession: string | undefined = request.cookies.get('connect.sid')?.value;

  const currentPath = request.nextUrl.pathname;
  const matchingEntry = Object.entries(PROTECTED_ROUTES).find(([route]) =>
    currentPath.startsWith(route),
  );

  if (matchingEntry && currentSession) {
    const cookieHeader = request.headers.get('cookie') || '';
    const result = await apiRequest<{
      uuid: string,
      name: string,
      username: string,
      role: number[],
      special_privledges: string[]
    }>(
      'auth/retrieve_cookie',
      {
        headers: {
          // Pass along the cookies from the original request
        cookie: cookieHeader,
        },
        method: "GET",
      }
    );

    if(result.data) {
      const role = result.data.role[0];
      // If the path is protected, ensure the user's role is in the allowed list
      const [_, allowedRoles] = matchingEntry; // e.g. ['/admin', ['admin']]
      if (!allowedRoles.includes(role)) {
        // If role not allowed, redirect to login or a 403 page
        console.log(currentPath)
        return NextResponse.redirect(new URL(`/login?redirect=${currentPath}`, request.url));
      }
    }
  }

  if (currentSession && request.nextUrl.pathname.startsWith('/login')) {
    // Deny any request for /login is a user is already logged in
    return NextResponse.redirect(new URL('/profile', request.url))
  }

  // Handling protected routes
  if (!currentSession && matchingEntry) {
    return Response.redirect(new URL(`/login?redirect=${currentPath}`, request.url));
  }

  // If everything goes smoothly
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
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
    },
  ],
}