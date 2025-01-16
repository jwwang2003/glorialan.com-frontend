import { getBaseHostname } from "@/lib/environment";
import { NextResponse } from "next/server"

export function GET() {
  return NextResponse.redirect(new URL("/"));
}