"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Renders `match` on one route and `otherwise` everywhere else. Both are
 * rendered on the server and passed in, so a server component (the
 * footer) can vary by page without becoming a client component itself.
 */
export function OnRoute({ path, match, otherwise }: { path: string; match: ReactNode; otherwise: ReactNode }) {
  return usePathname() === path ? match : otherwise;
}
