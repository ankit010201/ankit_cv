"use client";

const restaurants = [
  { name: "Masala y Maíz", location: "Mexico City, MX", cuisine: "Indian · Mexican · African", score: "10.0" },
  { name: "Laser Wolf Brooklyn", location: "Williamsburg, NY", cuisine: "Israeli · Mediterranean", score: "10.0" },
  { name: "Cornelly", location: "Capitol Hill, Seattle", cuisine: "Italian · Pizza", score: "10.0" },
  { name: "Din Tai Fung", location: "Seattle, WA", cuisine: "Taiwanese · Chinese", score: "9.9" },
];

const bars = [
  { name: "Clio's Books", location: "Oakland, CA", cuisine: "Cocktail Bar", score: "10.0" },
  { name: "Kingfisher", location: "Durham, NC", cuisine: "Cocktail Bar", score: "9.7" },
  { name: "The Interval at Long Now", location: "Fort Mason, SF", cuisine: "Cafe · Bar", score: "9.3" },
  { name: "Wilson & Wilson", location: "Tenderloin, SF", cuisine: "Cocktail Bar", score: "9.0" },
];

const bakeries = [
  { name: "Arsicault Bakery", location: "Inner Richmond, SF", cuisine: "Bakery · Coffee", score: "10.0" },
  { name: "Butter & Crumble", location: "North Beach, SF", cuisine: "Bakery · Dessert", score: "9.9" },
  { name: "Arsicault Civic Center", location: "Civic Center, SF", cuisine: "Bakery", score: "9.7" },
  { name: "Holy Nata", location: "Union Square, SF", cuisine: "Portuguese · Dessert", score: "9.7" },
];

function ScoreTag({ score }: { score: string }) {
  const val = parseFloat(score);
  const color = val === 10 ? "text-green-700 bg-green-100" : val >= 9.5 ? "text-amber-700 bg-amber-100" : "text-gray-600 bg-gray-100";
  return (
    <span className={`pixelated-border flex-shrink-0 px-1.5 py-0.5 text-xs ${color}`}>
      {score}
    </span>
  );
}

function FoodList({ items }: { items: typeof restaurants }) {
  return (
    <div className="space-y-1.5">
      {items.map((r, i) => (
        <div key={i} className="flex items-start justify-between gap-2">
          <div>
            <div className="text-gray-900">{r.name}</div>
            <div className="text-gray-400">{r.cuisine} · {r.location}</div>
          </div>
          <ScoreTag score={r.score} />
        </div>
      ))}
    </div>
  );
}

export default function FoodWindow() {
  return (
    <div className="retro-font space-y-3 text-xs">
      <div className="text-gray-400">// sorted by beli score</div>

      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">🍽️ RESTAURANTS.log</div>
        <FoodList items={restaurants} />
      </div>

      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">🍸 BARS.log</div>
        <FoodList items={bars} />
      </div>

      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">🥐 BAKERIES.log</div>
        <FoodList items={bakeries} />
      </div>
    </div>
  );
}
