import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names and resolve Tailwind class conflicts
 * (e.g. `p-4` followed by `p-6` correctly keeps `p-6`). Used by every
 * component that accepts a `className` override prop, which is most of
 * them, per the "reusable, component-driven" requirement for this
 * milestone.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
