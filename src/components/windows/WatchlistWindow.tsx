"use client";

const favorites = [
  { title: "Interstellar", year: "2014", rating: "★★★★★" },
  { title: "2001: A Space Odyssey", year: "1968", rating: "★★★★★" },
  { title: "Spider-Man: Into the Spider-Verse", year: "2018", rating: "★★★★★" },
  { title: "Dune", year: "2021", rating: "★★★★★" },
];

const recent = [
  { title: "Coherence", year: "2013", rating: "★★★★★", note: "Mar 2026" },
  { title: "The Map of Tiny Perfect Things", year: "2021", rating: "★★★", note: "May 2026" },
  { title: "Regretting You", year: "2022", rating: "★★★½", note: "May 2026" },
  { title: "Param Sundari", year: "2021", rating: "★★", note: "May 2026" },
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
  return (
    <div className="retro-font space-y-3 text-xs">
      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">FAVORITES.txt</div>
        <div className="space-y-1">
          {favorites.map((f, i) => (
            <div key={i} className="flex justify-between text-gray-700">
              <span>{f.title} <span className="text-gray-400">({f.year})</span></span>
              <span className="ml-2 flex-shrink-0 text-amber-500">{f.rating}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">RECENTLY_WATCHED.log</div>
        <div className="space-y-1">
          {recent.map((r, i) => (
            <div key={i} className="flex justify-between text-gray-700">
              <div>
                <span>{r.title}</span>
                <span className="text-gray-400"> ({r.year})</span>
              </div>
              <div className="ml-2 flex-shrink-0 text-right">
                <div className="text-amber-500">{r.rating}</div>
                <div className="text-gray-400">{r.note}</div>
              </div>
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
