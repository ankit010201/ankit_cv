import { NextResponse } from "next/server";
import { getPlaylists, getPlaylistTracks } from "@/lib/spotify";

export async function GET() {
  const res = await getPlaylists();
  if (!res.ok) return NextResponse.json({ playlists: [] });

  const data = await res.json();

  const playlists = await Promise.all(
    data.items.map(
      async (pl: { id: string; name: string; images: { url: string }[] }) => {
        const tracksRes = await getPlaylistTracks(pl.id);
        const tracksData = tracksRes.ok ? await tracksRes.json() : { items: [] };

        const tracks = tracksData.items
          .filter((item: { track: { name: string; artists: { name: string }[] } | null }) => item.track)
          .map((item: { track: { name: string; artists: { name: string }[] } }) => ({
            title: item.track.name,
            artist: item.track.artists.map((a) => a.name).join(", "),
          }));

        return { id: pl.id, name: pl.name, tracks };
      },
    ),
  );

  return NextResponse.json({ playlists });
}
