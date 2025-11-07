import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";

export default async function proxy(request: NextRequest){
    const token = await cookies();
    const userToken = token.get("token");
    let isVerifiedToken = undefined;
    if(userToken?.value){
     isVerifiedToken = verifyToken(userToken?.value)
    }

    if(!isVerifiedToken){
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher:["/", "/sign-in"]
}