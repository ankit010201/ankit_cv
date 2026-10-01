"use client";

import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&";

function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < cols; i++) {
        // leading char is bright white, trail is green
        const isLead = drops[i] * fontSize < canvas.height;
        ctx.fillStyle = isLead ? "#afffaf" : "#00aa00";
        ctx.font = `${fontSize}px monospace`;
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const id = setInterval(draw, 40);
    return () => clearInterval(id);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}

export default function Screensaver({ onWake }: { onWake: () => void }) {
  const wake = useCallback(() => onWake(), [onWake]);
  useEffect(() => {
    const events = ["pointerdown", "keydown", "touchstart", "wheel"] as const;
    events.forEach((event) =>
      document.addEventListener(event, wake, { passive: true }),
    );
    return () =>
      events.forEach((event) => document.removeEventListener(event, wake));
  }, [wake]);
  return createPortal(
    <div className="fixed inset-0 z-[99999] bg-black" onClick={wake}>
      <MatrixCanvas />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4">
        <div className="retro-font text-lg text-green-400">PersonalOS</div>
        <div className="retro-font text-xs text-green-200">
          press any key or tap to return
        </div>
      </div>
      <button
        autoFocus
        className="pixelated-button retro-font absolute bottom-8 left-1/2 -translate-x-1/2 bg-amber-100 px-3 py-2 text-xs"
        onClick={wake}
      >
        Exit screensaver
      </button>
    </div>,
    document.body,
  );
}
