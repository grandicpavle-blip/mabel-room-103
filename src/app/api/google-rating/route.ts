import { NextResponse } from "next/server";
import { fetchGoogleReviews } from "@/lib/fetch-google-reviews";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await fetchGoogleReviews("sr");
  return NextResponse.json({
    rating: data.rating,
    count: data.count,
    source: data.source,
    updatedAt: data.updatedAt,
  });
}
