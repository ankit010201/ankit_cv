"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent,
} from "react";
import { TOPBAR_HEIGHT, TASKBAR_HEIGHT } from "@/lib/desktop";

interface WindowProps {
  id: string;
  title: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  zIndex: number;
  minimized: boolean;
  active: boolean;
  isMobile?: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  onDrag: (x: number, y: number) => void;
  children: ReactNode;
}

export default function Window({
  id,
  title,
  x,
  y,
  width = 600,
  height = 440,
  zIndex,
  minimized,
  active,
  isMobile = false,
  onClose,
  onMinimize,
  onFocus,
  onDrag,
  children,
}: WindowProps) {
  const panel = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const dragRef = useRef(onDrag);
  dragRef.current = onDrag;

  useEffect(() => {
    if (
      active &&
      !minimized &&
      panel.current &&
      !panel.current.contains(document.activeElement)
    )
      panel.current.focus();
  }, [active, minimized]);

  useEffect(() => {
    if (!dragging) return;
    const move = (event: globalThis.PointerEvent) =>
      dragRef.current(
        event.clientX - offset.current.x,
        event.clientY - offset.current.y,
      );
    const stop = () => setDragging(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
  }, [dragging]);

  const startDrag = (event: PointerEvent) => {
    if (
      isMobile ||
      event.button !== 0 ||
      (event.target as HTMLElement).closest("button")
    )
      return;
    event.preventDefault();
    offset.current = { x: event.clientX - x, y: event.clientY - y };
    setDragging(true);
    onFocus();
  };

  return (
    <div
      ref={panel}
      role="region"
      aria-labelledby={`window-title-${id}`}
      data-window={id}
      tabIndex={-1}
      className={`pixelated-window flex flex-col bg-amber-50 outline-none ${isMobile ? "fixed" : "absolute"}`}
      style={
        isMobile
          ? {
              left: 0,
              right: 0,
              top: TOPBAR_HEIGHT,
              bottom: TASKBAR_HEIGHT,
              zIndex,
              display: minimized ? "none" : undefined,
            }
          : {
              left: x,
              top: y,
              width,
              height,
              zIndex,
              display: minimized ? "none" : undefined,
            }
      }
      onPointerDown={() => {
        if (!active) onFocus();
      }}
      onFocus={() => {
        if (!active) onFocus();
      }}
      onKeyDown={(event) => {
        if (
          event.key === "Escape" &&
          !(event.target as HTMLElement).closest('[role="dialog"]')
        ) {
          event.preventDefault();
          event.stopPropagation();
          onClose();
        }
      }}
    >
      <div
        className={`pixelated-border flex shrink-0 select-none items-center justify-between gap-2 bg-amber-200 p-2 ${isMobile ? "min-h-12" : "min-h-10 cursor-move touch-none"}`}
        onPointerDown={startDrag}
      >
        <div className="flex min-w-0 items-center gap-2">
          <div
            aria-hidden="true"
            className="pixelated-border h-4 w-4 shrink-0 bg-gray-700"
          />
          <span
            id={`window-title-${id}`}
            className="retro-font truncate text-sm"
          >
            {title}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label={`Minimize ${title}`}
            title="Minimize"
            onClick={(event) => {
              event.stopPropagation();
              onMinimize();
            }}
            className="pixelated-button retro-font min-h-8 min-w-8 bg-amber-100 px-2"
          >
            –
          </button>
          <button
            type="button"
            aria-label={`Close ${title}`}
            title="Close (Esc)"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            className="pixelated-button retro-font min-h-8 min-w-8 bg-amber-300 px-2"
          >
            X
          </button>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-auto overscroll-contain p-4">
        {children}
      </div>
    </div>
  );
}
