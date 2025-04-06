"use client";

import DesktopIcon from "./desktop-icon";
import { sections } from "@/lib/data";

interface DesktopProps {
  onIconClick: (sectionId: string) => void;
  changeBackground: (newBackground: string) => void;
}

export default function Desktop({
  onIconClick,
  changeBackground,
}: DesktopProps) {
  const handleSettingsClick = () => {
    const newBackground = prompt(
      "Enter URL for background image:",
      "/background.jpg",
    );
    if (newBackground) {
      changeBackground(newBackground);
    }
  };

  return (
    <div className="flex-1 p-4">
      <div className="flex w-24 flex-col items-start space-y-6">
        {Object.entries(sections).map(([id, section]) => (
          <DesktopIcon
            key={id}
            id={id}
            icon={section.icon}
            label={section.title}
            onClick={() => onIconClick(id)}
          />
        ))}

        <DesktopIcon
          id="settings"
          icon="settings"
          label="Settings"
          onClick={handleSettingsClick}
        />
      </div>
    </div>
  );
}
