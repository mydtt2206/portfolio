import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  if (pathname === '/vi' || pathname === '/en') {
    const locale = pathname.replace('/', '')
    
    const response = NextResponse.redirect(new URL('/', request.url))
    
    response.cookies.set('i18next', locale, {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    })
    
    response.cookies.set('i18nextLng', locale, {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    })
    
    return response
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/vi', '/en'],
}