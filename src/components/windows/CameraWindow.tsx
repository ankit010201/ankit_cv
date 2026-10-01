"use client";

import Image from "next/image";
import { useState } from "react";
import RetroModal from "@/components/RetroModal";

const photos = [
  { file: "IMG_0439.jpg", label: "fuji from the shrine" },
  { file: "IMG_0374.jpg", label: "great buddha, kamakura" },
  { file: "IMG_0096.jpg", label: "lanterns, tokyo" },
  { file: "IMG_0090.jpg", label: "senso-ji pagoda, tokyo" },
  { file: "IMG_9909.jpg", label: "palace of fine arts, sf" },
  { file: "IMG_9811.jpg", label: "f1 pit lane" },
  { file: "IMG_9779.jpg", label: "concert" },
  { file: "IMG_9457.jpg", label: "hot air balloon" },
];

export default function CameraWindow() {
  const [selected, setSelected] = useState<number | null>(null);
  const photo = selected === null ? null : photos[selected];
  const move = (direction: number) =>
    setSelected((index) =>
      index === null
        ? null
        : (index + direction + photos.length) % photos.length,
    );

  return (
    <div className="retro-font space-y-3 text-xs">
      <div className="text-gray-500">// shot on iphone, no edits</div>
      <div className="grid grid-cols-2 gap-2">
        {photos.map((photo, index) => (
          <button
            key={photo.file}
            type="button"
            aria-label={`View ${photo.label}`}
            className="pixelated-border overflow-hidden text-left hover:opacity-90"
            onClick={() => setSelected(index)}
          >
            <Image
              src={`/photos/${photo.file}`}
              alt={photo.label}
              width={480}
              height={320}
              sizes="(max-width: 767px) 45vw, 280px"
              className="h-28 w-full object-cover"
            />
            <div className="bg-amber-50 px-1 py-0.5 text-gray-600">
              {photo.label}
            </div>
          </button>
        ))}
      </div>
      <div className="pixelated-border bg-amber-100 p-2 text-gray-500">
        gear: iphone 14 pro
      </div>
      {photo && (
        <RetroModal
          title={photo.label}
          description="Photo viewer. Use the left and right arrow keys to browse."
          onClose={() => setSelected(null)}
          className="max-w-4xl"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              move(event.key === "ArrowLeft" ? -1 : 1);
            }
          }}
        >
          <div>
            <Image
              src={`/photos/${photo.file}`}
              alt={photo.label}
              width={1600}
              height={1200}
              sizes="(max-width: 900px) 90vw, 850px"
              className="mx-auto max-h-[60dvh] w-auto max-w-full object-contain"
            />
            <div className="mt-3 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => move(-1)}
                className="pixelated-button bg-amber-100 px-3 py-2"
                aria-label="Previous photo"
              >
                ←
              </button>
              <span aria-live="polite">
                {selected! + 1} / {photos.length}
              </span>
              <button
                type="button"
                onClick={() => move(1)}
                className="pixelated-button bg-amber-100 px-3 py-2"
                aria-label="Next photo"
              >
                →
              </button>
            </div>
          </div>
        </RetroModal>
      )}
    </div>
  );
}
