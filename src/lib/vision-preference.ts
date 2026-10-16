"use client";

import { useSyncExternalStore } from "react";

/**
 * The color-vision view: shows the whole site in grayscale or as people
 * with a common color-vision deficiency might see it, so anyone can
 * check that meaning here never depends on color alone.
 *
 * It is a way to look at the site, not a setting, so it lasts for this
 * visit only (sessionStorage) and a fresh visit always starts in full
 * color. The choice is applied as data-vision on <html>; the filters
 * live in globals.css and VisionFilters.
 */

export type Vision = "normal" | "grayscale" | "deuteranopia" | "protanopia" | "tritanopia";

export const visions: { id: Vision; label: string; short: string; command: string }[] = [
  { id: "normal", label: "Full color", short: "Full color", command: "Back to full color" },
  { id: "grayscale", label: "Grayscale", short: "Grayscale", command: "See the site in grayscale" },
  {
    id: "deuteranopia",
    label: "Red-green, deuteranopia",
    short: "Deuteranopia",
    command: "Simulate deuteranopia (red-green)",
  },
  { id: "protanopia", label: "Red-green, protanopia", short: "Protanopia", command: "Simulate protanopia (red-green)" },
  { id: "tritanopia", label: "Blue-yellow, tritanopia", short: "Tritanopia", command: "Simulate tritanopia (blue-yellow)" },
];

const KEY = "aseer-vision";
const listeners = new Set<() => void>();
let current: Vision = "normal";
let loaded = false;

function isVision(value: unknown): value is Vision {
  return visions.some((vision) => vision.id === value);
}

function apply(vision: Vision) {
  if (vision === "normal") delete document.documentElement.dataset.vision;
  else document.documentElement.dataset.vision = vision;
}

function getSnapshot(): Vision {
  if (!loaded) {
    loaded = true;
    try {
      const stored = window.sessionStorage.getItem(KEY);
      if (isVision(stored)) current = stored;
    } catch {
      // Storage can be unavailable; full color is the default anyway.
    }
    apply(current);
  }
  return current;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setVision(vision: Vision) {
  current = vision;
  loaded = true;
  apply(vision);
  try {
    if (vision === "normal") window.sessionStorage.removeItem(KEY);
    else window.sessionStorage.setItem(KEY, vision);
  } catch {
    // The view still applies for this page.
  }
  listeners.forEach((listener) => listener());
}

export function useVision(): Vision {
  return useSyncExternalStore(subscribe, getSnapshot, () => "normal");
}
