import { NextResponse } from "next/server";
import { getRecentlyPlayed } from "@/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await getRecentlyPlayed();
    if (!res.ok) throw new Error("Spotify unavailable");

    const data = await res.json();
    const tracks = data.items.map(
      (item: {
        track: {
          name: string;
          artists: { name: string }[];
          album: { name: string };
          external_urls?: { spotify: string };
        };
        played_at: string;
      }) => ({
        title: item.track.name,
        artist: item.track.artists.map((a) => a.name).join(", "),
        album: item.track.album.name,
        playedAt: item.played_at,
        url: item.track.external_urls?.spotify,
      }),
    );

    return NextResponse.json({ tracks });
  } catch {
    return NextResponse.json(
      { tracks: [], error: "Spotify unavailable" },
      { status: 503 },
    );
  }
}
