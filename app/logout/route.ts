import { NextResponse } from "next/server"

export function GET(req: Request) {
  console.log(req.url);
  return NextResponse.redirect(new URL('http://localhost:3000'));
}