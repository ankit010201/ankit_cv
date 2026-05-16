"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const photos = [
  { file: "IMG_0439.jpg", label: "fuji from the shrine" },
  { file: "IMG_0374.jpg", label: "great buddha, kamakura" },
  { file: "IMG_0096.jpg", label: "lanterns, tokyo" },
  { file: "IMG_0090.jpg", label: "senso-ji pagoda, tokyo" },
  { file: "IMG_9909.jpg", label: "palace of fine arts, sf" },
  { file: "IMG_9811.jpg", label: "f1 pit lane" },
  { file: "IMG_9779.jpg", label: "concert" },
  { file: "IMG_9457.jpg", label: "hot air balloon" },
];

export default function CameraWindow() {
  const [selected, setSelected] = useState<(typeof photos)[0] | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const lightbox = selected && mounted && createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80"
      onClick={() => setSelected(null)}
    >
      <div
        className="pixelated-window bg-amber-50"
        style={{ maxWidth: "80vw", maxHeight: "80vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pixelated-border flex items-center justify-between bg-amber-200 p-2">
          <div className="retro-font flex items-center gap-2 text-xs">
            <div className="pixelated-border h-4 w-4 bg-gray-700"></div>
            {selected.label}
          </div>
          <button
            onClick={() => setSelected(null)}
            className="pixelated-button retro-font bg-amber-300 px-2 text-sm"
          >
            X
          </button>
        </div>
        <div className="p-2">
          <img
            src={`/photos/${selected.file}`}
            alt={selected.label}
            style={{ maxWidth: "76vw", maxHeight: "70vh" }}
            className="block object-contain"
          />
        </div>
      </div>
    </div>,
    document.body,
  );

  return (
    <div className="retro-font space-y-3 text-xs">
      <div className="text-gray-400">// shot on iphone, no edits</div>

      <div className="grid grid-cols-2 gap-2">
        {photos.map((p, i) => (
          <div
            key={i}
            className="pixelated-border cursor-pointer overflow-hidden hover:opacity-90"
            onClick={() => setSelected(p)}
          >
            <img
              src={`/photos/${p.file}`}
              alt={p.label}
              className="h-28 w-full object-cover"
            />
            <div className="bg-amber-50 px-1 py-0.5 text-gray-600">{p.label}</div>
          </div>
        ))}
      </div>

      <div className="pixelated-border bg-amber-100 p-2">
        <div className="text-gray-500">gear: iphone 14 pro</div>
      </div>

      {lightbox}
    </div>
  );
}
