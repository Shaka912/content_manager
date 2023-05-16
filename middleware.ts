import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import jwt from 'jsonwebtoken'

import user from './models/user'
import jwt_decode from "jwt-decode";
import axios from 'axios'
export default async function middleware(request: NextRequest, res:NextResponse) {
   
    const url = request.nextUrl.clone()
    let isLoggedin = request.cookies.get('Set-Cookie')
  
       try {
        const currentTime = new Date().getTime() / 1000;
          if(!isLoggedin){
        if (url.pathname === "/"|| request.nextUrl.pathname.startsWith('/create') ) {
           //return NextResponse.rewrite(new URL('/login', request.url))
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
        const decodedToken:any = jwt_decode(isLoggedin.value);
        // console.log(decodedToken)
        // console.log(currentTime)
       // const verify:any = jwt.verify(isLoggedin.value, process.env.REFRESH_TOKEN_SECRET as string);
       // console.log(verify)
        if (decodedToken.exp < currentTime) {
            axios.get('api/auth/logout').then((res)=>{
                console.log("successfully logged out")
                return NextResponse.redirect(new URL('/login', request.url))
            }).catch((err)=>{
                console.log(err)
                return NextResponse.redirect(new URL('/login', request.url))
            
            })
        } else {
            if(url.pathname === "/login"){
                        return NextResponse.redirect(new URL('/', request.url))
               }
        }
       } catch (error) {
        console.log(error)
       }
}