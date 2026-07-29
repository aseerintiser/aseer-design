import Link from "next/link";
import type { ProjectSummary } from "@/content/types";
import { cn } from "@/lib/utils";

const scaleLabel: Record<ProjectSummary["scale"], string> = {
  feature: "Feature-level",
  product: "Product-level",
  platform: "Platform-level",
  research: "Research",
};

interface ProjectCardProps {
  project: ProjectSummary;
  className?: string;
}

/**
 * Shared card for the Work and Research index grids. Per the Design
 * Brief's "one consistent screenshot treatment" and the Blueprint's "a
 * short, honest one-line scope indicator per project," every card states
 * scope before a visitor clicks in, rather than relying on title alone.
 *
 * No real screenshots exist yet, so the thumbnail is a placeholder block
 * rather than an invented image; it is replaced with real project
 * imagery in the per-project milestones (Milestones 4-7).
 */
export function ProjectCard({ project, className }: ProjectCardProps) {
  const isContingent = project.status === "contingent";
  const href = `/${project.track === "work" ? "work" : "research"}/${project.slug}`;

  return (
    <Link
      href={href}
      className={cn(
        "group block overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]",
        "transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)]",
        "hover:-translate-y-1 focus-visible:-translate-y-1",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "flex aspect-[4/3] items-center justify-center bg-[var(--color-bg-subtle)]",
          "text-xs uppercase tracking-wide text-[var(--color-text-muted)]",
        )}
      >
        Image pending
      </div>
      <div className="space-y-2 p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-[family-name:var(--font-display)] text-lg">
            {project.title}
          </h3>
          {project.isFlagship && (
            <span className="shrink-0 rounded-[var(--radius-full)] bg-[var(--color-accent)] px-2 py-0.5 text-xs font-medium text-[var(--color-accent-contrast)]">
              Flagship
            </span>
          )}
        </div>
        <p className="text-sm text-[var(--color-text-muted)]">
          {scaleLabel[project.scale]}
          {isContingent ? " · Decision pending" : ""}
        </p>
        <p className="text-sm text-[var(--color-text)]">{project.oneLineScope}</p>
      </div>
    </Link>
  );
}
