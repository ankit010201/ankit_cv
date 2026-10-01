import { NextResponse } from "next/server";
import snapshot from "@/data/letterboxd.json";
import { fetchFeed, parseLetterboxd } from "@/lib/feeds";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const films = parseLetterboxd(
      await fetchFeed("https://letterboxd.com/ankit010201/rss/"),
    );
    if (!films.length) throw new Error("Empty feed");
    return NextResponse.json({ films, stale: false });
  } catch {
    return NextResponse.json({
      films: snapshot,
      stale: true,
      updatedAt: "2026-09-30",
    });
  }
}
