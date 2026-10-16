"use client";

import { useSyncExternalStore } from "react";

/**
 * Whether case studies show their evidence marks (the highlighted claims
 * and their source notes). On by default; a reader who prefers clean text
 * can turn them off, and the choice is remembered on this device.
 */

const KEY = "aseer-evidence";
const listeners = new Set<() => void>();
let current = true;
let loaded = false;

function read() {
  try {
    return window.localStorage.getItem(KEY) !== "off";
  } catch {
    return true;
  }
}

function getSnapshot() {
  if (!loaded) {
    current = read();
    loaded = true;
  }
  return current;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== KEY) return;
    current = read();
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function setEvidenceShown(shown: boolean) {
  current = shown;
  loaded = true;
  try {
    if (shown) window.localStorage.removeItem(KEY);
    else window.localStorage.setItem(KEY, "off");
  } catch {
    // Storage can be unavailable; the choice still holds for this view.
  }
  listeners.forEach((listener) => listener());
}

export function useEvidenceShown() {
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}
