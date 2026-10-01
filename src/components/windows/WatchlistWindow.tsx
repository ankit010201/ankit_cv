"use client";

import snapshot from "@/data/letterboxd.json";
import { useLiveJson } from "@/hooks/useLiveJson";

const stars = (rating: number) =>
  "★".repeat(Math.floor(rating)) + (rating % 1 ? "½" : "");
const dateLabel = (date: string) =>
  date
    ? new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      })
    : "";

const favorites = [
  { title: "Interstellar", year: "2014", rating: "★★★★★" },
  { title: "2001: A Space Odyssey", year: "1968", rating: "★★★★★" },
  { title: "Spider-Man: Into the Spider-Verse", year: "2018", rating: "★★★★★" },
  { title: "Dune", year: "2021", rating: "★★★★★" },
];

const queue = [
  "Wake Up Dead Man",
  "Avatar: Fire and Ash",
  "One Battle After Another",
  "The French Dispatch",
  "Asteroid City",
  "Memento",
  "Drive",
  "Pride & Prejudice",
  "GoodFellas",
  "Jojo Rabbit",
];

export default function WatchlistWindow() {
  const { data, error } = useLiveJson(
    "/api/letterboxd",
    { films: snapshot, stale: true, updatedAt: "2026-09-30" },
    300_000,
  );
  const recent = data.films;

  return (
    <div className="retro-font space-y-3 text-xs">
      <div className="flex flex-wrap justify-between gap-2 text-gray-500">
        <span>
          {data.stale || error
            ? `saved reviews · Sep 30, 2026`
            : "latest Letterboxd reviews"}
        </span>
        <a
          href="https://letterboxd.com/ankit010201/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:underline"
        >
          → Letterboxd
        </a>
      </div>
      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">FAVORITES.txt</div>
        <div className="space-y-1">
          {favorites.map((f, i) => (
            <div key={i} className="flex justify-between text-gray-700">
              <span>
                {f.title} <span className="text-gray-400">({f.year})</span>
              </span>
              <span className="ml-2 flex-shrink-0 text-amber-500">
                {f.rating}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">RECENTLY_WATCHED.log</div>
        <div className="space-y-1">
          {recent.map((r) => (
            <div
              key={r.url}
              className="border-b border-amber-200 py-2 last:border-0"
            >
              <div className="flex justify-between gap-2 text-gray-700">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-0 text-blue-700 hover:underline"
                >
                  {r.title} <span className="text-gray-400">({r.year})</span>
                </a>
                <div className="flex-shrink-0 text-right">
                  <div
                    className="text-amber-600"
                    aria-label={`${r.rating} out of 5 stars`}
                  >
                    {r.rating ? stars(r.rating) : "unrated"}
                  </div>
                  <div className="text-gray-500">
                    {dateLabel(r.watchedDate)}
                  </div>
                </div>
              </div>
              {r.review &&
                (r.spoiler ? (
                  <details className="mt-1 text-gray-600">
                    <summary className="cursor-pointer">
                      review contains spoilers
                    </summary>
                    <p className="mt-1 whitespace-pre-line leading-relaxed">
                      {r.review}
                    </p>
                  </details>
                ) : (
                  <p className="mt-1 whitespace-pre-line leading-relaxed text-gray-600">
                    {r.review}
                  </p>
                ))}
            </div>
          ))}
        </div>
      </div>

      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">QUEUE.txt</div>
        <div className="space-y-1 text-gray-700">
          {queue.map((q, i) => (
            <div key={i}>▸ {q}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
