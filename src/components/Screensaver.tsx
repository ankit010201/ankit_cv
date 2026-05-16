"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&";

function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = window.innerWidth;
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

const INACTIVITY_MS = 15_000;

export default function Screensaver() {
  const [active, setActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const wake = useCallback(() => {
    setActive(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setActive(true), INACTIVITY_MS);
  }, []);

  useEffect(() => {
    const events = ["mousemove", "mousedown", "keydown", "touchstart", "wheel"] as const;
    events.forEach((ev) => document.addEventListener(ev, wake, { passive: true }));
    timerRef.current = setTimeout(() => setActive(true), INACTIVITY_MS);
    return () => {
      events.forEach((ev) => document.removeEventListener(ev, wake));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [wake]);

  if (!active) return null;

  return createPortal(
    <div
      className="fixed inset-0 cursor-none bg-black"
      style={{ zIndex: 99999 }}
      onClick={wake}
    >
      <MatrixCanvas />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4">
        <div className="retro-font text-lg text-green-400" style={{ textShadow: "0 0 20px #00ff00" }}>
          PersonalOS
        </div>
        <div className="retro-font text-xs text-green-700 animate-pulse">
          move mouse or click to wake
        </div>
      </div>
    </div>,
    document.body,
  );
}
