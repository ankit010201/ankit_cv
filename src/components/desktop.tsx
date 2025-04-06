"use client";

import DesktopIcon from "./desktop-icon";
import { sections } from "../data/sections";

interface DesktopProps {
  onIconClick: (id: string) => void;
  changeBackground: (background: string) => void;
}

export default function Desktop({
  onIconClick,
  changeBackground,
}: DesktopProps) {
  return (
    <div className="pixelated-grid relative h-full w-full">
      <div className="flex flex-col space-y-4 p-4">
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
