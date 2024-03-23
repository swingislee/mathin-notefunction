import { NextResponse, NextRequest } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages, cookieName } from '@/lib/i18n/settings'
import authConfig from './auth.config'
import NextAuth from 'next-auth'
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes, 
  publicRoutes, 
} from "@/routes"

const { auth } = NextAuth(authConfig)

acceptLanguage.languages(languages)

export const config = {
  // matcher: '/:lng*'
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}

export default auth((req) => {
  const { nextUrl } = req;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  const isLoggedIn = !!req.auth; // Call the auth function with the current request
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  //if (req.nextUrl.pathname.indexOf('icon') > -1 || req.nextUrl.pathname.indexOf('chrome') > -1) return NextResponse.next()
  let lng: string | undefined | null
  if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName)?.value)
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
  if (!lng) lng = fallbackLng


  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL(`/${lng}`, req.url));
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(`/${lng}${DEFAULT_LOGIN_REDIRECT}`, nextUrl) )
    }
    return NextResponse.next()
  }

  if (!isLoggedIn){ 
    if(isPublicRoute){
      if (
        !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) 
      ) {
        return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url))
      }
      return NextResponse.next()
    }    
    return Response.redirect(new URL(`/${lng}/auth/login`, nextUrl))
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') || '')
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
    const response = NextResponse.next()
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
    return response
  }

  return NextResponse.next()
})
