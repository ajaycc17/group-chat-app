import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(request: NextRequest) {
    let token = request.cookies.get("token")?.value;
    const verifiedToken =
        token &&
        (await verifyAuth(token).catch((err) => {
            console.log(err);
        }));

    if (request.nextUrl.pathname == "/" && !verifiedToken) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.set("isLoggedIn", "false");
        return response;
    }
    if (request.nextUrl.pathname == "/signup" && verifiedToken) {
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.set("isLoggedIn", "true");
        return response;
    }
    if (request.nextUrl.pathname == "/login" && verifiedToken) {
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.set("isLoggedIn", "true");
        return response;
    }
    if (request.nextUrl.pathname == "/" && verifiedToken) {
        const response = NextResponse.next();
        response.cookies.set("isLoggedIn", "true");
        return response;
    }
}
