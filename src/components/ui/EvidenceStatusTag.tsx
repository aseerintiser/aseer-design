import { cn } from "@/lib/utils";

export type EvidenceStatus = "verified" | "internal" | "directional";

interface EvidenceStatusTagProps {
  status: EvidenceStatus;
  className?: string;
}

const config: Record<
  EvidenceStatus,
  { label: string; bg: string; text: string; icon: React.ReactNode }
> = {
  verified: {
    label: "Verified",
    bg: "bg-[var(--color-status-verified-bg)]",
    text: "text-[var(--color-status-verified-text)]",
    icon: (
      <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5">
        <path
          fill="currentColor"
          d="M13.7 4.3a1 1 0 0 1 0 1.4l-6 6a1 1 0 0 1-1.4 0l-3-3a1 1 0 1 1 1.4-1.4L6.99 9.6l5.3-5.3a1 1 0 0 1 1.41 0Z"
        />
      </svg>
    ),
  },
  internal: {
    label: "Internal record",
    bg: "bg-[var(--color-status-internal-bg)]",
    text: "text-[var(--color-status-internal-text)]",
    icon: (
      <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5">
        <path
          fill="currentColor"
          d="M8 1a5 5 0 0 0-5 5v1.5H2a1 1 0 0 0-1 1V14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8.5a1 1 0 0 0-1-1h-1V6a5 5 0 0 0-5-5Zm-3 6V6a3 3 0 1 1 6 0v1H5Z"
        />
      </svg>
    ),
  },
  directional: {
    label: "Directional",
    bg: "bg-[var(--color-status-directional-bg)]",
    text: "text-[var(--color-status-directional-text)]",
    icon: (
      <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5">
        <path
          fill="currentColor"
          d="M8 1 1 14h14L8 1Zm0 4.5a.9.9 0 0 1 .9.9v3.2a.9.9 0 1 1-1.8 0V6.4a.9.9 0 0 1 .9-.9Zm0 6.9a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
        />
      </svg>
    ),
  },
};

/**
 * Non-negotiable component per Claude_Code_Design_Brief_v2.md: "Evidence-
 * status tag component attached to every metric on the site, no
 * exceptions." Every case-study number needs one of these three states.
 *
 * Deliberately pairs an icon with a text label rather than relying on
 * background color alone, per the Design Brief's Avoid list: "Color as
 * the sole differentiator for any status or category label, direct
 * conflict with the accessibility positioning this whole portfolio is
 * built to demonstrate."
 */
export function EvidenceStatusTag({ status, className }: EvidenceStatusTagProps) {
  const { label, bg, text, icon } = config[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[var(--radius-full)] px-2.5 py-1 text-xs font-medium",
        bg,
        text,
        className,
      )}
    >
      {icon}
      {label}
    </span>
  );
}
