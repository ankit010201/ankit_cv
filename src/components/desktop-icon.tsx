"use client";

import type { ReactNode } from "react";

interface DesktopIconProps {
  id: string;
  title: string;
  icon: string;
  onClick: () => void;
}

function PixelIcon({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      {children}
    </div>
  );
}

function getRetroIcon(icon: string) {
  switch (icon) {
    case "user":
      return (
        <PixelIcon>
          <div className="pixelated-border h-9 w-9 bg-gray-700 flex flex-col items-center justify-center gap-0.5">
            <div className="h-3 w-3 rounded-full bg-amber-200"></div>
            <div className="h-2 w-5 bg-amber-200"></div>
          </div>
        </PixelIcon>
      );
    case "clock":
      return (
        <PixelIcon>
          <div className="pixelated-border h-9 w-9 rounded-full border-2 border-gray-700 bg-amber-50 flex items-center justify-center">
            <div className="relative h-6 w-6">
              <div className="absolute left-1/2 top-1/2 h-2.5 w-0.5 -translate-x-1/2 origin-bottom -rotate-45 bg-gray-700"></div>
              <div className="absolute left-1/2 top-1/2 h-2 w-0.5 -translate-x-1/2 origin-bottom rotate-90 bg-gray-700"></div>
            </div>
          </div>
        </PixelIcon>
      );
    case "music":
      return (
        <PixelIcon>
          <div className="pixelated-border h-9 w-9 bg-purple-600 flex items-center justify-center">
            <div className="relative">
              <div className="h-4 w-0.5 bg-white"></div>
              <div className="absolute -top-0.5 left-0 h-0.5 w-3 bg-white"></div>
              <div className="absolute bottom-0 -left-1.5 h-2 w-2 rounded-full bg-white"></div>
              <div className="absolute bottom-0 left-1.5 h-2 w-2 rounded-full bg-white"></div>
            </div>
          </div>
        </PixelIcon>
      );
    case "book":
      return (
        <PixelIcon>
          <div className="pixelated-border h-9 w-9 bg-green-600 flex flex-col items-center justify-center gap-0.5 px-1">
            <div className="h-0.5 w-6 bg-green-200"></div>
            <div className="h-0.5 w-6 bg-green-200"></div>
            <div className="h-0.5 w-6 bg-green-200"></div>
            <div className="h-0.5 w-4 bg-green-200"></div>
          </div>
        </PixelIcon>
      );
    case "film":
      return (
        <PixelIcon>
          <div className="pixelated-border h-9 w-9 bg-gray-800 flex items-center gap-0.5 px-0.5">
            <div className="flex flex-col gap-0.5">
              <div className="h-1.5 w-1.5 bg-gray-400"></div>
              <div className="h-1.5 w-1.5 bg-gray-400"></div>
              <div className="h-1.5 w-1.5 bg-gray-400"></div>
            </div>
            <div className="h-6 flex-1 bg-amber-200"></div>
            <div className="flex flex-col gap-0.5">
              <div className="h-1.5 w-1.5 bg-gray-400"></div>
              <div className="h-1.5 w-1.5 bg-gray-400"></div>
              <div className="h-1.5 w-1.5 bg-gray-400"></div>
            </div>
          </div>
        </PixelIcon>
      );
    case "video":
      return (
        <PixelIcon>
          <div className="pixelated-border h-9 w-9 bg-rose-600 flex items-center justify-center">
            <div className="pixelated-border relative h-6 w-7 bg-amber-100">
              <div className="absolute left-2.5 top-1.5 h-3 w-3 bg-rose-600 [clip-path:polygon(0_0,100%_50%,0_100%)]"></div>
            </div>
            <div className="ml-0.5 h-4 w-1.5 bg-rose-200"></div>
          </div>
        </PixelIcon>
      );
    case "fork":
      return (
        <PixelIcon>
          <div className="pixelated-border h-9 w-9 bg-red-600 flex flex-col items-center justify-center">
            {/* steam */}
            <div className="flex gap-1 mb-0.5">
              <div className="h-1.5 w-0.5 bg-red-200"></div>
              <div className="h-2.5 w-0.5 bg-red-200 -mt-1"></div>
              <div className="h-1.5 w-0.5 bg-red-200"></div>
            </div>
            {/* rim */}
            <div className="h-0.5 w-6 bg-white"></div>
            {/* bowl body - stacked divs tapering down */}
            <div className="h-1.5 w-6 bg-white"></div>
            <div className="h-1 w-5 bg-white"></div>
            <div className="h-1 w-3 bg-white"></div>
            {/* base */}
            <div className="h-0.5 w-2 bg-white"></div>
          </div>
        </PixelIcon>
      );
    case "camera":
      return (
        <PixelIcon>
          <div className="pixelated-border h-9 w-9 bg-blue-600 flex flex-col items-center justify-center">
            <div className="mb-0.5 h-1 w-3 bg-blue-200"></div>
            <div className="pixelated-border h-5 w-7 bg-blue-400 flex items-center justify-center">
              <div className="h-3 w-3 rounded-full border border-white bg-blue-200"></div>
            </div>
          </div>
        </PixelIcon>
      );
    case "run":
      return (
        <PixelIcon>
          <div className="pixelated-border h-9 w-9 bg-lime-600 flex flex-col items-center justify-end pb-1">
            {/* sneaker - side profile */}
            <div className="flex w-7 justify-end">
              {/* collar (back of shoe, tall) */}
              <div className="h-4 w-2.5 bg-white"></div>
            </div>
            {/* main body */}
            <div className="h-2 w-7 bg-white -mt-2"></div>
            {/* toe cap (slightly lower/wider) */}
            <div className="flex w-7">
              <div className="h-1 w-2 bg-white" style={{ borderRadius: "0 0 0 3px" }}></div>
              <div className="h-1 flex-1 bg-white opacity-0"></div>
            </div>
            {/* sole */}
            <div className="h-1.5 w-7 bg-gray-200"></div>
          </div>
        </PixelIcon>
      );
    case "tape":
      return (
        <PixelIcon>
          <div className="pixelated-border h-7 w-10 bg-gray-800 flex flex-col items-center justify-center">
            <div className="mb-0.5 flex gap-2">
              <div className="h-2 w-2 rounded-full border border-gray-400 bg-gray-600"></div>
              <div className="h-2 w-2 rounded-full border border-gray-400 bg-gray-600"></div>
            </div>
            <div className="h-0.5 w-7 bg-amber-400"></div>
          </div>
        </PixelIcon>
      );
    case "sign":
      return (
        <PixelIcon>
          <div className="pixelated-border h-9 w-9 bg-teal-600 flex items-center justify-center">
            <div className="relative h-6 w-6">
              <div className="absolute inset-0 border border-teal-200">
                <div className="mt-1 mx-1 h-0.5 w-4 bg-teal-200"></div>
                <div className="mt-1 mx-1 h-0.5 w-3 bg-teal-200"></div>
                <div className="mt-1 mx-1 h-0.5 w-4 bg-teal-200"></div>
              </div>
              <div className="absolute bottom-0 right-0 h-2.5 w-0.5 rotate-45 bg-teal-200 origin-bottom"></div>
            </div>
          </div>
        </PixelIcon>
      );
    case "term":
      return (
        <PixelIcon>
          <div className="pixelated-border h-9 w-9 bg-gray-900 flex flex-col items-start justify-center px-1.5 gap-0.5">
            <div className="flex items-center gap-0.5">
              <div className="h-1.5 w-1.5 text-green-400 text-xs leading-none">›</div>
              <div className="h-0.5 w-3 bg-green-400"></div>
              <div className="h-3 w-0.5 animate-pulse bg-green-400"></div>
            </div>
            <div className="ml-2 h-0.5 w-4 bg-green-700"></div>
            <div className="ml-2 h-0.5 w-3 bg-green-700"></div>
          </div>
        </PixelIcon>
      );
    case "bomb":
      return (
        <PixelIcon>
          <div className="pixelated-border h-9 w-9 bg-gray-200 flex items-center justify-center">
            <div className="relative">
              <div className="h-6 w-6 rounded-full bg-gray-800 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-white opacity-60"></div>
              </div>
              <div className="absolute -top-1.5 left-2.5 h-2 w-0.5 -rotate-12 bg-gray-600"></div>
              <div className="absolute -top-2 left-3 h-1 w-1 rounded-full bg-yellow-400"></div>
            </div>
          </div>
        </PixelIcon>
      );
    default:
      return (
        <PixelIcon>
          <div className="pixelated-border h-9 w-9 bg-gray-300"></div>
        </PixelIcon>
      );
  }
}

export default function DesktopIcon({ id, title, icon, onClick }: DesktopIconProps) {
  return (
    <button
      onClick={onClick}
      className="pixelated-button flex w-24 flex-col items-center bg-amber-50 p-2 hover:bg-amber-100"
    >
      <div className="pixelated mb-1 h-12 w-12">{getRetroIcon(icon)}</div>
      <span className="retro-font text-center text-xs">{title}</span>
    </button>
  );
}
