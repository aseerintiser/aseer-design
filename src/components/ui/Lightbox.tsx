"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type TouchEvent as ReactTouchEvent,
} from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowIcon } from "./ArrowIcon";

export interface LightboxImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

interface LightboxContextValue {
  open: (images: LightboxImage[], startIndex?: number) => void;
}

const LightboxContext = createContext<LightboxContextValue | null>(null);

/**
 * Media Experience milestone: the one shared "click to enlarge" system
 * for the whole portfolio. Any media component (CaseStudyImage,
 * ImageRow, and anything added later) calls `open(images, startIndex)`
 * instead of each owning its own modal state, focus handling, keyboard
 * listeners, and overlay markup -- one implementation improves every
 * call site at once, and any future gallery-style component gets the
 * same behavior for free just by calling this hook.
 */
export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) {
    throw new Error("useLightbox must be used within a LightboxProvider");
  }
  return ctx;
}

/**
 * Mounted once, in app/layout.tsx, wrapping page content. Renders the
 * overlay itself (via AnimatePresence, so it animates out too, not just
 * in) alongside the page rather than needing a portal -- this sits at
 * the layout root, not nested inside any page's own transformed
 * elements, so `position: fixed` already covers the full viewport
 * correctly without one.
 */
export function LightboxProvider({ children }: { children: ReactNode }) {
  const [group, setGroup] = useState<LightboxImage[] | null>(null);
  const [index, setIndex] = useState(0);
  const triggerRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const open = useCallback((images: LightboxImage[], startIndex = 0) => {
    // Remember whatever had focus (the thumbnail button just clicked)
    // so closing returns a keyboard user to exactly where they were,
    // instead of dropping their focus back to the top of the page.
    triggerRef.current = document.activeElement as HTMLElement;
    setGroup(images);
    setIndex(startIndex);
  }, []);

  const close = useCallback(() => {
    setGroup(null);
    triggerRef.current?.focus();
  }, []);

  const showNext = useCallback(() => {
    setIndex((current) => (group ? (current + 1) % group.length : current));
  }, [group]);

  const showPrev = useCallback(() => {
    setIndex((current) => (group ? (current - 1 + group.length) % group.length : current));
  }, [group]);

  // Escape closes; Left/Right move within a multi-image group (a single
  // CaseStudyImage opens a one-item group, so arrows are simply inert
  // there rather than needing a separate code path).
  useEffect(() => {
    if (!group) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
      } else if (event.key === "ArrowRight" && group && group.length > 1) {
        showNext();
      } else if (event.key === "ArrowLeft" && group && group.length > 1) {
        showPrev();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [group, close, showNext, showPrev]);

  // A fullscreen viewer competing with an independently scrollable page
  // behind it is a common source of janky scroll-chaining on both
  // desktop and mobile -- lock the page while the overlay is open.
  useEffect(() => {
    if (!group) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [group]);

  function onTouchStart(event: ReactTouchEvent) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function onTouchEnd(event: ReactTouchEvent) {
    if (touchStartX.current === null || !group || group.length < 2) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const deltaX = endX - touchStartX.current;
    // 50px is a deliberate, generous threshold -- a scroll or an
    // imprecise tap shouldn't accidentally page through the gallery.
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) showNext();
      else showPrev();
    }
    touchStartX.current = null;
  }

  const current = group?.[index];

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            onClick={close}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                close();
              }}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-[var(--duration-fast)] hover:bg-white/20"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M4 3.3 3.3 4 7.3 8l-4 4 .7.7 4-4 4 4 .7-.7-4-4 4-4-.7-.7-4 4-4-4Z"
                />
              </svg>
            </button>

            {group && group.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    showPrev();
                  }}
                  aria-label="Previous image"
                  className="absolute top-1/2 left-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-[var(--duration-fast)] hover:bg-white/20 sm:left-4"
                >
                  <ArrowIcon className="h-4 w-4 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    showNext();
                  }}
                  aria-label="Next image"
                  className="absolute top-1/2 right-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-[var(--duration-fast)] hover:bg-white/20 sm:right-4"
                >
                  <ArrowIcon className="h-4 w-4" />
                </button>
              </>
            )}

            <motion.div
              key={current.src}
              className="relative"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
              onClick={(event: ReactMouseEvent) => event.stopPropagation()}
            >
              {/* Intrinsic width/height (not `fill`) to match how every
                  other image on the site is rendered -- CSS caps and
                  object-contain scale it down without upscaling past
                  its own source resolution or distorting its aspect
                  ratio. */}
              <Image
                src={current.src}
                width={current.width}
                height={current.height}
                alt={current.alt}
                sizes="90vw"
                className="h-auto max-h-[85vh] w-auto max-w-[90vw] rounded-[var(--radius-md)] object-contain"
                unoptimized={current.src.endsWith(".gif")}
              />
            </motion.div>

            {group && group.length > 1 && (
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/70">
                {index + 1} / {group.length}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}
