"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

/**
 * One site-wide switch for ambient motion: the looping project films on
 * cards, case heroes and the homepage trailer.
 *
 * The loops play on their own, like GIFs, so a visitor can take in every
 * project at a glance. WCAG 2.2.2 still asks for a way to stop anything
 * that moves for more than five seconds, so instead of a pause button on
 * every clip there is one control (in the footer) that pauses them all,
 * and it is remembered on this device. With "reduce motion" set in the
 * system, loops start paused on their poster frame unless the visitor
 * turns motion back on here.
 */

export type MotionPreference = "on" | "off" | null;

const KEY = "aseer-motion";
const listeners = new Set<() => void>();
let current: MotionPreference = null;
let loaded = false;

function read(): MotionPreference {
  try {
    const value = window.localStorage.getItem(KEY);
    return value === "on" || value === "off" ? value : null;
  } catch {
    return null;
  }
}

function getSnapshot(): MotionPreference {
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

export function setMotionPreference(preference: MotionPreference) {
  current = preference;
  loaded = true;
  try {
    if (preference) window.localStorage.setItem(KEY, preference);
    else window.localStorage.removeItem(KEY);
  } catch {
    // Storage can be unavailable (private windows); the choice still
    // holds for this page view.
  }
  listeners.forEach((listener) => listener());
}

export function useMotionPreference(): MotionPreference {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}

/** Whether ambient loops should play right now. */
export function useAmbientMotion(): boolean {
  const preference = useMotionPreference();
  const reduce = useReducedMotion();
  return preference === "on" || (preference === null && !reduce);
}
