"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { setMotionPreference, useAmbientMotion } from "@/lib/motion-preference";
import { setVision, useVision, visions, type Vision } from "@/lib/vision-preference";
import { printWhenReady } from "@/components/ui/PrintPrep";
import { handOffQuestion } from "@/lib/ask/handoff";
import { cn } from "@/lib/utils";

export interface CommandLink {
  label: string;
  href: string;
  hint: string;
}

interface CommandBarProps {
  cases: CommandLink[];
  pages: CommandLink[];
  email: string;
  resumeUrl: string;
  academicCvUrl: string;
}

type Action =
  | { kind: "go"; href: string }
  | { kind: "file"; href: string }
  | { kind: "copy" }
  | { kind: "print" }
  | { kind: "ask"; question: string }
  | { kind: "motion" }
  | { kind: "vision"; vision: Vision };

interface Command {
  id: string;
  group: "Case studies" | "Pages" | "Actions";
  label: string;
  hint: string;
  keywords?: string;
  icon: "go" | "copy" | "file" | "print" | "motion" | "vision" | "ask";
  action: Action;
}

/** Other parts of the site (the navigation's search button) open the bar
 * by dispatching this event. */
export const OPEN_COMMAND_BAR = "command-bar:open";

const ICONS: Record<Command["icon"], string> = {
  go: "M5 12h14M13 6l6 6-6 6",
  copy: "M9 9h10v10H9zM5 15V5h10",
  file: "M12 4v12M6 12l6 6 6-6M5 20h14",
  print: "M7 9V4h10v5M7 17H5v-7h14v7h-2M7 14h10v6H7z",
  ask: "M5 5h14v10H10l-5 4z",
  motion: "M5 4.5h4v15H5zM15 4.5h4v15h-4z",
  vision: "M12 4a8 8 0 1 0 0 16a8 8 0 1 0 0-16zM12 4v16",
};

/**
 * ⌘K (Ctrl K on Windows and Linux): jump to any case study or page, copy
 * the email address, open either CV, print the page, pause the site's
 * looping films, or
 * see the site in grayscale or as people with color-vision deficiencies
 * might.
 *
 * Built on the native <dialog>, so focus is held inside while it is open
 * and Escape closes it. The search field follows the ARIA combobox
 * pattern: arrow keys move through the results, Enter runs one.
 */
