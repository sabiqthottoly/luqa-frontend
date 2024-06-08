import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Helper function to parse cookies
function parseCookies(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie')
  if (!cookieHeader) return {}
  return Object.fromEntries(cookieHeader.split('; ').map(c => {
    const [key, ...v] = c.split('=')
    return [key, v.join('=')]
  }))
}

export function middleware(request: NextRequest) {

  const cookies = parseCookies(request)
  const token = cookies['accessToken']

  // Determine if the request is for a protected route or the login page
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard')
  const isLoginPage = request.nextUrl.pathname === '/login'

  // If the user is not authenticated and is trying to access a protected route, redirect to /login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If the user is authenticated and is trying to access the login page, redirect to the previous page or /dashboard
  if (isLoginPage && token) {
    const redirectUrl = request.nextUrl.searchParams.get('from') || '/dashboard'
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  }

  // If the token is valid or the user is accessing a public route, continue with the request
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}
