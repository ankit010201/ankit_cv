"use client";

import { useEffect, useRef, useState } from "react";

interface NowPlaying {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImage?: string;
  progress?: number;
  duration?: number;
}

function EqBars() {
  return (
    <div className="flex items-end gap-px" style={{ height: 18 }}>
      <div className="eq-bar-1 w-1.5 rounded-sm bg-green-500" style={{ height: 4 }} />
      <div className="eq-bar-2 w-1.5 rounded-sm bg-green-500" style={{ height: 10 }} />
      <div className="eq-bar-3 w-1.5 rounded-sm bg-green-400" style={{ height: 14 }} />
      <div className="eq-bar-4 w-1.5 rounded-sm bg-green-500" style={{ height: 6 }} />
      <div className="eq-bar-5 w-1.5 rounded-sm bg-green-500" style={{ height: 12 }} />
    </div>
  );
}

const INITIAL_X = () => (typeof window !== "undefined" ? window.innerWidth - 252 : 1200);
const INITIAL_Y = () => (typeof window !== "undefined" ? window.innerHeight - 130 : 600);

export default function NowPlayingWidget() {
  const [data, setData] = useState<NowPlaying | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const onDragRef = useRef((x: number, y: number) => setPos({ x, y }));

  // Set initial position client-side
  useEffect(() => {
    setPos({ x: INITIAL_X(), y: INITIAL_Y() });
  }, []);

  useEffect(() => {
    fetch("/api/spotify/now-playing")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) =>
      onDragRef.current(e.clientX - offset.current.x, e.clientY - offset.current.y);
    const onUp = () => setDragging(false);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    setDragging(true);
  };

  const fmt = (ms: number) => {
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };

  const progressPct =
    data?.progress && data?.duration
      ? Math.round((data.progress / data.duration) * 100)
      : 0;

  if (!data?.isPlaying) return null;

  return (
    <div
      className="pixelated-window absolute bg-gray-900 text-white select-none"
      style={{ left: pos.x, top: pos.y, width: 236, zIndex: 35 }}
    >
      {/* title bar — drag handle */}
      <div
        className="flex cursor-move items-center justify-between bg-gray-800 px-2 py-1"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-green-400"></div>
          <span className="retro-font text-xs text-green-400">NOW_PLAYING</span>
        </div>
        <button
          className="retro-font text-xs text-gray-400 hover:text-white px-1"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => setCollapsed((c) => !c)}
        >
          {collapsed ? "▲" : "▼"}
        </button>
      </div>

      {!collapsed && (
        <div className="p-2 space-y-2">
          {/* track info row */}
          <div className="flex items-center gap-2">
            {data.albumImage ? (
              <img
                src={data.albumImage}
                alt="album"
                className="h-10 w-10 flex-shrink-0 object-cover pixelated-border"
              />
            ) : (
              <div className="pixelated-border h-10 w-10 flex-shrink-0 bg-gradient-to-br from-purple-500 to-pink-600" />
            )}
            <div className="min-w-0 flex-1">
              <div className="retro-font truncate text-xs text-white">{data.title}</div>
              <div className="retro-font truncate text-xs text-gray-400">{data.artist}</div>
            </div>
            <EqBars />
          </div>

          {/* progress bar */}
          <div className="h-1 w-full bg-gray-700">
            <div
              className="h-1 bg-green-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="retro-font flex justify-between text-xs text-gray-500">
            <span>{fmt(data.progress!)}</span>
            <span>{fmt(data.duration!)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
