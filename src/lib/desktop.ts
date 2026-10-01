export const TOPBAR_HEIGHT = 36;
export const TASKBAR_HEIGHT = 40;
export interface Viewport {
  width: number;
  height: number;
}
export interface WindowState {
  id: string;
  x: number;
  y: number;
  zIndex: number;
  minimized: boolean;
}

export function windowSize(id: string, viewport: Viewport) {
  const maxWidth = Math.max(1, viewport.width - 32);
  const maxHeight = Math.max(
    1,
    viewport.height - TOPBAR_HEIGHT - TASKBAR_HEIGHT - 24,
  );
  const width = Math.min(
    maxWidth,
    id === "videos"
      ? Math.min(1120, Math.max(700, viewport.width * 0.78))
      : 600,
  );
  const height = Math.min(
    maxHeight,
    id === "videos" ? Math.max(500, (width * 9) / 16 + 176) : 440,
  );
  return { width: Math.round(width), height: Math.round(height) };
}

export function windowPosition(
  id: string,
  x: number,
  y: number,
  viewport: Viewport,
) {
  const size = windowSize(id, viewport);
  return {
    x: Math.max(16, Math.min(x, viewport.width - size.width - 16)),
    y: Math.max(
      TOPBAR_HEIGHT + 12,
      Math.min(y, viewport.height - size.height - TASKBAR_HEIGHT - 12),
    ),
  };
}

// Keep window layers below the menus/taskbar even after repeated focus changes.
export function bringToFront(
  windows: WindowState[],
  id: string,
): WindowState[] {
  if (!windows.some((win) => win.id === id)) return windows;
  const ordered = [...windows]
    .sort((a, b) => a.zIndex - b.zIndex)
    .filter((win) => win.id !== id);
  ordered.push(windows.find((win) => win.id === id)!);
  const layers = new Map(ordered.map((win, i) => [win.id, 40 + i]));
  return windows.map((win) => ({
    ...win,
    zIndex: layers.get(win.id)!,
    minimized: win.id === id ? false : win.minimized,
  }));
}
