"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface DesktopFile {
  id: string;
  name: string;
  ext: "txt" | "jpg" | "md";
  x: number;
  y: number;
  zIndex: number;
  content: string;
}

const FILES: Omit<DesktopFile, "zIndex">[] = [
  {
    id: "readme",
    name: "README",
    ext: "txt",
    x: 840, y: 60,
    content: `WELCOME TO PERSONALOS v1.0
==========================

hi! you found my corner of
the internet.

built with:
  next.js, tailwind, typescript,
  and too much free time

this whole thing runs on:
  - real spotify data
  - real strava activities
  - real photos from my iphone
  - real opinions about movies
  - very fake battery stats

feel free to poke around :)

— ankit`,
  },
  {
    id: "ideas",
    name: "ideas",
    ext: "txt",
    x: 1290, y: 160,
    content: `HALF-BAKED IDEAS
================
- build a personal OS website ✓
- start film photography
- run a sub-6:00 mile (pb: 6:10)
- build something 1M ppl use
- move to tokyo for 3 months
- learn to make ramen from scratch
- read more fiction
- write more, think less
- find the best bowl of ramen in SF
- open source something cool`,
  },
  {
    id: "todo",
    name: "todo",
    ext: "txt",
    x: 300, y: 530,
    content: `TODO.txt
========
[ ] figure out why my plants keep dying
[ ] respond to that linkedin dm (2023)
[ ] stop saying "sounds good" to everything
[ ] delete the 847 screenshots on my phone
[ ] find out what that sound in my apt is
[ ] learn what APR actually means
[ ] finish that side project (the 2024 one)
[ ] fold the laundry. it's been 4 days.
[ ] buy a couch (going on 6 months now)
[ ] figure out if i actually like cilantro
[ ] stop opening twitter then immediately
    closing it
[ ] text back. you know who you are.
[x] procrastinate on this todo list`,
  },
  {
    id: "bucket",
    name: "bucket_list",
    ext: "txt",
    x: 1160, y: 510,
    content: `BUCKET LIST
===========
[x] run a marathon
[x] run a half marathon
[x] hot air balloon ride
[x] do a polar plunge
[x] solo travel
[x] michelin star meal
[x] create a startup
[x] live in a city
[x] learn to snowboard
[x] learn to ski
[ ] learn to fly a plane
[ ] go to all 7 continents
[ ] go skydiving
[ ] go scuba diving
[ ] go backpacking
[ ] hike half dome
[ ] learn to surf
[ ] get a dog
[ ] view the milky way
[ ] view the northern lights
[ ] visit all 7 wonders
[ ] become semi-ambidextrous
[ ] learn to play chess
[ ] learn to drive stick`,
  },
];

// --- file icon ---

function FileIconShape({ ext }: { ext: DesktopFile["ext"] }) {
  const color =
    ext === "jpg" ? "bg-blue-100 border-blue-400" :
    ext === "md"  ? "bg-green-100 border-green-400" :
                    "bg-amber-50 border-gray-400";
  const label = ext.toUpperCase();
  return (
    <div className="relative" style={{ width: 32, height: 40 }}>
      {/* body */}
      <div
        className={`absolute inset-0 border-2 ${color}`}
        style={{ clipPath: "polygon(0 0, 72% 0, 100% 28%, 100% 100%, 0 100%)" }}
      />
      {/* folded corner */}
      <div
        className="absolute top-0 right-0 border-b-2 border-l-2 border-gray-400 bg-gray-200"
        style={{ width: 10, height: 11 }}
      />
      {/* extension label */}
      <div className="absolute bottom-1.5 inset-x-0 flex justify-center">
        <span className="retro-font text-gray-500" style={{ fontSize: 5 }}>{label}</span>
      </div>
    </div>
  );
}

// --- viewer window (portal) ---

interface ViewerProps {
  file: DesktopFile;
  onClose: () => void;
}

