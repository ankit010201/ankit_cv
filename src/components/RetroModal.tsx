"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useRef, type ReactNode, type KeyboardEventHandler } from "react";

export default function RetroModal({
  title,
  description,
  onClose,
  children,
  className = "max-w-md",
  onKeyDown,
}: {
  title: string;
  description: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
}) {
  const previousFocus = useRef(
    typeof document === "undefined"
      ? null
      : (document.activeElement as HTMLElement | null),
  );
  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[9998] bg-black/60" />
        <Dialog.Content
          onKeyDown={onKeyDown}
          className={`pixelated-window fixed left-1/2 top-1/2 z-[9999] flex max-h-[85dvh] w-[calc(100%-32px)] -translate-x-1/2 -translate-y-1/2 flex-col bg-amber-50 ${className}`}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            previousFocus.current?.focus();
          }}
        >
          <div className="pixelated-border flex shrink-0 items-center justify-between gap-3 bg-amber-200 p-2">
            <Dialog.Title className="retro-font text-sm">{title}</Dialog.Title>
            <Dialog.Close
              aria-label={`Close ${title}`}
              className="pixelated-button retro-font min-h-8 min-w-8 shrink-0 bg-amber-300 px-2"
            >
              X
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            {description}
          </Dialog.Description>
          <div className="min-h-0 overflow-auto p-4">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
