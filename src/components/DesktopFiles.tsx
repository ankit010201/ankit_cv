"use client";

import { useState, useEffect, useRef } from "react";
import RetroModal from "./RetroModal";

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
    x: 840,
    y: 60,
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
    x: 1290,
    y: 160,
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
    x: 300,
    y: 530,
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
    x: 1160,
    y: 510,
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
    ext === "jpg"
      ? "bg-blue-100 border-blue-400"
      : ext === "md"
        ? "bg-green-100 border-green-400"
        : "bg-amber-50 border-gray-400";
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
        className="absolute right-0 top-0 border-b-2 border-l-2 border-gray-400 bg-gray-200"
        style={{ width: 10, height: 11 }}
      />
      {/* extension label */}
      <div className="absolute inset-x-0 bottom-1.5 flex justify-center">
        <span className="retro-font text-gray-500" style={{ fontSize: 5 }}>
          {label}
        </span>
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
  return (
    <RetroModal
      title={`${file.name}.${file.ext}`}
      description="Desktop text file."
      onClose={onClose}
    >
      <pre className="retro-font whitespace-pre-wrap text-xs leading-relaxed text-gray-700">
        {file.content}
      </pre>
    </RetroModal>
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

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.focus();
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
      onDragRef.current(
        file.id,
        e.clientX - offset.current.x,
        e.clientY - offset.current.y,
      );
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
    <button
      type="button"
      className="pointer-events-auto absolute flex cursor-pointer select-none flex-col items-center gap-1"
      style={{ left: file.x, top: file.y, zIndex: file.zIndex, width: 64 }}
      aria-label={`Open ${file.name}.${file.ext}`}
      onMouseDown={handleMouseDown}
      onClick={() => {
        if (!didDrag.current) onOpen(file.id);
      }}
    >
      <FileIconShape ext={file.ext} />
      <span
        className="retro-font px-0.5 text-center text-gray-800"
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
    </button>
  );
}

// --- main component ---

export default function DesktopFiles() {
  const [files, setFiles] = useState<DesktopFile[]>(() =>
    FILES.map((f, i) => ({ ...f, zIndex: 15 + i })),
  );
  const [openId, setOpenId] = useState<string | null>(null);
  const zCounter = useRef(20);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const fit = () =>
      setFiles((previous) =>
        previous.map((file) => ({
          ...file,
          x: Math.max(240, Math.min(file.x, window.innerWidth - 80)),
          y: Math.max(48, Math.min(file.y, window.innerHeight - 120)),
        })),
      );
    setFiles(
      FILES.map((file, index) => ({
        ...file,
        zIndex: 15 + index,
        x: Math.max(240, (file.x / 1440) * (window.innerWidth - 80)),
        y: Math.max(48, (file.y / 800) * (window.innerHeight - 160)),
      })),
    );
    setMounted(true);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const handleDrag = (id: string, x: number, y: number) =>
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              x: Math.max(240, Math.min(x, window.innerWidth - 80)),
              y: Math.max(48, Math.min(y, window.innerHeight - 120)),
            }
          : f,
      ),
    );

  const handleFocus = (id: string) => {
    const newZ = ++zCounter.current;
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, zIndex: newZ } : f)),
    );
  };

  const handleOpen = (id: string) => setOpenId(id);
  const handleClose = () => setOpenId(null);

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
        .filter((f) => openId === f.id)
        .map((f) => (
          <FileViewer key={f.id} file={f} onClose={handleClose} />
        ))}
    </>
  );
}
