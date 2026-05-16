"use client";

import { useState, useEffect, useRef } from "react";

interface Note {
  id: number;
  emoji: string;
  title: string;
  lines: string[];
  bg: string;
  border: string;
  header: string;
  rotate: number;
  x: number;
  y: number;
  zIndex: number;
}

const TEMPLATES = [
  {
    id: 1,
    emoji: "🤖",
    title: "blade runner",
    lines: ['"all those moments', "will be lost in time,", 'like tears in rain."', "— roy batty"],
    bg: "bg-cyan-50",
    border: "border-cyan-400",
    header: "bg-cyan-200",
    rotate: -2,
    x: 265, y: 60,
  },
  {
    id: 2,
    emoji: "⭐",
    title: "star wars",
    lines: ["do or do not.", "there is no try.", "", "— yoda"],
    bg: "bg-yellow-50",
    border: "border-yellow-400",
    header: "bg-yellow-200",
    rotate: 3,
    x: 730, y: 440,
  },
  {
    id: 3,
    emoji: "🖖",
    title: "star trek",
    lines: ["live long", "and prosper.", "", "beam me up."],
    bg: "bg-teal-50",
    border: "border-teal-400",
    header: "bg-teal-200",
    rotate: -1,
    x: 1060, y: 50,
  },
  {
    id: 4,
    emoji: "🏀",
    title: "nba",
    lines: ["warriors dynasty.", "4× champs 💍", "", "kobe: 81 pts.", "never forget."],
    bg: "bg-orange-50",
    border: "border-orange-400",
    header: "bg-orange-200",
    rotate: 2,
    x: 420, y: 490,
  },
  {
    id: 5,
    emoji: "⚡",
    title: "pokemon",
    lines: ["fav: eevee 🦊", "runner-up:", "pikachu ⚡", "", "gotta catch em all"],
    bg: "bg-pink-50",
    border: "border-pink-400",
    header: "bg-pink-200",
    rotate: -3,
    x: 620, y: 140,
  },
  {
    id: 6,
    emoji: "🕷️",
    title: "spider-man",
    lines: ["with great power", "comes great", "responsibility.", "", "miles > peter. sorry."],
    bg: "bg-red-50",
    border: "border-red-400",
    header: "bg-red-200",
    rotate: 1,
    x: 910, y: 310,
  },
];

const INITIAL: Note[] = TEMPLATES.map((t, i) => ({ ...t, zIndex: 20 + i }));

function Sticky({
  note,
  onDrag,
  onFocus,
}: {
  note: Note;
  onDrag: (id: number, x: number, y: number) => void;
  onFocus: (id: number) => void;
}) {
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const onDragRef = useRef(onDrag);
  onDragRef.current = onDrag;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    offset.current = { x: e.clientX - note.x, y: e.clientY - note.y };
    setDragging(true);
    onFocus(note.id);
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) =>
      onDragRef.current(note.id, e.clientX - offset.current.x, e.clientY - offset.current.y);
    const onUp = () => setDragging(false);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [dragging, note.id]);

  return (
    <div
      className={`absolute pixelated-window ${note.bg} border-2 ${note.border} cursor-move select-none`}
      style={{ left: note.x, top: note.y, width: 160, transform: `rotate(${note.rotate}deg)`, zIndex: note.zIndex }}
      onMouseDown={handleMouseDown}
    >
      <div className={`${note.header} border-b-2 ${note.border} flex items-center gap-1.5 px-2 py-1`}>
        <span className="text-sm leading-none">{note.emoji}</span>
        <span className="retro-font text-xs">{note.title}</span>
      </div>
      <div className="p-2">
        {note.lines.map((line, i) =>
          line === "" ? (
            <div key={i} className="h-2" />
          ) : (
            <div key={i} className="retro-font text-xs leading-relaxed text-gray-700">
              {line}
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default function StickyNotes() {
  const [notes, setNotes] = useState<Note[]>(INITIAL);
  const zCounter = useRef(26);

  const handleDrag = (id: number, x: number, y: number) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, x, y } : n)));
  };

  const handleFocus = (id: number) => {
    const newZ = ++zCounter.current;
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, zIndex: newZ } : n)));
  };

  return (
    <>
      {notes.map((note) => (
        <Sticky key={note.id} note={note} onDrag={handleDrag} onFocus={handleFocus} />
      ))}
    </>
  );
}
