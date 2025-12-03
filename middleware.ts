import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware for protecting routes
 * 
 * This middleware runs before route handlers and can redirect
 * unauthenticated users trying to access protected routes.
 * 
 * CURRENT IMPLEMENTATION: Checks for auth-token in localStorage (client-side only)
 * 
 * FOR PRODUCTION WITH HTTPONLY COOKIES:
 * 1. Enable this middleware by uncommenting the code below
 * 2. Verify JWT tokens server-side using jsonwebtoken
 * 3. Use request.cookies.get('auth-token') instead of localStorage
 * 4. Add proper token validation and expiration checks
 */

export function middleware(request: NextRequest) {
  // NOTE: Since we're using localStorage for tokens, we can't validate server-side
  // The dashboard page itself handles the redirect on the client
  // 
  // If you switch to HttpOnly cookies, uncomment this:
  /*
  const token = request.cookies.get('auth-token')
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }
  */

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
