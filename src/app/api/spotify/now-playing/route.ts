import { NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await getNowPlaying();
    if (res.status === 204) return NextResponse.json({ isPlaying: false });
    if (!res.ok) throw new Error("Spotify unavailable");
    const data = await res.json();
    const track = data.item;
    if (!track || data.currently_playing_type !== "track")
      return NextResponse.json({ isPlaying: false });
    return NextResponse.json({
      isPlaying: data.is_playing === true,
      title: track.name,
      artist: track.artists.map((a: { name: string }) => a.name).join(", "),
      album: track.album.name,
      albumImage: track.album.images[0]?.url ?? null,
      url: track.external_urls?.spotify,
      progress: data.progress_ms ?? 0,
      duration: track.duration_ms,
    });
  } catch {
    return NextResponse.json(
      { isPlaying: false, error: "Spotify unavailable" },
      { status: 503 },
    );
  }
}
