"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
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
import HelpModal from "@/components/HelpModal";
import {
  bringToFront,
  windowSize,
  windowPosition,
  TASKBAR_HEIGHT,
  type WindowState,
} from "@/lib/desktop";
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
import ActivityWindow from "@/components/windows/ActivityWindow";
import TerminalWindow from "@/components/windows/TerminalWindow";
import MinesweeperWindow from "@/components/windows/MinesweeperWindow";
import MixtapeWindow from "@/components/windows/MixtapeWindow";

const windowComponents: Record<string, ReactNode> = {
  about: <AboutWindow />,
  now: <NowWindow />,
  music: <MusicWindow />,
  books: <BookshelfWindow />,
  watch: <WatchlistWindow />,
  videos: <VideosWindow />,
  food: <FoodWindow />,
  camera: <CameraWindow />,
  running: <ActivityWindow />,
  mixtape: <MixtapeWindow />,
  terminal: <TerminalWindow />,
  minesweeper: <MinesweeperWindow />,
};

const sectionMap = Object.fromEntries(sections.map((s) => [s.id, s]));

const WALLPAPERS = [
  { from: "from-amber-100/90", to: "to-amber-50/80" },
  { from: "from-slate-200/90", to: "to-slate-100/80" },
  { from: "from-emerald-100/90", to: "to-green-50/80" },
  { from: "from-violet-100/90", to: "to-purple-50/80" },
  { from: "from-rose-100/90", to: "to-pink-50/80" },
];

