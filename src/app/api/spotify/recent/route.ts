import { NextResponse } from "next/server";
import { getRecentlyPlayed } from "@/lib/spotify";

export async function GET() {
  const res = await getRecentlyPlayed();
  if (!res.ok) return NextResponse.json({ tracks: [] });

  const data = await res.json();
  const tracks = data.items.map(
    (item: { track: { name: string; artists: { name: string }[]; album: { name: string } } }) => ({
      title: item.track.name,
      artist: item.track.artists.map((a) => a.name).join(", "),
      album: item.track.album.name,
    }),
  );

  return NextResponse.json({ tracks });
}
