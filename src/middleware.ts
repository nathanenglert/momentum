import { NextResponse } from "next/server"

// Reference: https://github.com/vercel/next.js/issues/43704
export function middleware(request: Request) {
  const requestHeaders = new Headers(request.headers)
  const pathname = new URL(request.url).pathname

  requestHeaders.set("x-url", pathname)

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  })
}
