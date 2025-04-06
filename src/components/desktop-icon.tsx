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
  icon: string;
  label: string;
  onClick: () => void;
}

export default function DesktopIcon({
  id,
  icon,
  label,
  onClick,
}: DesktopIconProps) {
  const getIcon = () => {
    switch (icon) {
      case "user":
        return <User className="h-6 w-6" />;
      case "education":
        return <GraduationCap className="h-6 w-6" />;
      case "experience":
        return <Briefcase className="h-6 w-6" />;
      case "projects":
        return <FolderGit2 className="h-6 w-6" />;
      case "blog":
        return <BookOpen className="h-6 w-6" />;
      case "settings":
        return <Settings className="h-6 w-6" />;
      case "contact":
        return <Mail className="h-6 w-6" />;
      case "calendar":
        return <Calendar className="h-6 w-6" />;
      case "resume":
        return <FileText className="h-6 w-6" />;
      default:
        return <FileText className="h-6 w-6" />;
    }
  };

  return (
    <button
      className="flex w-full flex-col items-center text-center"
      onClick={onClick}
    >
      <div className="rounded border-2 border-gray-400 bg-gray-200 p-2 shadow-md hover:bg-gray-300 active:border-gray-600 active:shadow-inner">
        {getIcon()}
      </div>
      <div className="mt-1 bg-gray-200/80 px-1 text-xs">{label}</div>
    </button>
  );
}
