"use client";

import RetroModal from "./RetroModal";

interface Props {
  onClose: () => void;
}

const SPECS = [
  { label: "OS", value: "PersonalOS v1.0" },
  { label: "Processor", value: "big brain energy™" },
  { label: "Memory", value: "well hydrated 💧" },
  { label: "Storage", value: "full of feelings" },
  { label: "GPU", value: "240fps at life" },
  { label: "Network", value: "always online 📶" },
  { label: "Uptime", value: "since 2001" },
  { label: "Location", value: "sf, ca 🌁" },
];

export default function AboutComputerModal({ onClose }: Props) {
  return (
    <RetroModal
      title="About This Computer"
      description="PersonalOS system details."
      onClose={onClose}
    >
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-3 border-b border-amber-200 pb-3">
          <div className="pixelated-border flex h-12 w-12 items-center justify-center bg-gray-800 text-2xl">
            💾
          </div>
          <div>
            <div className="retro-font text-sm text-amber-800">PersonalOS</div>
            <div className="retro-font text-xs text-gray-500">
              version 1.0.0 (build 2001)
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          {SPECS.map(({ label, value }) => (
            <div key={label} className="retro-font flex gap-2 text-xs">
              <span className="w-20 flex-shrink-0 text-amber-700">
                {label}:
              </span>
              <span className="text-gray-600">{value}</span>
            </div>
          ))}
        </div>

        <div className="retro-font border-t border-amber-200 pt-2 text-center text-xs text-gray-400">
          © 2026 ankit agrawal. all rights reserved.
        </div>
      </div>
    </RetroModal>
  );
}
