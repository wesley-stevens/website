"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";

// A clickable image that opens larger in a popup over the page (the page behind is
// dimmed and blurred). Close it with the round X, by clicking outside the image, or
// with Esc. Uses <dialog>, so keyboard focus stays in the popup while it's open and
// returns to the image afterwards.
// Total space left around the popup photo (both sides together).
const margins = "clamp(2.5rem, 6vw, 4rem)";

export default function ImageLightbox({
  src,
  alt,
  width,
  height,
  children,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  children: ReactNode; // the thumbnail shown on the page
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  const open = () => {
    dialog.current?.showModal();
    document.documentElement.style.overflow = "hidden"; // keep the page from scrolling
  };
  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={alt ? `View larger: ${alt}` : "View larger image"}
        className="brutal-panel press block w-full cursor-zoom-in overflow-hidden"
      >
        {children}
      </button>

      <dialog
        ref={dialog}
        // Clicks on the dimmed area land on the <dialog> itself, not on the image.
        onClick={(e) => e.target === e.currentTarget && close()}
        onClose={() => (document.documentElement.style.overflow = "")}
        className={`m-auto max-h-none max-w-none overflow-visible bg-transparent p-0
          backdrop:bg-black/50 backdrop:backdrop-blur-sm`}
      >
        <div className="relative">
          {/* As large as fits, keeping the photo's shape (wide photos are limited by the
              screen's width, tall ones by its height). The margin around it grows from
              1.25rem on phones to 2rem on big screens, leaving room for the X. */}
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="100vw"
            quality={90}
            className="brutal-panel block h-auto"
            style={{
              width: `min(calc(100vw - ${margins}), calc((100dvh - ${margins}) * ${width} / ${height}))`,
            }}
          />
          <button
            type="button"
            onClick={close}
            aria-label="Close image"
            className={`press-sm absolute -left-4 -top-4 flex h-10 w-10 items-center
              justify-center rounded-full border-2 border-ink bg-foreground text-ink
              shadow-[var(--shadow-chip)]`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </dialog>
    </>
  );
}
