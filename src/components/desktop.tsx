"use client";

import DesktopIcon from "./desktop-icon";
import { sections } from "../data/sections";

interface DesktopProps {
  onIconClick: (id: string) => void;
  isMobile?: boolean;
}

export default function Desktop({
  onIconClick,
  isMobile = false,
}: DesktopProps) {
  if (isMobile) {
    return (
      <div className="pixelated-grid relative flex w-full flex-1 flex-col items-center justify-start overflow-auto pb-4 pt-6">
        <div className="grid grid-cols-3 gap-2 px-2">
          {sections.map((section) => (
            <DesktopIcon
              key={section.id}
              id={section.id}
              title={section.title}
              icon={section.icon}
              onClick={() => onIconClick(section.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pixelated-grid relative w-full flex-1 overflow-auto">
      <div
        className="inline-grid grid-cols-2 gap-3 p-4"
        style={{ gridAutoRows: "min-content" }}
      >
        {sections.map((section) => (
          <DesktopIcon
            key={section.id}
            id={section.id}
            title={section.title}
            icon={section.icon}
            onClick={() => onIconClick(section.id)}
          />
        ))}
      </div>
    </div>
  );
}
