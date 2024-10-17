import { NextResponse } from "next/server"

import { connectToMongoDB } from "@/app/_lib/mongodb";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request, response: NextResponse) {
  const { database } = await connectToMongoDB();

  const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);
  const results = await collection.find({})
  .project({
      "grades": 0,
      "borough": 0,
      "restaurant_id": 0
  })
  .limit(10).toArray();
  return Response.json(results);
}