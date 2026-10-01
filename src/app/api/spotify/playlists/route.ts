import { NextResponse } from "next/server";
import { getPlaylists, getPlaylistTracks } from "@/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await getPlaylists();
    if (!res.ok) throw new Error("Spotify unavailable");

    const data = await res.json();

    const playlists = await Promise.all(
      data.items.map(
        async (pl: { id: string; name: string; images: { url: string }[] }) => {
          const tracksRes = await getPlaylistTracks(pl.id);
          const tracksData = tracksRes.ok
            ? await tracksRes.json()
            : { items: [] };

          const tracks = tracksData.items
            .filter(
              (item: {
                track: { name: string; artists: { name: string }[] } | null;
              }) => item.track,
            )
            .map(
              (item: {
                track: { name: string; artists: { name: string }[] };
              }) => ({
                title: item.track.name,
                artist: item.track.artists.map((a) => a.name).join(", "),
              }),
            );

          return {
            id: pl.id,
            name: pl.name,
            tracks,
            url: `https://open.spotify.com/playlist/${pl.id}`,
          };
        },
      ),
    );

    return NextResponse.json({ playlists });
  } catch {
    return NextResponse.json(
      { playlists: [], error: "Spotify unavailable" },
      { status: 503 },
    );
  }
}
