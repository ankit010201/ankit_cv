"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";

const TOPBAR_H  = 36;
const TASKBAR_H = 40;

interface WindowProps {
  id: string;
  title: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  zIndex: number;
  minimized: boolean;
  isMobile?: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  onDrag: (x: number, y: number) => void;
  children: React.ReactNode;
}

export default function Window({
  title,
  x,
  y,
  width = 600,
  height = 400,
  zIndex,
  minimized,
  isMobile = false,
  onClose,
  onMinimize,
  onFocus,
  onDrag,
  children,
}: WindowProps) {
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const onDragRef = useRef(onDrag);
  onDragRef.current = onDrag;

  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;
    e.preventDefault();
    dragOffset.current = { x: e.clientX - x, y: e.clientY - y };
    setDragging(true);
    onFocus();
  };

  useEffect(() => {
    if (!dragging || isMobile) return;
    const handleMouseMove = (e: MouseEvent) =>
      onDragRef.current(e.clientX - dragOffset.current.x, e.clientY - dragOffset.current.y);
    const handleMouseUp = () => setDragging(false);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, isMobile]);

  if (isMobile) {
    return (
      <div
        className="pixelated-window fixed bg-amber-50"
        style={{
          left: 0,
          right: 0,
          top: TOPBAR_H,
          bottom: TASKBAR_H,
          zIndex,
          display: minimized ? "none" : undefined,
          height: `calc(100dvh - ${TOPBAR_H}px - ${TASKBAR_H}px)`,
        }}
        onMouseDown={onFocus}
      >
        {/* mobile title bar */}
        <div className="pixelated-border flex select-none items-center justify-between bg-amber-200 px-3 py-3">
          <div className="flex items-center gap-2">
            <div className="pixelated-border h-4 w-4 bg-gray-700" />
            <span className="retro-font text-sm">{title}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); onMinimize(); }}
              className="pixelated-button retro-font bg-amber-100 px-3 py-1 text-sm"
            >
              –
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="pixelated-button retro-font bg-amber-300 px-3 py-1 text-sm"
            >
              X
            </button>
          </div>
        </div>
        <div
          className="overflow-auto p-4"
          style={{ height: `calc(100dvh - ${TOPBAR_H}px - ${TASKBAR_H}px - 48px)` }}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className="pixelated-window absolute bg-amber-50"
      style={{ left: x, top: y, width, height, zIndex, display: minimized ? "none" : undefined }}
      onMouseDown={onFocus}
    >
      <div
        className="pixelated-border flex cursor-move select-none items-center justify-between bg-amber-200 p-2"
        onMouseDown={handleTitleMouseDown}
      >
        <div className="flex items-center">
          <div className="pixelated-border mr-2 h-4 w-4 bg-gray-700" />
          <span className="retro-font text-sm">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="pixelated-button retro-font bg-amber-100 px-2 text-sm"
          >
            –
          </button>
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="pixelated-button retro-font bg-amber-300 px-2 text-sm"
          >
            X
          </button>
        </div>
      </div>
      <div className="h-[calc(100%-40px)] overflow-auto p-4">{children}</div>
    </div>
  );
}
