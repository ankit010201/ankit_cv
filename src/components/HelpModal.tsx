"use client";
import RetroModal from "./RetroModal";

export default function HelpModal({ onClose }: { onClose: () => void }) {
  return (
    <RetroModal
      title="Welcome to PersonalOS"
      description="How to explore Ankit’s desktop."
      onClose={onClose}
    >
      <div className="retro-font space-y-4 text-xs text-gray-700">
        <p>
          Click or tap an icon to open an app. The Apps menu lists everything in
          one place.
        </p>
        <p>
          Use the bottom taskbar to switch between open apps or restore a
          minimized window. Drag a window’s title bar to move it.
        </p>
        <p>
          Use Tab to move between controls, Enter to open an app, and Escape to
          close the window you’re using.
        </p>
        <p>
          Each app has a shareable link in the address bar. Bookmark it to come
          straight back.
        </p>
        <p>
          The File menu changes the wallpaper and lets you try the screensaver
          or turn on playful notifications.
        </p>
      </div>
    </RetroModal>
  );
}
