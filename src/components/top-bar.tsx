"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { sections } from "@/data/sections";

function Menu({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node))
        ref.current?.removeAttribute("open");
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, []);
  return (
    <details
      ref={ref}
      className="relative"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          ref.current?.removeAttribute("open");
          ref.current?.querySelector("summary")?.focus();
          event.stopPropagation();
        }
      }}
    >
      <summary className="cursor-pointer list-none px-1 py-1 text-gray-700 hover:bg-amber-100">
        {label}
      </summary>
      <div
        className="pixelated-window absolute left-0 top-full mt-1 max-h-[70dvh] w-56 overflow-auto bg-amber-50 p-1"
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("button"))
            ref.current?.removeAttribute("open");
        }}
      >
        {children}
      </div>
    </details>
  );
}

const menuButton =
  "retro-font block w-full px-3 py-2 text-left text-xs text-gray-700 hover:bg-amber-200";

function WifiIcon() {
  return (
    <div className="flex items-end gap-px" style={{ height: 14 }}>
      <div className="w-1 bg-gray-600" style={{ height: 5 }}></div>
      <div className="w-1 bg-gray-600" style={{ height: 8 }}></div>
      <div className="w-1 bg-gray-600" style={{ height: 12 }}></div>
      <div className="w-1 bg-gray-600" style={{ height: 14 }}></div>
    </div>
  );
}

function BatteryIcon() {
  return (
    <div className="flex items-center gap-1">
      <div className="relative flex items-center">
        <div
          className="pixelated-border relative bg-gray-100"
          style={{ width: 22, height: 11, border: "2px solid #4b5563" }}
        >
          <div
            className="absolute inset-y-0 left-0 bg-green-500"
            style={{ width: "69%" }}
          />
        </div>
        <div className="bg-gray-600" style={{ width: 3, height: 5 }} />
      </div>
      <span className="font-mono text-xs text-gray-600">69%</span>
    </div>
  );
}

function VolumeIcon() {
  return (
    <div className="flex items-center gap-px">
      <div className="flex items-center">
        <div className="bg-gray-600" style={{ width: 4, height: 8 }} />
        <div
          className="bg-gray-600"
          style={{
            width: 5,
            height: 12,
            clipPath: "polygon(0 25%, 100% 0%, 100% 100%, 0 75%)",
          }}
        />
      </div>
      <div className="ml-0.5 flex flex-col justify-center gap-px">
        <div className="h-px w-2 rounded-full bg-gray-600" />
        <div className="h-px w-3 rounded-full bg-gray-600" />
        <div className="h-px w-2 rounded-full bg-gray-600" />
      </div>
    </div>
  );
}

interface TopBarProps {
  osName: string;
  currentDate: string;
  isMobile?: boolean;
  onOpen: (id: string) => void;
  onHelp: () => void;
  onNextWallpaper: () => void;
  onScreensaver: () => void;
  notifications: boolean;
  onToggleNotifications: () => void;
}

export default function TopBar({
  osName,
  currentDate,
  isMobile = false,
  onOpen,
  onHelp,
  onNextWallpaper,
  onScreensaver,
  notifications,
  onToggleNotifications,
}: TopBarProps) {
  return (
    <div className="relative z-[200] flex h-9 shrink-0 items-center justify-between border-b border-gray-400 bg-gray-200 px-2 text-sm shadow-sm">
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="font-bold">{osName}</span>
        <Menu label="Apps">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              className={menuButton}
              onClick={() => onOpen(section.id)}
            >
              {section.title}
            </button>
          ))}
        </Menu>
        <Menu label="File">
          <button
            type="button"
            className={menuButton}
            onClick={onNextWallpaper}
          >
            Change wallpaper
          </button>
          <button type="button" className={menuButton} onClick={onScreensaver}>
            Start screensaver
          </button>
          <button
            type="button"
            className={menuButton}
            onClick={onToggleNotifications}
            aria-pressed={notifications}
          >
            {notifications ? "Mute" : "Enable"} playful notifications
          </button>
        </Menu>
        <button
          type="button"
          className="px-1 py-1 text-gray-700 hover:bg-amber-100"
          onClick={onHelp}
        >
          Help
        </button>
      </div>

      <div className="flex items-center gap-4">
        {!isMobile && (
          <>
            <WifiIcon />
            <VolumeIcon />
            <BatteryIcon />
          </>
        )}
        <time className="font-mono text-[10px] text-gray-700 sm:text-xs">
          {isMobile ? currentDate.split(" | ")[1] : currentDate}
        </time>
      </div>
    </div>
  );
}
