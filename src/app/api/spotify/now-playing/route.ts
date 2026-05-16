import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/spotify";

export async function GET() {
  const token = await getAccessToken();

  const res = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=1&time_range=short_term",
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) return NextResponse.json({ isPlaying: false });

  const data = await res.json();
  const track = data.items?.[0];
  if (!track) return NextResponse.json({ isPlaying: false });

  const duration = track.duration_ms as number;
  const progress = Math.floor(Math.random() * duration);

  return NextResponse.json({
    isPlaying: true,
    title: track.name,
    artist: track.artists.map((a: { name: string }) => a.name).join(", "),
    album: track.album.name,
    albumImage: track.album.images[0]?.url ?? null,
    progress,
    duration,
  });
}
