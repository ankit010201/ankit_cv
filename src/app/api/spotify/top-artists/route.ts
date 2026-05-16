import { NextResponse } from "next/server";
import { getTopArtists } from "@/lib/spotify";

export async function GET() {
  const res = await getTopArtists();
  if (!res.ok) return NextResponse.json({ artists: [] });

  const data = await res.json();
  const artists = data.items.map((a: { name: string }) => a.name);

  return NextResponse.json({ artists });
}
