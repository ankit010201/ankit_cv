"use client";

import type React from "react";
import { X } from "lucide-react";

interface WindowProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
}

export default function Window({ title, content, onClose }: WindowProps) {
  return (
    <div className="absolute left-1/2 top-1/2 max-h-[80vh] w-[500px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-sm border-2 border-gray-500 bg-amber-50 shadow-lg">
      <div className="flex items-center justify-between border-b border-gray-400 bg-gray-200 px-2 py-1">
        <div className="flex items-center space-x-2">
          <span className="text-amber-800">✦</span>
          <span className="text-sm font-bold">{title}</span>
        </div>
        <button onClick={onClose} className="rounded p-1 hover:bg-gray-300">
          <X size={16} />
        </button>
      </div>

      <div className="max-h-[calc(80vh-40px)] overflow-y-auto p-4">
        {content}
      </div>

      <div className="flex justify-center border-t border-gray-400 p-3">
        <button
          onClick={onClose}
          className="rounded border-2 border-gray-400 bg-gray-200 px-4 py-1 text-sm shadow hover:bg-gray-300 active:shadow-inner"
        >
          Let&apos;s go!
        </button>
      </div>
    </div>
  );
}
