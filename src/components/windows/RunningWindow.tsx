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
      <div className="flex flex-wrap justify-between gap-2 text-gray-500">
        <span>running, riding &amp; hiking</span>
        <a
          href="https://www.strava.com/athletes/102971976"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:underline"
        >
          → Strava profile
        </a>
      </div>
      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">THIS_WEEK_RUNS.log</div>
        <iframe
          title="Ankit’s running summary for the current week"
          src="https://www.strava.com/athletes/102971976/activity-summary/f61e1432e321bcc57a472dff80d99a2bf39afc95"
          width="300"
          height="160"
          className="mx-auto max-w-full border-0"
        />
      </div>
      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">LATEST_RUNS.gpx</div>
        <iframe
          title="Ankit’s latest Strava runs"
          src="https://www.strava.com/athletes/102971976/latest-rides/f61e1432e321bcc57a472dff80d99a2bf39afc95"
          width="300"
          height="454"
          className="mx-auto max-w-full border-0"
        />
        <div className="mt-2 text-gray-500">
          Updated by Strava.{" "}
          <a
            href="https://www.strava.com/athletes/102971976"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline"
          >
            View all activities →
          </a>
        </div>
      </div>

      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">RECENT_RIDE.log</div>
        <a
          href="https://www.strava.com/activities/20394747630"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:underline"
        >
          Morning Ride →
        </a>
        <div className="mt-1 text-gray-600">
          Sep 30, 2026 · 12.87 mi · 1h 4m · 580 ft elevation
        </div>
        <div className="mt-1 text-gray-500">
          Latest ride as of Sep 30. More rides on Strava.
        </div>
      </div>

      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">HIGHLIGHTS.gpx</div>
        <div className="space-y-2">
          {activities.map((a, i) => (
            <div key={i} className="pixelated-border bg-white p-2">
              <div className="flex justify-between">
                <span className="text-gray-900">{a.name}</span>
                <span className="text-amber-600">{a.distance}</span>
              </div>
              <div className="mt-0.5 flex justify-between text-gray-400">
                <span>
                  {a.date} · {a.location}
                </span>
                <span>
                  {a.pace} · {a.time}
                </span>
              </div>
              {a.note && <div className="mt-0.5 text-gray-500">{a.note}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
