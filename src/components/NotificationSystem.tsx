"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Notif {
  id: number;
  emoji: string;
  app: string;
  message: string;
}

const POOL: Omit<Notif, "id">[] = [
  { emoji: "💧", app: "Reminders",   message: "drink some water" },
  { emoji: "💧", app: "PersonalOS",  message: "stay hydrated!" },
  { emoji: "📱", app: "Messages",    message: "1 unread message from Mom" },
  { emoji: "🔋", app: "Battery",     message: "battery at 69%" },
  { emoji: "🍜", app: "Beli",        message: "new follower on Beli" },
  { emoji: "🏃", app: "Activity",    message: "run streak: 4 weeks strong!" },
  { emoji: "☀️", app: "Weather",     message: "beautiful day in SF · 68°F" },
  { emoji: "🥐", app: "Arsicault",   message: "your croissant order is ready" },
  { emoji: "⛰️", app: "Achievement", message: "Mt. Fuji conquered!" },
  { emoji: "🎵", app: "Spotify",     message: "you've been listening for 3 hrs" },
  { emoji: "📧", app: "Mail",        message: "TODO: reply to that email" },
  { emoji: "⚠️", app: "System",      message: "too many browser tabs open" },
  { emoji: "🏅", app: "Achievement", message: "Marathon finisher unlocked!" },
  { emoji: "🌉", app: "Maps",        message: "welcome back to San Francisco" },
  { emoji: "🔔", app: "PersonalOS",  message: "system update available · ignore" },
  { emoji: "📸", app: "Camera",      message: "memory: 1 year ago today" },
  { emoji: "🎈", app: "Maps",        message: "hot air balloon spotted nearby" },
];

let uid = 0;

export default function NotificationSystem() {
  const [active, setActive] = useState<Notif[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback((id: number) => {
    setActive((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const showRandom = useCallback(() => {
    const template = POOL[Math.floor(Math.random() * POOL.length)];
    const notif: Notif = { ...template, id: ++uid };
    setActive((prev) => [...prev.slice(-3), notif]);
    setTimeout(() => dismiss(notif.id), 5000);
  }, [dismiss]);

  useEffect(() => {
    const schedule = () => {
      const delay = 10000 + Math.random() * 10000;
      timerRef.current = setTimeout(() => {
        showRandom();
        schedule();
      }, delay);
    };

    // First one appears quickly so visitors notice the feature
    timerRef.current = setTimeout(() => {
      showRandom();
      schedule();
    }, 4000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [showRandom]);

  if (active.length === 0) return null;

  return (
    <div className="absolute bottom-12 right-3 z-[60] flex flex-col-reverse gap-2">
      {active.map((n) => (
        <div
          key={n.id}
          className="notif-enter pixelated-window flex w-64 items-start gap-2.5 bg-amber-50 p-3"
        >
          <div className="mt-0.5 text-xl leading-none">{n.emoji}</div>
          <div className="min-w-0 flex-1">
            <div className="retro-font mb-0.5 text-xs text-amber-800">{n.app}</div>
            <div className="retro-font text-xs leading-relaxed text-gray-600">{n.message}</div>
          </div>
          <button
            onClick={() => dismiss(n.id)}
            className="pixelated-button retro-font flex-shrink-0 bg-amber-200 px-1.5 text-xs"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
