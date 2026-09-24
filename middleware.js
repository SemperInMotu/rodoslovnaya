import { NextResponse } from 'next/server';
import { BEL_ORIGIN, COM_ORIGIN, isBelHost } from './lib/hosts';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/_next') || pathname.startsWith('/assets')) return NextResponse.next();

  const bel = isBelHost(request.headers.get('host'));
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  if (bel && (pathname === '/en' || pathname.startsWith('/en/'))) {
    const rest = pathname.replace(/^\/en/, '') || '/';
    return NextResponse.redirect(new URL(rest, COM_ORIGIN));
  }

  if (!bel && (pathname === '/ru' || pathname.startsWith('/ru/'))) {
    return NextResponse.redirect(new URL(pathname, BEL_ORIGIN));
  }

  if (!bel && (pathname === '/en' || pathname.startsWith('/en/'))) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en/, '') || '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|assets/).*)'],
};
