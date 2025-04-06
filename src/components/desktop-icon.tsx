"use client";

import {
  User,
  Briefcase,
  GraduationCap,
  FolderGit2,
  BookOpen,
  Settings,
  Mail,
  Calendar,
  FileText,
} from "lucide-react";

interface DesktopIconProps {
  id: string;
  title: string;
  icon: string;
  onClick: () => void;
}

export default function DesktopIcon({
  id,
  title,
  icon,
  onClick,
}: DesktopIconProps) {
  const getRetroIcon = () => {
    switch (icon) {
      case "user":
        return (
          <div className="flex h-full w-full items-center justify-center">
            <div className="pixelated-border h-8 w-8 bg-gray-700">
              <div className="mx-auto mt-1 h-6 w-6 rounded-full bg-gray-300"></div>
              <div className="mx-auto mt-1 h-3 w-6 bg-gray-300"></div>
            </div>
          </div>
        );
      case "folder":
        return (
          <div className="flex h-full w-full items-center justify-center">
            <div className="pixelated-border h-6 w-8 bg-amber-500">
              <div className="pixelated-border mx-auto mt-1 h-4 w-6 bg-amber-400"></div>
            </div>
          </div>
        );
      case "code":
        return (
          <div className="flex h-full w-full items-center justify-center">
            <div className="pixelated-border h-8 w-8 bg-gray-700">
              <div className="mx-auto mt-2 h-1 w-6 bg-gray-300"></div>
              <div className="mx-auto mt-1 h-1 w-4 bg-gray-300"></div>
              <div className="mx-auto mt-1 h-1 w-6 bg-gray-300"></div>
              <div className="mx-auto mt-1 h-1 w-4 bg-gray-300"></div>
            </div>
          </div>
        );
      case "mail":
        return (
          <div className="flex h-full w-full items-center justify-center">
            <div className="pixelated-border h-6 w-8 bg-blue-500">
              <div className="pixelated-border mx-auto mt-1 h-4 w-6 bg-blue-400"></div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex h-full w-full items-center justify-center">
            <div className="pixelated-border h-8 w-8 bg-gray-300"></div>
          </div>
        );
    }
  };

  return (
    <button
      onClick={onClick}
      className="pixelated-button flex w-24 flex-col items-center bg-amber-50 p-2 hover:bg-amber-100"
    >
      <div className="pixelated mb-1 h-12 w-12">{getRetroIcon()}</div>
      <span className="retro-font text-center text-xs">{title}</span>
    </button>
  );
}