function FileViewer({ file, onClose }: ViewerProps) {
  const [pos, setPos] = useState({ x: file.x + 40, y: Math.max(50, file.y - 60) });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const posRef = useRef(pos);
  posRef.current = pos;

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) =>
      setPos({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
    const onUp = () => setDragging(false);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  const handleTitleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    setDragging(true);
  };

  return createPortal(
    <div
      className="pixelated-window absolute bg-amber-50"
      style={{ left: pos.x, top: pos.y, width: 320, zIndex: 9990 }}
    >
      {/* title bar */}
      <div
        className="pixelated-border flex cursor-move select-none items-center justify-between bg-amber-200 p-2"
        onMouseDown={handleTitleMouseDown}
      >
        <div className="flex items-center gap-2">
          <div className="pixelated-border h-4 w-4 bg-gray-700" />
          <span className="retro-font text-xs">{file.name}.{file.ext}</span>
        </div>
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={onClose}
          className="pixelated-button retro-font bg-amber-300 px-2 text-sm"
        >
          X
        </button>
      </div>
      {/* content */}
      <div className="h-56 overflow-auto p-3">
        <pre className="retro-font whitespace-pre-wrap text-xs leading-relaxed text-gray-700">
          {file.content}
        </pre>
      </div>
    </div>,
    document.body,
  );
}

// --- draggable file icon ---

function DraggableFile({
  file,
  onDrag,
  onFocus,
  onOpen,
}: {
  file: DesktopFile;
  onDrag: (id: string, x: number, y: number) => void;
  onFocus: (id: string) => void;
  onOpen: (id: string) => void;
}) {
  const [dragging, setDragging] = useState(false);
  const didDrag = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const onDragRef = useRef(onDrag);
  onDragRef.current = onDrag;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    didDrag.current = false;
    offset.current = { x: e.clientX - file.x, y: e.clientY - file.y };
    setDragging(true);
    onFocus(file.id);
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      didDrag.current = true;
      onDragRef.current(file.id, e.clientX - offset.current.x, e.clientY - offset.current.y);
    };
    const onUp = () => setDragging(false);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [dragging, file.id]);

  return (
    <div
      className="absolute flex cursor-pointer flex-col items-center gap-1 select-none"
      style={{ left: file.x, top: file.y, zIndex: file.zIndex, width: 64 }}
      onMouseDown={handleMouseDown}
      onClick={() => { if (!didDrag.current) onOpen(file.id); }}
    >
      <FileIconShape ext={file.ext} />
      <span
        className="retro-font text-center text-gray-800 px-0.5"
        style={{
          fontSize: 8,
          background: "rgba(255,235,180,0.7)",
          lineHeight: 1.6,
          maxWidth: 64,
          wordBreak: "break-all",
        }}
      >
        {file.name}.{file.ext}
      </span>
    </div>
  );
}

// --- main component ---

export default function DesktopFiles() {
  const [files, setFiles] = useState<DesktopFile[]>(() =>
    FILES.map((f, i) => ({ ...f, zIndex: 15 + i })),
  );
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const zCounter = useRef(20);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleDrag = (id: string, x: number, y: number) =>
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, x, y } : f)));

  const handleFocus = (id: string) => {
    const newZ = ++zCounter.current;
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, zIndex: newZ } : f)));
  };

  const handleOpen  = (id: string) => setOpenIds((s) => new Set(s).add(id));
  const handleClose = (id: string) => setOpenIds((s) => { const n = new Set(s); n.delete(id); return n; });

  if (!mounted) return null;

  return (
    <>
      {files.map((file) => (
        <DraggableFile
          key={file.id}
          file={file}
          onDrag={handleDrag}
          onFocus={handleFocus}
          onOpen={handleOpen}
        />
      ))}
      {files
        .filter((f) => openIds.has(f.id))
        .map((f) => (
          <FileViewer key={f.id} file={f} onClose={() => handleClose(f.id)} />
        ))}
    </>
  );
}
