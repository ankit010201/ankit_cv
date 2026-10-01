"use client";

import { useState } from "react";

const views = ["All", "Cycling", "Running", "Hiking"] as const;
type View = (typeof views)[number];

const rides = [
  { id: "20394747630", name: "Morning Ride", date: "Sep 30, 2026", distance: "12.87 mi", time: "1:04:59", elevation: "580 ft" },
  { id: "20357213783", name: "fire >>> diablo", date: "Sep 27, 2026", distance: "39.01 mi", time: "3:11:05", elevation: "2,490 ft", note: "longest ride so far 🏔️" },
  { id: "20325432366", name: "Morning Ride", date: "Sep 25, 2026", distance: "18.12 mi", time: "1:26:43", elevation: "1,114 ft" },
  { id: "20118472577", name: "Morning Ride", date: "Sep 10, 2026", distance: "9.22 mi", time: "51:04", elevation: "871 ft" },
  { id: "20111474408", name: "Afternoon Ride", date: "Sep 9, 2026", distance: "11.93 mi", time: "1:02:33", elevation: "620 ft" },
];

const hikes = [
  { id: "20264345615", name: "Morning Hike", date: "Sep 21, 2026", distance: "1.38 mi", detail: "30:33 moving time · 268 ft elevation" },
  { name: "Fuji Hike", date: "Apr 23, 2026", distance: "9.60 mi", detail: "Fujiyoshida, Japan · 3:25:17 · 1,255 ft elevation · 19,294 steps" },
];

export default function ActivityWindow() {
  const [view, setView] = useState<View>("All");
  const show = (sport: View) => view === "All" || view === sport;

  return (
    <div className="retro-font space-y-3 text-xs">
      <div className="flex flex-wrap justify-between gap-2 text-gray-500">
        <span>riding, running &amp; hiking</span>
        <a href="https://www.strava.com/athletes/102971976" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
          → Strava profile
        </a>
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter activities by sport">
        {views.map((sport) => (
          <button key={sport} type="button" aria-pressed={view === sport} onClick={() => setView(sport)} className={`pixelated-button px-3 py-2 ${view === sport ? "bg-amber-400 text-amber-900" : "bg-amber-100 text-gray-700"}`}>
            {sport}
          </button>
        ))}
      </div>

      {show("Cycling") && (
        <>
          <div className="pixelated-border bg-amber-100 p-3">
            <div className="mb-2 text-amber-800">CYCLING_2026.log</div>
            <dl className="grid grid-cols-2 gap-3">
              {[{ label: "rides", value: "14" }, { label: "miles", value: "247.6" }, { label: "elevation", value: "16,611 ft" }, { label: "moving time", value: "21h 2m" }].map((stat) => (
                <div key={stat.label}>
                  <dt className="text-gray-500">{stat.label}</dt>
                  <dd className="mt-1 text-sm text-gray-900">{stat.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-3 text-gray-500">Strava totals through Sep 30, 2026.</div>
          </div>
          <div className="pixelated-border bg-amber-100 p-3">
            <div className="mb-2 text-amber-800">RECENT_RIDES.gpx</div>
            <div className="space-y-2">
              {rides.map((ride) => (
                <div key={ride.id} className="pixelated-border bg-white p-2">
                  <div className="flex flex-wrap justify-between gap-1">
                    <a href={`https://www.strava.com/activities/${ride.id}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">{ride.name} →</a>
                    <span className="text-amber-700">{ride.distance}</span>
                  </div>
                  <div className="mt-1 text-gray-500">{ride.date} · {ride.time} moving time · {ride.elevation} elevation</div>
                  {ride.note && <div className="mt-1 text-gray-600">{ride.note}</div>}
                </div>
              ))}
            </div>
            <div className="mt-2 text-gray-500">Updated Sep 30, 2026. More rides on Strava.</div>
          </div>
        </>
      )}

      {show("Running") && (
        <div className="pixelated-border bg-amber-100 p-3">
          <div className="mb-2 text-amber-800">LATEST_RUNS.gpx</div>
          <iframe title="Ankit’s latest Strava runs" src="https://www.strava.com/athletes/102971976/latest-rides/f61e1432e321bcc57a472dff80d99a2bf39afc95" width="300" height="454" loading="lazy" className="mx-auto max-w-full border-0" />
          <div className="mt-2 text-gray-500">Updated by Strava.</div>
        </div>
      )}

      {show("Hiking") && (
        <div className="pixelated-border bg-amber-100 p-3">
          <div className="mb-2 text-amber-800">HIKES.gpx</div>
          <div className="space-y-2">
            {hikes.map((hike) => (
              <div key={hike.name} className="pixelated-border bg-white p-2">
                <div className="flex flex-wrap justify-between gap-1">
                  {hike.id ? <a href={`https://www.strava.com/activities/${hike.id}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">{hike.name} →</a> : <span className="text-gray-900">{hike.name}</span>}
                  <span className="text-amber-700">{hike.distance}</span>
                </div>
                <div className="mt-1 text-gray-500">{hike.date} · {hike.detail}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 text-gray-500">Updated Sep 30, 2026.</div>
        </div>
      )}
    </div>
  );
}
