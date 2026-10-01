"use client";

const iconEmoji: Record<string, string> = {
  user: "👤",
  clock: "🕐",
  music: "🎵",
  book: "📚",
  film: "🎬",
  video: "🎥",
  fork: "🍽️",
  camera: "📷",
  activity: "🚴",
  tape: "📼",
  term: "⌨️",
  bomb: "💣",
};

interface TaskbarWindow {
  id: string;
  title: string;
  icon: string;
  minimized: boolean;
  zIndex: number;
}

interface TaskbarProps {
  windows: TaskbarWindow[];
  onFocus: (id: string) => void;
  isMobile?: boolean;
}

export default function Taskbar({
  windows,
  onFocus,
  isMobile = false,
}: TaskbarProps) {
  if (windows.length === 0) return null;

  const maxZ = Math.max(
    ...windows.filter((w) => !w.minimized).map((w) => w.zIndex),
  );

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-[200] flex items-center gap-1.5 overflow-x-auto border-t-2 border-amber-400 bg-amber-200 px-2"
      style={{ height: 40 }}
      aria-label="Open apps"
    >
      {windows.map((win) => {
        const isActive = win.zIndex === maxZ && !win.minimized;
        return (
          <button
            key={win.id}
            aria-pressed={isActive}
            aria-label={`${win.minimized ? "Restore" : "Switch to"} ${win.title}`}
            onClick={() => onFocus(win.id)}
            className={`retro-font pixelated-button flex flex-shrink-0 items-center gap-1.5 px-2 text-xs ${
              isMobile ? "max-w-[160px] py-2" : "max-w-[140px] py-1"
            } ${
              isActive
                ? "bg-amber-400 text-amber-900"
                : win.minimized
                  ? "bg-amber-50 text-gray-500"
                  : "bg-amber-100 text-gray-700"
            }`}
          >
            <span className="text-sm leading-none">
              {iconEmoji[win.icon] ?? "📄"}
            </span>
            <span className="truncate">{win.title}</span>
          </button>
        );
      })}
    </div>
  );
}
