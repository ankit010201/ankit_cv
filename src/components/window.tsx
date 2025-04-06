"use client";

import type React from "react";
import { X } from "lucide-react";

interface WindowProps {
  id: string;
  title: string;
  isActive: boolean;
  onClose: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

export default function Window({
  id,
  title,
  isActive,
  onClose,
  onFocus,
  children,
}: WindowProps) {
  return (
    <div
      className={`pixelated-window absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-50 ${
        isActive ? "z-10" : "z-0"
      }`}
      style={{ width: "600px", height: "400px" }}
      onClick={onFocus}
    >
      <div className="pixelated-border flex items-center justify-between bg-amber-200 p-2">
        <div className="flex items-center">
          <div className="pixelated-border mr-2 h-4 w-4 bg-gray-700"></div>
          <span className="retro-font text-sm">{title}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="pixelated-button retro-font bg-amber-300 px-2 text-sm"
        >
          X
        </button>
      </div>
      <div className="h-[calc(100%-40px)] overflow-auto p-4">{children}</div>
    </div>
  );
}
