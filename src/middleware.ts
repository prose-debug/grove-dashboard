import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if route requires authentication
  if (pathname.startsWith('/admin')) {
    // Allow /admin/login without authentication
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for auth token in cookies
    const token = request.cookies.get('admin_token');
    if (!token) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Verify token (simple check - in production, use JWT verification)
    if (token.value !== process.env.ADMIN_TOKEN) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
