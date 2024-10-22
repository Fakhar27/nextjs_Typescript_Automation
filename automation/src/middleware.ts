// middleware.ts
import { auth } from "./auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  console.log("ROUTE: ", req.nextUrl.pathname)
  const isAuthPage = req.nextUrl.pathname.startsWith('/login') || 
                    req.nextUrl.pathname.startsWith('/signup')
  const isPublicRoute = req.nextUrl.pathname.startsWith('/api/') || 
                       req.nextUrl.pathname.startsWith('/_next') ||
                       req.nextUrl.pathname === '/favicon.ico'

  if (!isLoggedIn && !isAuthPage && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  return NextResponse.next()
})

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
      ],
}


// export { auth as middleware } from "@/auth"
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL('/home', request.nextUrl))
// }

// export const config = {
//   matcher: '/about/:path*',
// }
