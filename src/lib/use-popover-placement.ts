"use client";

import { useCallback, useEffect, type RefObject } from "react";

/**
 * Places a popover (which opens in the top layer, unpositioned) under the
 * element that opened it, or above it near the bottom of the screen, and
 * keeps it there while the page scrolls or resizes.
 */
export function usePopoverPlacement(
  anchorRef: RefObject<HTMLElement | null>,
  cardRef: RefObject<HTMLElement | null>,
  maxWidth = 320,
) {
  const place = useCallback(() => {
    const anchor = anchorRef.current;
    const card = cardRef.current;
    if (!anchor || !card) return;
    // Inline anchors can wrap across lines: open under the last line, or
    // above the first one, so the card never covers the anchor itself.
    const rects = anchor.getClientRects();
    const whole = anchor.getBoundingClientRect();
    const first = rects[0] ?? whole;
    const last = rects[rects.length - 1] ?? whole;
    const width = Math.min(maxWidth, window.innerWidth - 32);
    const height = card.offsetHeight;
    const fitsBelow = last.bottom + 8 + height <= window.innerHeight - 8;
    const line = fitsBelow ? last : first;
    const left = Math.min(Math.max(16, line.left), window.innerWidth - width - 16);
    const top = fitsBelow ? last.bottom + 8 : Math.max(8, first.top - height - 8);
    card.style.width = `${width}px`;
    card.style.left = `${left}px`;
    card.style.top = `${top}px`;
  }, [anchorRef, cardRef, maxWidth]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    let open = false;
    const onToggle = (event: Event) => {
      open = (event as ToggleEvent).newState === "open";
      if (open) place();
    };
    const onMove = () => {
      if (open) place();
    };
    card.addEventListener("toggle", onToggle);
    window.addEventListener("scroll", onMove, { passive: true });
    window.addEventListener("resize", onMove);
    return () => {
      card.removeEventListener("toggle", onToggle);
      window.removeEventListener("scroll", onMove);
      window.removeEventListener("resize", onMove);
    };
  }, [cardRef, place]);

  return place;
}
