"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import type { ClaimNote } from "@/content/types";
import { EvidenceCardBody, EvidenceGlyph, statusLabel } from "@/components/ui/EvidenceChip";
import { setEvidenceShown, useEvidenceShown } from "@/lib/evidence-preference";
import { usePopoverPlacement } from "@/lib/use-popover-placement";
import { cn } from "@/lib/utils";

/**
 * The evidence layer. Claims in a case study's text carry a highlighter
 * mark and a number. On wide screens each paragraph's notes sit in the
 * margin beside it, and choosing a claim lights up its note; on smaller
 * screens choosing a claim opens the same note as a card. Each note says
 * how sure the claim is (verified, my own account, directional) and
 * where it comes from. A switch turns the marks off for clean reading.
 *
 * Margin notes are sidenotes: each one lines up with its claim and may
 * run down past a short paragraph instead of pushing the next one away.
 * A layout pass keeps them from overlapping each other, and makes room
 * only where they would run into a full-width figure or the end of a
 * chapter (elements marked data-note-barrier).
 */

type NumberedNote = ClaimNote & { n: number };

interface EvidenceContextValue {
  notes: Record<string, NumberedNote>;
  active: string | null;
  setActive: (id: string | null) => void;
  hovered: string | null;
  setHovered: (id: string | null) => void;
}

const EvidenceContext = createContext<EvidenceContextValue | null>(null);

const WIDE = "(min-width: 1280px)";

/** Lines each margin note up with its claim, keeps notes from
 * overlapping, and pads a barrier when notes would run into it. */
function layoutNotes(root: HTMLElement) {
  const items = root.querySelectorAll<HTMLElement>("[data-claim-note], [data-note-barrier]");
  items.forEach((item) => {
    item.style.transform = "";
    item.style.paddingTop = "";
  });
  if (!window.matchMedia(WIDE).matches) return;
  let floor = -Infinity;
  items.forEach((item) => {
    if (item.hasAttribute("data-note-barrier")) {
      const room = Math.ceil(floor + 16 - item.getBoundingClientRect().top);
      if (room > 0) item.style.paddingTop = `${room}px`;
      floor = -Infinity;
      return;
    }
    const line = root.querySelector(`a[href="#${item.id}"]`)?.getClientRects()[0];
    const natural = item.getBoundingClientRect().top;
    const top = Math.max(line ? line.top - 6 : natural, floor + 20);
    item.style.transform = `translateY(${Math.round(top - natural)}px)`;
    floor = top + item.offsetHeight;
  });
}

export function EvidenceProvider({
  notes,
  className,
  children,
}: {
  notes: Record<string, NumberedNote>;
  className?: string;
  children: ReactNode;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const shown = useEvidenceShown();
  const hasNotes = Object.keys(notes).length > 0;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !hasNotes) return;
    const run = () => layoutNotes(root);
    run();
    if (!shown) return;
    const observer = new ResizeObserver(run);
    observer.observe(root);
    document.fonts?.ready.then(run);
    return () => observer.disconnect();
  }, [shown, hasNotes]);

  return (
    <EvidenceContext.Provider value={{ notes, active, setActive, hovered, setHovered }}>
      <div ref={rootRef} className={className}>
        {children}
      </div>
    </EvidenceContext.Provider>
  );
}

/** A marked claim inside running text. Outside a case with notes, or
 * with the marks turned off, it is plain text. */
