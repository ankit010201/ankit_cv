"use client";

const activities = [
  {
    name: "Afternoon Run",
    date: "May 13, 2026",
    location: "San Francisco, CA",
    distance: "2.06 mi",
    pace: "7:09/mi",
    time: "14:46",
    note: "🏆 fastest 2 miles ever",
  },
  {
    name: "Fuji Hike",
    date: "Apr 23, 2026",
    location: "Fujiyoshida, Japan",
    distance: "9.60 mi",
    pace: "21:22/mi",
    time: "3:25:17",
    note: "1,255 ft elevation · 19,294 steps",
  },
  {
    name: "Marathon day!",
    date: "Dec 10, 2023",
    location: "Fremont, CA",
    distance: "25.93 mi",
    pace: "12:11/mi",
    time: "5:16:05",
    note: "that was the hardest thing i've ever done",
  },
  {
    name: "Marathon training: Run 25",
    date: "Oct 30, 2023",
    location: "Manhattan, NY",
    distance: "12.12 mi",
    pace: "9:32/mi",
    time: "1:55:35",
    note: "317 ft elevation",
  },
  {
    name: "Seattle half marathon!!",
    date: "Nov 26, 2022",
    location: "Seattle, WA",
    distance: "13.41 mi",
    pace: "10:51/mi",
    time: "2:25:31",
    note: "first official race 🎉",
  },
];

export default function RunningWindow() {
  return (
    <div className="retro-font space-y-3 text-xs">
      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">OVERVIEW.log</div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="pixelated-border bg-amber-200 p-2">
            <div className="text-base text-amber-800">285</div>
            <div className="text-gray-500">activities</div>
          </div>
          <div className="pixelated-border bg-amber-200 p-2">
            <div className="text-base text-amber-800">4wk</div>
            <div className="text-gray-500">streak</div>
          </div>
          <div className="pixelated-border bg-amber-200 p-2">
            <div className="text-base text-amber-800">7:09</div>
            <div className="text-gray-500">best pace</div>
          </div>
        </div>
      </div>

      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">ACTIVITIES.gpx</div>
        <div className="space-y-2">
          {activities.map((a, i) => (
            <div key={i} className="pixelated-border bg-white p-2">
              <div className="flex justify-between">
                <span className="text-gray-900">{a.name}</span>
                <span className="text-amber-600">{a.distance}</span>
              </div>
              <div className="mt-0.5 flex justify-between text-gray-400">
                <span>{a.date} · {a.location}</span>
                <span>{a.pace} · {a.time}</span>
              </div>
              {a.note && (
                <div className="mt-0.5 text-gray-500">{a.note}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
