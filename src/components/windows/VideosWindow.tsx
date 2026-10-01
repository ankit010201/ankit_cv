"use client";

import { ExternalLink, Play } from "lucide-react";
import { useState } from "react";
import snapshot from "@/data/videos.json";
import { useLiveJson } from "@/hooks/useLiveJson";

export default function VideosWindow() {
  const { data, error } = useLiveJson(
    "/api/youtube",
    { videos: snapshot, stale: true },
    300_000,
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const youtubeVideo =
    data.videos.find((video) => video.id === selectedId) ?? data.videos[0];
  return (
    <div className="retro-font space-y-3 text-xs">
      <div className="flex flex-wrap justify-between gap-2 text-gray-500">
        <span>
          {data.stale || error
            ? "saved uploads · Sep 30, 2026"
            : "latest uploads"}
        </span>
        <a
          href="https://www.youtube.com/@4nkitagrawal/videos"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:underline"
        >
          → YouTube channel
        </a>
      </div>
      <div className="flex flex-wrap gap-2">
        {data.videos.map((video) => (
          <button
            key={video.id}
            type="button"
            onClick={() => setSelectedId(video.id)}
            aria-pressed={youtubeVideo.id === video.id}
            className={`pixelated-button px-2 py-1 ${
              youtubeVideo.id === video.id ? "bg-amber-300" : "bg-amber-100"
            }`}
          >
            {video.title}
          </button>
        ))}
      </div>
      <VideoPlayer key={youtubeVideo.id} youtubeVideo={youtubeVideo} />
    </div>
  );
}

function VideoPlayer({
  youtubeVideo,
}: {
  youtubeVideo: (typeof snapshot)[number];
}) {
  const thumbnailUrl = `https://i.ytimg.com/vi/${youtubeVideo.id}/maxresdefault.jpg`;
  const fallbackThumbnailUrl = `https://i.ytimg.com/vi/${youtubeVideo.id}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeVideo.id}?autoplay=1&rel=0`;
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnail, setThumbnail] = useState(thumbnailUrl);

  return (
    <div className="retro-font space-y-3 text-xs">
      <div className="pixelated-border overflow-hidden bg-gray-900">
        <div className="relative aspect-video w-full bg-gray-900">
          {isPlaying ? (
            <iframe
              className="h-full w-full"
              src={embedUrl}
              title={youtubeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className="group relative block h-full w-full"
              onClick={() => setIsPlaying(true)}
              aria-label="Play YouTube video"
            >
              <img
                src={thumbnail}
                alt={`${youtubeVideo.title} thumbnail`}
                className="h-full w-full object-cover"
                onError={() => {
                  if (thumbnail !== fallbackThumbnailUrl) {
                    setThumbnail(fallbackThumbnailUrl);
                  }
                }}
              />
              <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="pixelated-border flex h-12 w-12 items-center justify-center bg-amber-100 text-rose-600 shadow-[4px_4px_0_#111827]">
                  <Play className="h-6 w-6 fill-current" aria-hidden="true" />
                </span>
              </div>
            </button>
          )}
        </div>
      </div>

      <div className="pixelated-border flex flex-wrap items-center justify-between gap-2 bg-amber-100 p-3">
        <div className="min-w-0 flex-1">
          <div className="text-amber-800">{youtubeVideo.title}</div>
          <div className="mt-1 text-gray-500">{youtubeVideo.description}</div>
        </div>
        <div className="flex gap-2">
          {!isPlaying && (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="pixelated-button inline-flex items-center gap-1 bg-amber-200 px-2 py-1 text-gray-800"
            >
              <Play className="h-3 w-3 fill-current" aria-hidden="true" />
              Play
            </button>
          )}
          <a
            href={youtubeVideo.url}
            target="_blank"
            rel="noreferrer"
            className="pixelated-button inline-flex items-center gap-1 bg-amber-200 px-2 py-1 text-gray-800"
          >
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
            Open
          </a>
        </div>
      </div>
    </div>
  );
}
