"use client";

import { useState } from "react";
import { TrustMark } from "@/components/ui/TrustMark";
import { Button } from "@/components/ui/Button";

/**
 * Review-page helper: the large trust line with a replay button, so the
 * draw rhythm (slow climb, fast break, settle) can be judged more than
 * once. Remounting via `key` restarts the CSS animation.
 */
export function MarkReplay() {
  const [run, setRun] = useState(0);

  return (
    <div className="flex flex-col items-start gap-6">
      <TrustMark key={run} draw className="w-full max-w-[22rem]" weight={2.1} />
      <Button variant="secondary" size="sm" onClick={() => setRun((value) => value + 1)}>
        Replay the line
      </Button>
    </div>
  );
}
