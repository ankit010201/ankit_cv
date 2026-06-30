"use client";

import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import Desktop from "@/components/desktop";
import TopBar from "@/components/top-bar";
import Window from "@/components/window";
import Taskbar from "@/components/Taskbar";
import NotificationSystem from "@/components/NotificationSystem";
import StickyNotes from "@/components/StickyNotes";
import DesktopFiles from "@/components/DesktopFiles";
import Screensaver from "@/components/Screensaver";
import NowPlayingWidget from "@/components/NowPlayingWidget";
import ContextMenu from "@/components/ContextMenu";
import AboutComputerModal from "@/components/AboutComputerModal";
import LoginScreen from "@/components/login-screen";
import { sections } from "@/data/sections";
import { useMobile } from "@/hooks/useMobile";
import AboutWindow from "@/components/windows/AboutWindow";
import NowWindow from "@/components/windows/NowWindow";
import MusicWindow from "@/components/windows/MusicWindow";
import BookshelfWindow from "@/components/windows/BookshelfWindow";
import WatchlistWindow from "@/components/windows/WatchlistWindow";
import VideosWindow from "@/components/windows/VideosWindow";
import FoodWindow from "@/components/windows/FoodWindow";
import CameraWindow from "@/components/windows/CameraWindow";
import RunningWindow from "@/components/windows/RunningWindow";
import TerminalWindow from "@/components/windows/TerminalWindow";
import GuestbookWindow from "@/components/windows/GuestbookWindow";
import MinesweeperWindow from "@/components/windows/MinesweeperWindow";
import MixtapeWindow from "@/components/windows/MixtapeWindow";

const windowComponents: Record<string, ReactNode> = {
  about:       <AboutWindow />,
  now:         <NowWindow />,
  music:       <MusicWindow />,
  books:       <BookshelfWindow />,
  watch:       <WatchlistWindow />,
  videos:      <VideosWindow />,
  food:        <FoodWindow />,
  camera:      <CameraWindow />,
  running:     <RunningWindow />,
  mixtape:     <MixtapeWindow />,
  guestbook:   <GuestbookWindow />,
  terminal:    <TerminalWindow />,
  minesweeper: <MinesweeperWindow />,
};

const sectionMap = Object.fromEntries(sections.map((s) => [s.id, s]));

interface WindowState {
  id: string;
  x: number;
  y: number;
  zIndex: number;
  minimized: boolean;
}

const TOPBAR_H  = 36;
const TASKBAR_H = 40;
const WIN_W = 600;
const WIN_H = 400;

function getWindowSize(id: string) {
  if (id !== "videos" || typeof window === "undefined") {
    return { width: WIN_W, height: WIN_H };
  }

  const maxWidth = Math.max(320, window.innerWidth - 48);
  const maxHeight = Math.max(320, window.innerHeight - TOPBAR_H - TASKBAR_H - 32);
  const targetWidth = Math.min(1120, Math.round(window.innerWidth * 0.78));
  const width = Math.min(maxWidth, Math.max(700, targetWidth));
  const targetHeight = Math.round((width * 9) / 16 + 176);
  const height = Math.min(maxHeight, Math.max(500, targetHeight));

  return { width, height };
}

const WALLPAPERS = [
  { from: "from-amber-100/90",   to: "to-amber-50/80"   },
  { from: "from-slate-200/90",   to: "to-slate-100/80"  },
  { from: "from-emerald-100/90", to: "to-green-50/80"   },
  { from: "from-violet-100/90",  to: "to-purple-50/80"  },
  { from: "from-rose-100/90",    to: "to-pink-50/80"    },
];

