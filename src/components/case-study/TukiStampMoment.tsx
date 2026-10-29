"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { animate, motion, useMotionValue } from "motion/react";
import type { TukiMoment } from "@/content/types";
import { useAmbientMotion } from "@/lib/motion-preference";
import { Tuki } from "./Tuki";

const STAMP_RED = "#B53724";

interface Geometry {
  /** The target screen's box, relative to the row. */
  left: number;
  top: number;
  width: number;
  /** The stamp point, relative to the row. */
  inkX: number;
  inkY: number;
  /** Whether the screen is scrolled into view inside the strip. */
  shown: boolean;
  /** Tuki's size, a little smaller on phones. */
  size: number;
}

/**
 * TravelMate's stamp moment, played once on the reward chapter.
 *
 * When the "Stamp earned" screen scrolls into view, Tuki flies in,
 * pecks the Santa Luzia stamp (an ink ring spreads from it, the same
 * small ink burst the app uses when a stamp lands), and then hops up to
 * perch on top of that screen, where he stays. The case study repeats
 * the product's own reward instead of decorating the page.
 *
 * Tuki only ever crosses a screen for a moment and then sits in the
 * gap above it, so nothing stays covered. With motion paused (the
 * footer switch) or reduced, he is simply already perched. On small
 * screens, where the row scrolls sideways, the moment waits until the
 * reader swipes that screen into view, and Tuki hides while it is
 * scrolled away.
 */
