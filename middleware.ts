import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentSession = request.cookies.get('session')?.value;

  // Authentication logic
  if (request.nextUrl.pathname.startsWith('/logout')) {
    // Handles logout logic by removing session cookies
    const response = NextResponse.next()
    response.cookies.delete('session');
    return response;
  }

  if (currentSession && request.nextUrl.pathname.startsWith('/login')) {
    // Deny any request for /login is a user is already logged in
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Handling protected routes
  if (!currentSession && request.nextUrl.pathname.startsWith('/secret')) {
    return Response.redirect(new URL('/login', request.url));
  }
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