export function CommandBar({ cases, pages, email, resumeUrl, academicCvUrl }: CommandBarProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const motion = useAmbientMotion();
  const vision = useVision();
  const id = useId();

  const close = useCallback(() => dialogRef.current?.close(), []);

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActive(0);
    setStatus(null);
    dialog.showModal();
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && !event.altKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_COMMAND_BAR, open);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_COMMAND_BAR, open);
    };
  }, [open, close]);

  const commands = useMemo<Command[]>(
    () => [
      ...cases.map((link) => ({
        id: `case-${link.href}`,
        group: "Case studies" as const,
        label: link.label,
        hint: link.hint,
        icon: "go" as const,
        action: { kind: "go" as const, href: link.href },
      })),
      ...pages.map((link) => ({
        id: `page-${link.href}`,
        group: "Pages" as const,
        label: link.label,
        hint: link.hint,
        icon: "go" as const,
        action: { kind: "go" as const, href: link.href },
      })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: email,
        keywords: "contact mail",
        icon: "copy",
        action: { kind: "copy" },
      },
      {
        id: "design-cv",
        group: "Actions",
        label: "Open the design CV (PDF)",
        hint: "Product and UX roles",
        keywords: "resume cv download",
        icon: "file",
        action: { kind: "file", href: resumeUrl },
      },
      {
        id: "academic-cv",
        group: "Actions",
        label: "Open the academic CV (PDF)",
        hint: "Research and PhD roles",
        keywords: "resume cv download phd",
        icon: "file",
        action: { kind: "file", href: academicCvUrl },
      },
      {
        id: "print",
        group: "Actions",
        label: "Print this page",
        hint: "Or save as PDF",
        keywords: "pdf save paper",
        icon: "print",
        action: { kind: "print" },
      },
      {
        id: "motion",
        group: "Actions",
        label: motion ? "Pause the looping films" : "Play the looping films",
        hint: "Motion",
        keywords: "video animation stop reduce",
        icon: "motion",
        action: { kind: "motion" },
      },
      ...visions
        .filter((option) => option.id !== vision && (option.id !== "normal" || vision !== "normal"))
        .map((option) => ({
          id: `vision-${option.id}`,
          group: "Actions" as const,
          label: option.command,
          hint: "Color vision",
          keywords: "accessibility color blind colour grayscale greyscale simulate",
          icon: "vision" as const,
          action: { kind: "vision" as const, vision: option.id },
        })),
    ],
    [cases, pages, email, resumeUrl, academicCvUrl, motion, vision],
  );

  function run(command: Command | undefined) {
    if (!command) return;
    const { action } = command;
    if (action.kind === "go") {
      close();
      router.push(action.href);
    } else if (action.kind === "file") {
      window.open(action.href, "_blank", "noopener,noreferrer");
      close();
    } else if (action.kind === "copy") {
      navigator.clipboard
        ?.writeText(email)
        .then(() => {
          setStatus(`Copied ${email}`);
          window.setTimeout(close, 1100);
        })
        .catch(() => setStatus(`Couldn't copy. The address is ${email}`));
    } else if (action.kind === "ask") {
      close();
      handOffQuestion(action.question, (href) => router.push(href));
    } else if (action.kind === "print") {
      close();
      void printWhenReady();
    } else if (action.kind === "vision") {
      setVision(action.vision);
      close();
    } else {
      setMotionPreference(motion ? "off" : "on");
      setStatus(motion ? "Films paused across the site" : "Films playing again");
    }
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    const words = q.split(/\s+/);
    const matches = commands.filter((command) => {
      const haystack = `${command.label} ${command.hint} ${command.group} ${command.keywords ?? ""}`.toLowerCase();
      return words.every((word) => haystack.includes(word));
    });
    // Anything typed can also go to Ask the portfolio, which answers
    // from the site's own text.
    const askCommand: Command = {
      id: "ask",
      group: "Actions",
      label: `Ask the portfolio: “${query.trim()}”`,
      hint: "Answers from the site",
      icon: "ask",
      action: { kind: "ask", question: query.trim() },
    };
    return [...matches, askCommand];
  }, [commands, query]);

  const current = Math.min(active, Math.max(0, results.length - 1));
  const optionId = (index: number) => `${id}-option-${index}`;

  useEffect(() => {
    document.getElementById(optionId(current))?.scrollIntoView({ block: "nearest" });
    // optionId only depends on id, which is stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  function onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive(results.length ? (current + 1) % results.length : 0);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive(results.length ? (current - 1 + results.length) % results.length : 0);
    } else if (event.key === "Enter") {
      event.preventDefault();
      run(results[current]);
    }
  }

  const groups = (["Case studies", "Pages", "Actions"] as const)
    .map((group) => ({ group, items: results.map((item, index) => ({ item, index })).filter(({ item }) => item.group === group) }))
    .filter(({ items }) => items.length > 0);

  return (
    <dialog
      ref={dialogRef}
      aria-label="Search the site"
      onClose={() => restoreRef.current?.focus?.()}
      onClick={(event) => {
        // A click on the backdrop (the dialog element itself) closes it.
        if (event.target === dialogRef.current) close();
      }}
      className="command-bar m-auto mt-[12vh] w-[min(40rem,calc(100vw-2rem))] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg)] p-0 text-[var(--color-text)] shadow-[0_40px_90px_-30px_rgb(0_0_0/0.75)]"
    >
      <div data-tone="light" className="bg-[#f7f5f0] text-[#121210]">
        <div className="flex items-center gap-3 border-b border-[#e1ddd4] px-4">
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0 text-[#55534d]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={`${id}-list`}
            aria-activedescendant={results.length ? optionId(current) : undefined}
            aria-autocomplete="list"
            aria-label="Search projects and pages, or type a command"
            placeholder="Search projects and pages, or type a command"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
              setStatus(null);
            }}
            onKeyDown={onInputKeyDown}
            className="h-14 min-w-0 flex-1 bg-transparent text-base text-[#121210] outline-none placeholder:text-[#8a867c]"
          />
          <kbd className="rounded-[6px] border border-[#d9d5cc] px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[0.6875rem] text-[#6f6c64]">
            esc
          </kbd>
        </div>

        <div id={`${id}-list`} role="listbox" aria-label="Results" className="max-h-[min(26rem,60vh)] overflow-y-auto p-2">
          {groups.map(({ group, items }) => (
            <div key={group} role="group" aria-labelledby={`${id}-${group}`} className="pb-1">
              <p
                id={`${id}-${group}`}
                className="px-3 pt-2 pb-1.5 font-[family-name:var(--font-mono)] text-[0.625rem] tracking-[0.12em] text-[#6f6c64] uppercase"
              >
                {group}
              </p>
              {items.map(({ item, index }) => (
                <div
                  key={item.id}
                  id={optionId(index)}
                  role="option"
                  aria-selected={index === current}
                  onMouseMove={() => setActive(index)}
                  onClick={() => run(item)}
                  className={cn(
                    "flex min-h-11 cursor-pointer items-center gap-3 rounded-[var(--radius-md)] px-3 text-[0.9375rem]",
                    index === current && "bg-[#ece8df]",
                  )}
                >
                  <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[#121210] text-[#f7f5f0]">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={ICONS[item.icon]} />
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  <span className="hidden shrink-0 font-[family-name:var(--font-mono)] text-[0.6875rem] text-[#8a867c] sm:block">
                    {item.hint}
                  </span>
                </div>
              ))}
            </div>
          ))}
          {results.length === 0 && (
            <p className="px-3 py-5 text-sm text-[#6f6c64]">Nothing matches. Try “Lumi”, “CV” or “email”.</p>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-[#e1ddd4] px-4 py-2.5 font-[family-name:var(--font-mono)] text-[0.625rem] tracking-[0.1em] text-[#8a867c] uppercase">
          <span role="status" aria-live="polite" className="normal-case tracking-normal text-[#1f6b47]">
            {status}
          </span>
          <span className="shrink-0">↑↓ to move · enter to open</span>
        </div>
      </div>
    </dialog>
  );
}
