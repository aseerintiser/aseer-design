"use client";

import { useId, useState } from "react";
import Image from "next/image";
import type { ScreenImage } from "@/content/types";
import { cn } from "@/lib/utils";

interface AnnotatedScreenProps {
  label: string;
  image: ScreenImage;
  device: "phone" | "panel";
  notes: { x: number; y: number; text: string }[];
}

/**
 * A close-up with numbered pins (the "close-up" shot size): one real
 * screen, a few pins on the details that carry a decision, and a note
 * for each beside it. Pointing at, focusing or pressing a pin or a note
 * lights up both, so the eye can go either way: screen to reason, or
 * reason to screen.
 */
export function AnnotatedScreen({ label, image, device, notes }: AnnotatedScreenProps) {
  const [active, setActive] = useState(0);
  const id = useId();
  const isPhone = device === "phone";

  return (
    <figure className="m-0">
      <div
        className={cn(
          "grid items-center gap-8 md:gap-12",
          isPhone ? "md:grid-cols-[17rem_minmax(0,1fr)]" : "md:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]",
        )}
      >
        <div className={cn("relative mx-auto w-full", isPhone ? "max-w-[17rem]" : "max-w-[24rem]")}>
          <div
            className={cn(
              "overflow-hidden",
              isPhone
                ? "rounded-[34px] shadow-[0_0_0_7px_#121210,0_0_0_8px_rgb(255_255_255/0.08),0_30px_60px_-30px_rgb(18_18_16/0.6)]"
                : "rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-[0_24px_48px_-28px_rgb(18_18_16/0.45)]",
            )}
          >
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              sizes={isPhone ? "272px" : "(min-width: 768px) 384px, 92vw"}
              className="block h-auto w-full"
            />
          </div>
          {notes.map((note, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Note ${index + 1}: ${note.text}`}
              aria-pressed={active === index}
              onClick={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              className={cn(
                "absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-signal)] font-[family-name:var(--font-mono)] text-[0.8125rem] font-medium text-[var(--color-signal-ink)] transition-[box-shadow,transform] duration-[var(--duration-fast)]",
                active === index
                  ? "scale-110 shadow-[0_0_0_7px_rgb(255_216_74/0.45),0_6px_14px_rgb(0_0_0/0.35)]"
                  : "shadow-[0_0_0_4px_rgb(255_216_74/0.28),0_4px_10px_rgb(0_0_0/0.3)]",
              )}
              style={{ left: `${note.x * 100}%`, top: `${note.y * 100}%` }}
            >
              <span aria-hidden="true">{index + 1}</span>
            </button>
          ))}
        </div>

        <div>
          <p
            id={`${id}-label`}
            className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase"
          >
            {label}
          </p>
          <ol aria-labelledby={`${id}-label`} className="mt-4 space-y-2.5">
            {notes.map((note, index) => (
              <li key={index}>
                <button
                  type="button"
                  aria-pressed={active === index}
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className={cn(
                    "grid w-full grid-cols-[1.75rem_minmax(0,1fr)] items-start gap-3 rounded-[var(--radius-md)] border bg-[var(--color-surface)] px-4 py-3 text-left text-[0.9375rem] leading-relaxed transition-[border-color,box-shadow] duration-[var(--duration-fast)]",
                    active === index
                      ? "border-[var(--color-text)] shadow-[0_14px_30px_-20px_rgb(18_18_16/0.5)]"
                      : "border-[var(--color-border)] hover:border-[var(--color-border-strong)]",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-signal)] font-[family-name:var(--font-mono)] text-xs font-medium text-[var(--color-signal-ink)]"
                  >
                    {index + 1}
                  </span>
                  <span>{note.text}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </figure>
  );
}