export function TukiStampMoment({
  moment,
  rowRef,
  stripRef,
  tileRef,
  imageRatio,
}: {
  moment: TukiMoment;
  rowRef: RefObject<HTMLDivElement | null>;
  stripRef: RefObject<HTMLDivElement | null>;
  tileRef: RefObject<HTMLDivElement | null>;
  /** The target image's height over its width, to place the stamp point
   * on the image rather than on its cropped tile. */
  imageRatio: number;
}) {
  const motionOn = useAmbientMotion();
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const [phase, setPhase] = useState<"waiting" | "flying" | "perched">("waiting");
  const [flapping, setFlapping] = useState(false);
  const [inkKey, setInkKey] = useState(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);
  const started = useRef(false);
  // Motion off: no flight, Tuki is already sitting there.
  const shownPhase = !motionOn && phase === "waiting" ? "perched" : phase;
  const size = geometry?.size ?? 48;

  const measure = useCallback(() => {
    const row = rowRef.current;
    const strip = stripRef.current;
    const tile = tileRef.current;
    if (!row || !strip || !tile) return null;
    const rowBox = row.getBoundingClientRect();
    const stripBox = strip.getBoundingClientRect();
    const tileBox = tile.getBoundingClientRect();
    const overlap = Math.min(tileBox.right, stripBox.right) - Math.max(tileBox.left, stripBox.left);
    const left = tileBox.left - rowBox.left;
    const top = tileBox.top - rowBox.top;
    const next: Geometry = {
      left,
      top,
      width: tileBox.width,
      inkX: left + moment.inkAt.x * tileBox.width,
      inkY: top + moment.inkAt.y * tileBox.width * imageRatio,
      shown: overlap > tileBox.width * 0.6,
      size: window.innerWidth < 640 ? 40 : 48,
    };
    setGeometry(next);
    return next;
  }, [rowRef, stripRef, tileRef, moment.inkAt.x, moment.inkAt.y, imageRatio]);

  // Keep the geometry current while the strip scrolls or the page resizes.
  // A passive effect, not a layout one: this component sits inside the
  // row, and the row's own ref is only attached after its children's
  // layout effects have run.
  useEffect(() => {
    measure();
    const strip = stripRef.current;
    const row = rowRef.current;
    const onChange = () => measure();
    strip?.addEventListener("scroll", onChange, { passive: true });
    window.addEventListener("resize", onChange);
    const observer = row ? new ResizeObserver(onChange) : null;
    if (row && observer) observer.observe(row);
    return () => {
      strip?.removeEventListener("scroll", onChange);
      window.removeEventListener("resize", onChange);
      observer?.disconnect();
    };
  }, [measure, rowRef, stripRef]);

  // Once perched, Tuki follows the screen and hides when it is scrolled away.
  useEffect(() => {
    if (shownPhase !== "perched" || !geometry) return;
    const spot = perchAt(geometry);
    x.set(spot.x);
    y.set(spot.y);
    animate(opacity, geometry.shown ? 1 : 0, { duration: motionOn ? 0.2 : 0 });
  }, [shownPhase, geometry, x, y, opacity, motionOn]);

  // Play once, the first time the screen is properly in view.
  useEffect(() => {
    const tile = tileRef.current;
    if (!tile || !motionOn || started.current) return;
    let cancelled = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.intersectionRatio >= 0.6)) return;
        observer.disconnect();
        const g = measure();
        if (!g || cancelled) return;
        started.current = true;
        void fly(g);
      },
      { threshold: [0.6] },
    );
    observer.observe(tile);

    async function fly(g: Geometry) {
      setPhase("flying");
      setFlapping(true);
      const size = g.size;
      const above = { x: g.inkX - size / 2, y: g.inkY - size * 1.15 };
      const perch = perchAt(g);
      x.set(-size * 0.6);
      y.set(g.top - size * 2.4);
      await Promise.all([
        animate(opacity, 1, { duration: 0.2 }),
        animate(x, [-size * 0.6, g.left - size * 0.4, above.x], { duration: 1.05, ease: "easeInOut" }),
        animate(y, [g.top - size * 2.4, g.top - size * 1.6, above.y], { duration: 1.05, ease: "easeInOut" }),
      ]);
      if (cancelled) return finish();
      // The peck: a quick dip, and the ink spreads.
      await animate(y, above.y + size * 0.3, { duration: 0.13, ease: "easeIn" });
      setInkKey((key) => key + 1);
      await animate(y, above.y, { duration: 0.2, ease: "easeOut" });
      if (cancelled) return finish();
      await Promise.all([
        animate(x, perch.x, { duration: 0.6, ease: [0.33, 1, 0.68, 1] }),
        animate(y, [above.y, perch.y - size * 0.45, perch.y], { duration: 0.6, ease: "easeOut" }),
      ]);
      finish();
    }

    // Lands him on his perch, also when motion is switched off mid-flight.
    function finish() {
      setFlapping(false);
      setPhase("perched");
    }

    return () => {
      cancelled = true;
      observer.disconnect();
    };
    // `fly` reads the latest size and geometry when it starts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motionOn, measure]);

  if (!geometry) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 print:hidden">
      {inkKey > 0 && <InkBurst key={inkKey} x={geometry.inkX} y={geometry.inkY} />}
      {shownPhase !== "waiting" && (
        <motion.div className="absolute top-0 left-0" style={{ x, y, opacity }}>
          <Tuki size={size} flapping={flapping} eyes={shownPhase === "perched" ? "joy" : "open"} />
        </motion.div>
      )}
    </div>
  );
}

/** Where Tuki sits: centred on top of the screen, feet on its edge. */
function perchAt(g: Geometry) {
  return { x: g.left + g.width / 2 - g.size / 2, y: g.top - g.size * 0.93 + 3 };
}

/** Two ink rings and a few droplets, spreading from the stamp once. */
function InkBurst({ x, y }: { x: number; y: number }) {
  const drops = [-80, -20, 35, 100, 160, 215];
  return (
    <div className="absolute top-0 left-0" style={{ transform: `translate(${x}px, ${y}px)` }}>
      {[0, 0.12].map((delay) => (
        <motion.span
          key={delay}
          className="absolute -top-14 -left-14 h-28 w-28 rounded-full"
          style={{ border: `3px solid ${STAMP_RED}` }}
          initial={{ scale: 0.35, opacity: 0.85 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.75, delay, ease: "easeOut" }}
        />
      ))}
      {drops.map((angle) => {
        const radians = (angle * Math.PI) / 180;
        return (
          <motion.span
            key={angle}
            className="absolute -top-1 -left-1 h-2 w-2 rounded-full"
            style={{ background: STAMP_RED }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{ x: Math.cos(radians) * 78, y: Math.sin(radians) * 78, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}
