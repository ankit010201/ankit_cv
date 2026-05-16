"use client";

import { useState } from "react";

const initialEntries = [
  { name: "Sam", date: "May 2025", message: "sick site dude. love the retro vibes" },
  { name: "Priya", date: "Apr 2025", message: "ankit built this in a weekend apparently??" },
  { name: "Jake", date: "Apr 2025", message: "the minesweeper window lmaooo" },
  { name: "anonymous", date: "Mar 2025", message: "42 is indeed the answer" },
];

export default function GuestbookWindow() {
  const [entries, setEntries] = useState(initialEntries);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setEntries((prev) => [
      { name: name.trim(), date: "May 2025", message: message.trim() },
      ...prev,
    ]);
    setName("");
    setMessage("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div className="retro-font space-y-3 text-xs">
      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">SIGN_GUESTBOOK.exe</div>
        {submitted ? (
          <div className="text-green-600">entry added! thanks for signing ✓</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <div className="mb-1 text-gray-600">name:</div>
              <input
                className="pixelated-border w-full bg-white p-1 text-gray-800 outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="your name..."
                maxLength={30}
              />
            </div>
            <div>
              <div className="mb-1 text-gray-600">message:</div>
              <textarea
                className="pixelated-border w-full bg-white p-1 text-gray-800 outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="leave a message..."
                rows={2}
                maxLength={100}
              />
            </div>
            <button
              type="submit"
              className="pixelated-button bg-amber-300 px-3 py-1 text-gray-800 hover:bg-amber-400"
            >
              sign it
            </button>
          </form>
        )}
      </div>

      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">ENTRIES.log</div>
        <div className="space-y-2">
          {entries.map((e, i) => (
            <div key={i} className="pixelated-border bg-white p-2">
              <div className="flex justify-between text-gray-500">
                <span className="text-gray-800">{e.name}</span>
                <span>{e.date}</span>
              </div>
              <div className="mt-0.5 text-gray-700">{e.message}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
