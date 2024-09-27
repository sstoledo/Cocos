import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware({redirect,url,cookies,nextUrl}: NextRequest) {
  
  //GET TOKEN-COOKIES
  const token = cookies.get("authToken")?.value;

}
 

// export const config = {
//   matcher: ["/dashboard/*"],
// }