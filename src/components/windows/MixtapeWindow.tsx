"use client";

import { useEffect, useState } from "react";

interface Track {
  title: string;
  artist: string;
}

interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
}

const TAPE_COLORS = [
  "from-indigo-500 to-purple-600",
  "from-orange-400 to-red-500",
  "from-teal-400 to-green-500",
  "from-pink-400 to-rose-500",
  "from-blue-400 to-cyan-500",
];

export default function MixtapeWindow() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/spotify/playlists")
      .then((r) => r.json())
      .then((data) => {
        setPlaylists(data.playlists ?? []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="retro-font flex h-full items-center justify-center text-xs text-gray-400">
        loading...
      </div>
    );
  }

  if (playlists.length === 0) {
    return (
      <div className="retro-font flex h-full items-center justify-center text-xs text-gray-400">
        no playlists found
      </div>
    );
  }

  return (
    <div className="retro-font space-y-3 text-xs">
      <div className="text-gray-400">// 5 most recent playlists</div>
      {playlists.map((pl, i) => (
        <div key={pl.id} className="pixelated-border bg-amber-100 p-3">
          <div className="mb-2 flex items-center gap-2">
            <div
              className={`pixelated-border h-8 w-12 flex-shrink-0 bg-gradient-to-r ${TAPE_COLORS[i % TAPE_COLORS.length]}`}
            ></div>
            <div className="truncate text-amber-800">{pl.name}</div>
          </div>
          <div className="space-y-0.5 text-gray-700">
            {pl.tracks.map((t, j) => (
              <div key={j} className="flex gap-1 truncate">
                <span className="flex-shrink-0 text-gray-400">{j + 1}.</span>
                <span className="truncate">
                  {t.title}
                  <span className="text-gray-400"> — {t.artist}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
