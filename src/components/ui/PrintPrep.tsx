"use client";

import { useEffect } from "react";

/**
 * Images on long pages load only as they scroll into view, so a page
 * printed straight after it opens would print empty frames. Printing
 * first loads every image, waits until they are decoded (up to a few
 * seconds), and then opens the print dialog.
 */
export async function printWhenReady() {
  const images = Array.from(document.images);
  images.forEach((image) => {
    if (image.loading === "lazy") image.loading = "eager";
  });
  await Promise.race([
    Promise.all(images.map((image) => image.decode().catch(() => undefined))),
    new Promise((resolve) => window.setTimeout(resolve, 6000)),
  ]);
  window.print();
}

/** Routes Ctrl/⌘+P through printWhenReady. Printing from the browser's
 * menu can't be delayed, so it at least starts every image loading. */
export function PrintPrep() {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && !event.altKey && !event.shiftKey && event.key.toLowerCase() === "p") {
        event.preventDefault();
        void printWhenReady();
      }
    }
    function onBeforePrint() {
      Array.from(document.images).forEach((image) => {
        if (image.loading === "lazy") image.loading = "eager";
      });
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("beforeprint", onBeforePrint);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("beforeprint", onBeforePrint);
    };
  }, []);
  return null;
}
