import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });
    console.log("from middleware", token);

    const path = req.nextUrl.pathname;

    const isPublicPath = path === "/login" || path === "/signup";
    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    if (!token && isPublicPath) {
        return NextResponse.next();
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        "/login",
        "/signup",
        "/about",
    ],
};