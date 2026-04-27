import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userId = request.cookies.get('user_id');
  const isLoginPage = request.nextUrl.pathname === '/login';

  // Jika tidak ada user_id dan bukan di halaman login, redirect ke login
  if (!userId && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Jika sudah ada user_id dan di halaman login, redirect ke dashboard
  if (userId && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

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
    '/',
    '/login',
    '/create/:path*',
    '/approval/:path*',
    '/archive/:path*',
    '/admin/:path*',
  ],
};
