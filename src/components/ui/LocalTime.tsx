"use client";

import { useEffect, useState } from "react";

const format = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Helsinki",
});

/**
 * Aseer's local time in Tampere (Finland runs on Helsinki time). Rendered
 * only after mount, so the static HTML never shows a stale build-time
 * clock, and refreshed every half minute.
 */
export function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(format.format(new Date()));
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  if (!time) return null;
  return (
    <time className={className} aria-label={`Local time in Tampere: ${time}`}>
      {time}
    </time>
  );
}
