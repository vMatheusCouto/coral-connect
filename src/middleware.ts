import { type NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decrypt } from './app/lib/session'

export default async function middleware(req: NextRequest) {
    const protectedRoutes = ['/article/id']
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)

    if (isProtectedRoute) {
        const cookie = cookies().get('section')?.value
        const session = await decrypt(cookie)

        if(!session?.userId) {
            return NextResponse.redirect(new URL('/auth/register', req.nextUrl))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image).*)'],
}