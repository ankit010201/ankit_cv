import { NextResponse } from "next/server";
import { getTopArtists } from "@/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await getTopArtists();
    if (!res.ok) throw new Error("Spotify unavailable");

    const data = await res.json();
    const artists = data.items.map((a: { name: string }) => a.name);

    return NextResponse.json({ artists });
  } catch {
    return NextResponse.json(
      { artists: [], error: "Spotify unavailable" },
      { status: 503 },
    );
  }
}
