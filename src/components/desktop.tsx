"use client";

import DesktopIcon from "./desktop-icon";
import { sections } from "../data/sections";

interface DesktopProps {
  onIconClick: (id: string) => void;
  changeBackground: (background: string) => void;
  isMobile?: boolean;
}

export default function Desktop({ onIconClick, isMobile = false }: DesktopProps) {
  if (isMobile) {
    return (
      <div className="pixelated-grid relative flex-1 w-full overflow-auto flex flex-col items-center justify-start pt-6 pb-4">
        <div className="grid grid-cols-3 gap-3 px-4">
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
    <div className="pixelated-grid relative flex-1 w-full overflow-auto">
      <div className="inline-grid grid-cols-2 gap-3 p-4" style={{ gridAutoRows: "min-content" }}>
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
