import { NextResponse } from "next/server";
import { fetchGoogleReviews } from "@/lib/fetch-google-reviews";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") === "en" ? "en" : "sr";
  const data = await fetchGoogleReviews(lang);
  return NextResponse.json(data);
}
