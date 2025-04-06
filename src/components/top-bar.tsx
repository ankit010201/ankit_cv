"use client";

interface TopBarProps {
  osName: string;
  currentDate: string;
}

export default function TopBar({ osName, currentDate }: TopBarProps) {
  return (
    <div className="flex h-8 items-center justify-between border-b border-gray-400 bg-gray-200 px-4 text-sm shadow-sm">
      <div className="flex items-center space-x-4">
        <span className="font-bold">{osName}</span>
        <span className="text-gray-700">File</span>
        <span className="text-gray-700">Help</span>
        <span className="text-teal-700">▲</span>
      </div>
      <div className="text-right font-mono text-xs">{currentDate}</div>
    </div>
  );
}