export default function Home() {
  const isMobile = useMobile();
  const [currentDate, setCurrentDate] = useState<string>("");
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [wallpaperIdx, setWallpaperIdx] = useState(0);
  const zCounter = useRef(40);

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit", month: "short", year: "numeric",
        hour: "numeric", minute: "2-digit", hour12: true,
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      const parts = formatter.formatToParts(now);
      const day       = parts.find((p) => p.type === "day")?.value       || "";
      const month     = parts.find((p) => p.type === "month")?.value     || "";
      const year      = parts.find((p) => p.type === "year")?.value      || "";
      const hour      = parts.find((p) => p.type === "hour")?.value      || "";
      const minute    = parts.find((p) => p.type === "minute")?.value    || "";
      const dayPeriod = parts.find((p) => p.type === "dayPeriod")?.value || "";
      setCurrentDate(`${day} ${month} ${year} | ${hour}:${minute} ${dayPeriod}`);
    };
    updateDate();
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);

  const openWindow = (id: string) => {
    setOpenWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        const newZ = ++zCounter.current;
        return prev.map((w) => w.id === id ? { ...w, zIndex: newZ, minimized: false } : w);
      }
      const newZ = ++zCounter.current;
      const count = prev.length;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const { width, height } = getWindowSize(id);
      const x = Math.max(20, Math.min(vw - width - 20, (vw - width) / 2 + count * 40));
      const y = Math.max(TOPBAR_H + 10, Math.min(vh - height - TASKBAR_H - 10, (vh - height - TASKBAR_H) / 2 + count * 40));
      return [...prev, { id, x, y, zIndex: newZ, minimized: false }];
    });
  };

  const closeWindow    = (id: string) => setOpenWindows((prev) => prev.filter((w) => w.id !== id));
  const minimizeWindow = (id: string) => setOpenWindows((prev) => prev.map((w) => w.id === id ? { ...w, minimized: true } : w));
  const focusWindow    = (id: string) => {
    setOpenWindows((prev) => {
      const win = prev.find((w) => w.id === id);
      if (!win) return prev;
      const newZ = ++zCounter.current;
      return prev.map((w) => w.id === id ? { ...w, zIndex: newZ, minimized: false } : w);
    });
  };
  const dragWindow = (id: string, x: number, y: number) =>
    setOpenWindows((prev) => prev.map((w) => w.id === id ? { ...w, x, y } : w));

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    if (isMobile) return;
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, [isMobile]);

  const handleNextWallpaper = useCallback(() => {
    setWallpaperIdx((i) => (i + 1) % WALLPAPERS.length);
  }, []);

  const wp = WALLPAPERS[wallpaperIdx];
  const taskbarWindows = openWindows.map((w) => ({
    id: w.id,
    title: sectionMap[w.id]?.title || w.id,
    icon: sectionMap[w.id]?.icon || "doc",
    minimized: w.minimized,
    zIndex: w.zIndex,
  }));

  return (
    <main
      className="relative h-screen w-full overflow-hidden font-mono text-gray-800"
      onContextMenu={handleContextMenu}
    >
      {!isLoggedIn ? (
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <>
          <div className={`absolute inset-0 bg-gradient-to-br ${wp.from} ${wp.to} transition-colors duration-700`} />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="crt-overlay absolute inset-0 z-20" />

          <div className="relative z-10 flex h-full flex-col" style={{ paddingBottom: TASKBAR_H }}>
            <TopBar osName="PersonalOS" currentDate={currentDate} isMobile={isMobile} />
            <Desktop onIconClick={openWindow} changeBackground={() => {}} isMobile={isMobile} />
          </div>

          {/* Desktop-only elements */}
          {!isMobile && <StickyNotes />}
          {!isMobile && <DesktopFiles />}
          {!isMobile && <NowPlayingWidget />}

          {/* Windows */}
          {openWindows.map((win) => {
            const { width, height } = getWindowSize(win.id);

            return (
              <Window
                key={win.id}
                id={win.id}
                title={sectionMap[win.id]?.title || ""}
                x={win.x}
                y={win.y}
                width={width}
                height={height}
                zIndex={win.zIndex}
                minimized={win.minimized}
                isMobile={isMobile}
                onClose={() => closeWindow(win.id)}
                onMinimize={() => minimizeWindow(win.id)}
                onFocus={() => focusWindow(win.id)}
                onDrag={(x, y) => dragWindow(win.id, x, y)}
              >
                {windowComponents[win.id]}
              </Window>
            );
          })}

          {/* Desktop-only overlays */}
          {!isMobile && contextMenu && (
            <ContextMenu
              x={contextMenu.x}
              y={contextMenu.y}
              onClose={() => setContextMenu(null)}
              onAbout={() => { setShowAbout(true); setContextMenu(null); }}
              onNextWallpaper={() => { handleNextWallpaper(); setContextMenu(null); }}
              onEmptyTrash={() => setContextMenu(null)}
            />
          )}
          {!isMobile && showAbout && (
            <AboutComputerModal onClose={() => setShowAbout(false)} />
          )}

          <NotificationSystem />
          <Taskbar windows={taskbarWindows} onFocus={focusWindow} isMobile={isMobile} />
          <Screensaver />
        </>
      )}
    </main>
  );
}
