"use client";

export default function NowWindow() {
  return (
    <div className="retro-font space-y-3 text-xs">
      <div className="text-gray-400">// last updated: May 2025</div>

      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">WORKING_ON.txt</div>
        <div className="space-y-1 text-gray-700">
          <div>▸ Building at Rippling</div>
          <div>▸ Learning Rust (slowly)</div>
          <div>▸ Training for a half marathon</div>
        </div>
      </div>

      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">THINKING_ABOUT.txt</div>
        <div className="space-y-1 text-gray-700">
          <div>▸ How AI changes software eng</div>
          <div>▸ Building more in public</div>
          <div>▸ The best ramen spots in SF</div>
        </div>
      </div>

      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">READING.now</div>
        <div className="text-gray-700">The Pragmatic Programmer</div>
      </div>

      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">MOOD.exe</div>
        <div className="text-gray-700">Caffeinated and shipping</div>
      </div>
    </div>
  );
}
