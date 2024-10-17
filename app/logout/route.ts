import { NextResponse } from "next/server"

export function GET(req: Request) {
  return NextResponse.redirect(new URL('/', req.url));
}