"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onAbout: () => void;
  onNextWallpaper: () => void;
  onEmptyTrash: () => void;
}

export default function ContextMenu({ x, y, onClose, onAbout, onNextWallpaper, onEmptyTrash }: ContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    // Use a timeout so this listener doesn't catch the same right-click that opened the menu
    const t = setTimeout(() => {
      document.addEventListener("mousedown", handle);
      document.addEventListener("keydown", handleKey);
    }, 0);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const menuW = 192;
  const menuH = 160;
  const left = x + menuW > window.innerWidth  ? x - menuW : x;
  const top  = y + menuH > window.innerHeight ? y - menuH : y;

  const items = [
    { label: "About This Computer", icon: "💻", action: onAbout,         dividerAfter: true  },
    { label: "Change Wallpaper",    icon: "🎨", action: onNextWallpaper, dividerAfter: false },
    { label: "Empty Trash",         icon: "🗑️", action: onEmptyTrash,    dividerAfter: true  },
    { label: "Dismiss",             icon: "✕",  action: onClose,         dividerAfter: false },
  ];

  return createPortal(
    <div
      ref={ref}
      className="pixelated-window fixed w-48 bg-amber-50 py-1"
      style={{ left, top, zIndex: 9998 }}
    >
      {items.map((item) => (
        <div key={item.label}>
          <button
            className="retro-font flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-amber-200"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => { item.action(); onClose(); }}
          >
            <span className="w-4 text-sm leading-none">{item.icon}</span>
            {item.label}
          </button>
          {item.dividerAfter && <div className="mx-2 my-0.5 border-t border-amber-300" />}
        </div>
      ))}
    </div>,
    document.body,
  );
}