export function EvidenceClaim({ id, children }: { id: string; children: ReactNode }) {
  const context = useContext(EvidenceContext);
  const shown = useEvidenceShown();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const cardRef = useRef<HTMLSpanElement>(null);
  const place = usePopoverPlacement(linkRef, cardRef);
  const note = context?.notes[id];
  if (!context || !note || !shown) return <>{children}</>;

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    context!.setActive(id);
    if (window.matchMedia(WIDE).matches) {
      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById(`claim-note-${id}`)?.scrollIntoView({ block: "nearest", behavior: still ? "auto" : "smooth" });
      return;
    }
    const card = cardRef.current;
    if (card && "togglePopover" in card) {
      card.togglePopover();
      place();
    }
  }

  return (
    <>
      <a
        ref={linkRef}
        href={`#claim-note-${id}`}
        onClick={onClick}
        aria-describedby={`claim-note-${id}`}
        onMouseEnter={() => context.setHovered(id)}
        onMouseLeave={() => context.setHovered(null)}
        data-active={context.active === id || context.hovered === id}
        className="evidence-claim"
      >
        {children}
        <sup>
          <span className="sr-only">, evidence note </span>
          {note.n}
        </sup>
      </a>
      <span
        ref={cardRef}
        popover="auto"
        onToggle={(event) => {
          if ((event as unknown as ToggleEvent).newState === "closed") context.setActive(null);
        }}
        className="evidence-card"
      >
        <EvidenceCardBody status={note.status} source={note.source} label={`${note.n} · ${note.label}`} />
      </span>
    </>
  );
}

/** The notes for one paragraph's claims, beside it in the margin on
 * wide screens. Kept in the page (hidden) below that width, so each
 * claim's description stays available to screen readers. */
export function EvidenceMargin({ ids }: { ids: string[] }) {
  const context = useContext(EvidenceContext);
  const shown = useEvidenceShown();
  if (!context || !shown) return null;
  const notes = ids.map((id) => ({ id, note: context.notes[id] })).filter((entry) => entry.note);
  if (!notes.length) return null;

  return (
    <div className="hidden xl:block xl:h-0">
      <ol className="space-y-5">
        {notes.map(({ id, note }) => (
          <li
            key={id}
            id={`claim-note-${id}`}
            data-claim-note=""
            onMouseEnter={() => context.setHovered(id)}
            onMouseLeave={() => context.setHovered(null)}
            className={cn(
              "scroll-mt-28 border-l-2 py-1.5 pr-2 pl-4 text-[0.8125rem] leading-relaxed transition-colors duration-[var(--duration-fast)]",
              context.active === id || context.hovered === id
                ? "border-[var(--color-text)] bg-[rgb(255_216_74/0.2)]"
                : "border-[var(--color-border-strong)]",
            )}
          >
            <p className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-[0.625rem] tracking-[0.12em] text-[var(--color-text-muted)] uppercase">
              <span className="text-[var(--color-text)]">{note!.n}</span>
              <span className="text-[var(--color-text)]">
                <EvidenceGlyph status={note!.status} />
              </span>
              {statusLabel[note!.status]}
            </p>
            <p className="mt-1.5 font-medium text-[var(--color-text)]">{note!.label}</p>
            <p className="mt-1 text-[var(--color-text-muted)]">{note!.source}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** The switch for the whole layer, with the legend it needs. */
export function EvidenceToggle({ className }: { className?: string }) {
  const shown = useEvidenceShown();
  return (
    <div className={cn("flex flex-wrap items-center gap-x-6 gap-y-3", className)}>
      <button
        type="button"
        role="switch"
        aria-checked={shown}
        onClick={() => setEvidenceShown(!shown)}
        className="inline-flex items-center gap-2.5 text-sm font-medium"
      >
        <span
          aria-hidden="true"
          className={cn(
            "relative h-[18px] w-[30px] rounded-[var(--radius-full)] transition-colors duration-[var(--duration-fast)]",
            shown ? "bg-[var(--color-text)]" : "bg-[var(--color-border-strong)]",
          )}
        >
          <span
            className={cn(
              "absolute top-[2px] left-[2px] h-[14px] w-[14px] rounded-full bg-[var(--color-bg)] transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
              shown && "translate-x-[12px]",
            )}
          />
        </span>
        Evidence marks
      </button>
      <p className="flex flex-wrap items-center gap-x-4 gap-y-1 font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.04em] text-[var(--color-text-muted)]">
        <span>Claims are marked by how sure they are:</span>
        {(["verified", "own", "directional"] as const).map((status) => (
          <span key={status} className="inline-flex items-center gap-1.5">
            <span className="text-[var(--color-text)]">
              <EvidenceGlyph status={status} />
            </span>
            {statusLabel[status]}
          </span>
        ))}
      </p>
    </div>
  );
}
