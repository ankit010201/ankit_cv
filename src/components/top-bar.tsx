"use client";

function WifiIcon() {
  return (
    <div className="flex items-end gap-px" style={{ height: 14 }}>
      <div className="w-1 bg-gray-600" style={{ height: 5 }}></div>
      <div className="w-1 bg-gray-600" style={{ height: 8 }}></div>
      <div className="w-1 bg-gray-600" style={{ height: 12 }}></div>
      <div className="w-1 bg-gray-600" style={{ height: 14 }}></div>
    </div>
  );
}

function BatteryIcon() {
  return (
    <div className="flex items-center gap-1">
      <div className="relative flex items-center">
        <div
          className="pixelated-border relative bg-gray-100"
          style={{ width: 22, height: 11, border: "2px solid #4b5563" }}
        >
          <div className="absolute inset-y-0 left-0 bg-green-500" style={{ width: "69%" }} />
        </div>
        <div className="bg-gray-600" style={{ width: 3, height: 5 }} />
      </div>
      <span className="font-mono text-xs text-gray-600">69%</span>
    </div>
  );
}

function VolumeIcon() {
  return (
    <div className="flex items-center gap-px">
      <div className="flex items-center">
        <div className="bg-gray-600" style={{ width: 4, height: 8 }} />
        <div
          className="bg-gray-600"
          style={{ width: 5, height: 12, clipPath: "polygon(0 25%, 100% 0%, 100% 100%, 0 75%)" }}
        />
      </div>
      <div className="flex flex-col justify-center gap-px ml-0.5">
        <div className="h-px w-2 rounded-full bg-gray-600" />
        <div className="h-px w-3 rounded-full bg-gray-600" />
        <div className="h-px w-2 rounded-full bg-gray-600" />
      </div>
    </div>
  );
}

interface TopBarProps {
  osName: string;
  currentDate: string;
  isMobile?: boolean;
}

export default function TopBar({ osName, currentDate, isMobile = false }: TopBarProps) {
  return (
    <div className="flex h-8 items-center justify-between border-b border-gray-400 bg-gray-200 px-4 text-sm shadow-sm">
      <div className="flex items-center space-x-4">
        <span className="font-bold">{osName}</span>
        {!isMobile && (
          <>
            <span className="text-gray-700">File</span>
            <span className="text-gray-700">Help</span>
          </>
        )}
        <span className="text-teal-700">▲</span>
      </div>

      <div className="flex items-center gap-4">
        {!isMobile && (
          <>
            <WifiIcon />
            <VolumeIcon />
            <BatteryIcon />
          </>
        )}
        <div className="font-mono text-xs text-gray-700">{currentDate}</div>
      </div>
    </div>
  );
}
