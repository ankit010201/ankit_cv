"use client";

import { useLiveJson } from "@/hooks/useLiveJson";

interface NowPlaying {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImage?: string;
  progress?: number;
  duration?: number;
}

interface Track {
  title: string;
  artist: string;
  album: string;
  url?: string;
}

export default function MusicWindow() {
  const playback = useLiveJson<NowPlaying | null>(
    "/api/spotify/now-playing",
    null,
    30_000,
  );
  const plays = useLiveJson<{ tracks: Track[] }>("/api/spotify/recent", {
    tracks: [],
  });
  const artists = useLiveJson<{ artists: string[] }>(
    "/api/spotify/top-artists",
    { artists: [] },
    300_000,
  );
  const nowPlaying = playback.error ? null : playback.data;
  const recent = plays.data.tracks;
  const topArtists = artists.data.artists;
  const loading = playback.loading && plays.loading && artists.loading;

  const progressPct =
    nowPlaying?.progress && nowPlaying?.duration
      ? Math.round((nowPlaying.progress / nowPlaying.duration) * 100)
      : 0;

  const fmt = (ms: number) => {
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="retro-font flex h-full items-center justify-center text-xs text-gray-400">
        loading...
      </div>
    );
  }

  return (
    <div className="retro-font space-y-3 text-xs">
      <div className="text-gray-500">
        {playback.error || plays.error || artists.error
          ? "Spotify is temporarily unavailable. Try again shortly."
          : "live from Spotify · refreshes automatically"}
      </div>
      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">
          {nowPlaying?.isPlaying ? "▶ NOW_PLAYING.mp3" : "⏸ PAUSED"}
        </div>
        {nowPlaying?.isPlaying ? (
          <>
            <div className="flex items-center gap-3">
              {nowPlaying.albumImage ? (
                <img
                  src={nowPlaying.albumImage}
                  alt="album"
                  className="dithered h-10 w-10 flex-shrink-0 object-cover"
                />
              ) : (
                <div className="pixelated-border h-10 w-10 flex-shrink-0 bg-gradient-to-br from-purple-400 to-pink-500"></div>
              )}
              <div>
                <div className="text-gray-900">{nowPlaying.title}</div>
                <div className="text-gray-500">{nowPlaying.artist}</div>
                <div className="text-gray-400">{nowPlaying.album}</div>
              </div>
            </div>
            <div className="mt-3 h-1 w-full bg-gray-300">
              <div
                className="h-1 bg-amber-600"
                style={{ width: `${progressPct}%` }}
              ></div>
            </div>
            <div className="mt-1 flex justify-between text-gray-400">
              <span>{fmt(nowPlaying.progress ?? 0)}</span>
              <span>{fmt(nowPlaying.duration ?? 0)}</span>
            </div>
          </>
        ) : (
          <div className="text-gray-500">nothing playing right now</div>
        )}
      </div>

      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">RECENT_PLAYS.log</div>
        {recent.length > 0 ? (
          <div className="space-y-1">
            {recent.map((t, i) => (
              <div key={i} className="text-gray-700">
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:underline"
                >
                  {t.title}
                </a>
                <span className="text-gray-500"> — {t.artist}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400">no recent tracks</div>
        )}
      </div>

      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">TOP_ARTISTS_RECENT.fav</div>
        {topArtists.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {topArtists.map((a, i) => (
              <span
                key={i}
                className="pixelated-border bg-amber-200 px-2 py-0.5"
              >
                {a}
              </span>
            ))}
          </div>
        ) : (
          <div className="text-gray-400">no data</div>
        )}
      </div>
    </div>
  );
}