export default function Home() {
  const isMobile = useMobile();
  const [currentDate, setCurrentDate] = useState<string>("");
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [wallpaperIdx, setWallpaperIdx] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [screensaver, setScreensaver] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [viewport, setViewport] = useState({ width: 1024, height: 768 });

  const finishBoot = useCallback(() => {
    setIsLoggedIn(true);
    try {
      sessionStorage.setItem("personal-os-booted", "true");
    } catch {
      /* storage may be blocked */
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      finishBoot();
    try {
      if (sessionStorage.getItem("personal-os-booted")) finishBoot();
    } catch {
      /* storage may be blocked */
    }
    const resize = () => {
      const next = { width: window.innerWidth, height: window.innerHeight };
      setViewport(next);
      setOpenWindows((previous) =>
        previous.map((win) => ({
          ...win,
          ...windowPosition(win.id, win.x, win.y, next),
        })),
      );
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [finishBoot]);

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      const parts = formatter.formatToParts(now);
      const day = parts.find((p) => p.type === "day")?.value || "";
      const month = parts.find((p) => p.type === "month")?.value || "";
      const year = parts.find((p) => p.type === "year")?.value || "";
      const hour = parts.find((p) => p.type === "hour")?.value || "";
      const minute = parts.find((p) => p.type === "minute")?.value || "";
      const dayPeriod = parts.find((p) => p.type === "dayPeriod")?.value || "";
      setCurrentDate(
        `${day} ${month} ${year} | ${hour}:${minute} ${dayPeriod}`,
      );
    };
    updateDate();
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);

  const openWindow = useCallback((id: string, updateLink = true) => {
    if (!Object.hasOwn(sectionMap, id)) return;
    const viewport = { width: window.innerWidth, height: window.innerHeight };
    setOpenWindows((previous) => {
      if (previous.some((win) => win.id === id))
        return bringToFront(previous, id);
      const { width, height } = windowSize(id, viewport);
      const position = windowPosition(
        id,
        (viewport.width - width) / 2 + previous.length * 24,
        (viewport.height - height) / 2 + previous.length * 24,
        viewport,
      );
      return bringToFront(
        [...previous, { id, ...position, zIndex: 0, minimized: false }],
        id,
      );
    });
    if (updateLink && window.location.hash !== `#${id}`)
      window.history.replaceState(null, "", `#${id}`);
    if (updateLink) {
      window.requestAnimationFrame(() =>
        document.querySelector<HTMLElement>(`[data-window="${id}"]`)?.focus(),
      );
    }
  }, []);

  useEffect(() => {
    const restore = () => openWindow(window.location.hash.slice(1), false);
    restore();
    window.addEventListener("hashchange", restore);
    return () => window.removeEventListener("hashchange", restore);
  }, [openWindow]);

  const closeWindow = (id: string) => {
    setOpenWindows((previous) => previous.filter((win) => win.id !== id));
    if (window.location.hash === `#${id}`)
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    document.getElementById(`desktop-${id}`)?.focus();
  };
  const minimizeWindow = (id: string) => {
    setOpenWindows((previous) =>
      previous.map((win) =>
        win.id === id ? { ...win, minimized: true } : win,
      ),
    );
    document.getElementById(`desktop-${id}`)?.focus();
  };
  const focusWindow = (id: string) => {
    setOpenWindows((previous) => bringToFront(previous, id));
    if (window.location.hash !== `#${id}`)
      window.history.replaceState(null, "", `#${id}`);
  };
  const dragWindow = (id: string, x: number, y: number) =>
    setOpenWindows((previous) =>
      previous.map((win) =>
        win.id === id ? { ...win, ...windowPosition(id, x, y, viewport) } : win,
      ),
    );
  const activeId = [...openWindows]
    .filter((win) => !win.minimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0]?.id;

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      if (
        isMobile ||
        (e.target as HTMLElement).closest(
          "[data-window], button, a, input, textarea",
        )
      )
        return;
      e.preventDefault();
      setContextMenu({ x: e.clientX, y: e.clientY });
    },
    [isMobile],
  );

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
      className="relative h-dvh w-full overflow-hidden font-mono text-gray-800"
      onContextMenu={handleContextMenu}
    >
      {!isLoggedIn ? (
        <LoginScreen onLogin={finishBoot} />
      ) : (
        <>
          <div
            className={`absolute inset-0 bg-gradient-to-br ${wp.from} ${wp.to} transition-colors duration-700`}
          />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="crt-overlay absolute inset-0 z-20" />

          <div
            className="relative flex h-full flex-col"
            style={{ paddingBottom: TASKBAR_HEIGHT }}
          >
            <TopBar
              osName="PersonalOS"
              currentDate={currentDate}
              isMobile={isMobile}
              onOpen={openWindow}
              onHelp={() => setShowHelp(true)}
              onNextWallpaper={handleNextWallpaper}
              onScreensaver={() => setScreensaver(true)}
              notifications={notifications}
              onToggleNotifications={() => setNotifications((value) => !value)}
            />
            <Desktop onIconClick={openWindow} isMobile={isMobile} />
          </div>

          {/* Desktop-only elements */}
          {!isMobile && (
            <div className="pointer-events-none absolute inset-0 z-[5]">
              <StickyNotes />
            </div>
          )}
          {!isMobile && (
            <div className="pointer-events-none absolute inset-0 z-[6]">
              <DesktopFiles />
            </div>
          )}
          {!isMobile && <NowPlayingWidget />}

          {/* Windows */}
          {openWindows.map((win) => {
            const { width, height } = windowSize(win.id, viewport);

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
                active={win.id === activeId}
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
              onAbout={() => {
                setShowAbout(true);
                setContextMenu(null);
              }}
              onNextWallpaper={() => {
                handleNextWallpaper();
                setContextMenu(null);
              }}
            />
          )}
          {!isMobile && showAbout && (
            <AboutComputerModal onClose={() => setShowAbout(false)} />
          )}

          {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
          {notifications && <NotificationSystem />}
          <Taskbar
            windows={taskbarWindows}
            onFocus={openWindow}
            isMobile={isMobile}
          />
          {screensaver && <Screensaver onWake={() => setScreensaver(false)} />}
        </>
      )}
    </main>
  );
}
