"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ProjectSummary } from "@/content/types";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { cn } from "@/lib/utils";

export interface WorkItem {
  project: ProjectSummary;
  kind: "product" | "concept";
  years: string;
  role: string;
  context: string;
}

const filters = [
  { id: "all", label: "All" },
  { id: "product", label: "Product design" },
  { id: "concept", label: "Concepts" },
] as const;

type FilterId = (typeof filters)[number]["id"];

/**
 * The Work index (Phase 3): every project on the same stage, with two
 * fast ways to scan. Filters separate shipped product work from concept
 * work, and a list view shows years, roles and context in one glance
 * for visitors who already know what they are looking for.
 */
export function WorkIndex({ items }: { items: WorkItem[] }) {
  const [filter, setFilter] = useState<FilterId>("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  // Back from a case study returns to the same filter and layout. Kept in
  // sessionStorage, a per-tab convenience: if storage is blocked the
  // index simply opens on its defaults.
  // Restoring after hydration (not in the initial state) keeps the
  // server and client markup identical on first render.
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem("work-index") ?? "null");
      /* eslint-disable react-hooks/set-state-in-effect */
      if (saved?.filter && filters.some((option) => option.id === saved.filter)) setFilter(saved.filter);
      if (saved?.view === "grid" || saved?.view === "list") setView(saved.view);
      /* eslint-enable react-hooks/set-state-in-effect */
    } catch {}
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem("work-index", JSON.stringify({ filter, view }));
    } catch {}
  }, [filter, view]);

  function chooseView(next: "grid" | "list") {
    setView(next);
  }

  const visible = items.filter((item) => filter === "all" || item.kind === filter);

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-[var(--color-border)] py-3">
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-1.5">
          {filters.map((option) => {
            const count = items.filter((item) => option.id === "all" || item.kind === option.id).length;
            const active = filter === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(option.id)}
                className={cn(
                  "rounded-[var(--radius-full)] border px-3.5 py-1.5 text-sm transition-colors duration-[var(--duration-fast)]",
                  active
                    ? "border-[var(--color-text)] bg-[var(--color-text)] text-[var(--color-bg)]"
                    : "border-[var(--color-border-strong)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
                )}
              >
                {option.label}
                <span className="ml-1.5 font-[family-name:var(--font-mono)] text-xs opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
        <div role="group" aria-label="Layout" className="flex gap-1">
          {(["grid", "list"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={view === option}
              onClick={() => chooseView(option)}
              className={cn(
                "rounded-[var(--radius-md)] px-3 py-1.5 font-[family-name:var(--font-mono)] text-xs tracking-[0.12em] uppercase transition-colors duration-[var(--duration-fast)]",
                view === option ? "bg-[var(--color-bg-subtle)] text-[var(--color-text)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} projects
      </p>

      {view === "grid" ? (
        <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <ProjectCard key={item.project.slug} project={item.project} />
          ))}
        </div>
      ) : (
        <ol className="mt-6">
          {visible.map((item) => (
            <li key={item.project.slug} className="border-b border-[var(--color-border)]">
              <Link
                href={`/work/${item.project.slug}`}
                className="group grid items-baseline gap-x-6 gap-y-1 py-5 md:grid-cols-[6rem_minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_1.5rem]"
              >
                <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)] tabular-nums">
                  {item.years}
                </span>
                <span className="font-[family-name:var(--font-display)] text-xl leading-snug">
                  <span className="link-ink no-underline">{item.project.title}</span>
                </span>
                <span className="text-sm text-[var(--color-text-muted)]">{item.role}</span>
                <span className="text-sm text-[var(--color-text-muted)]">{item.context}</span>
                <ArrowIcon className="hidden h-3.5 w-3.5 transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5 md:block" />
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
