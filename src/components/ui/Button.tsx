import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "./ArrowIcon";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

// Real press/hover physics instead of an opacity fade: primary scales
// down slightly on press (a tactile cue borrowed from native controls)
// and its background shifts a shade rather than just dimming, which
// reads as considered rather than a default browser-ish hover.
const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-medium " +
  "transition-[transform,background-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-standard)] " +
  "active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent)] text-[var(--color-accent-contrast)] shadow-[0_1px_2px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_24px_-10px_color-mix(in_srgb,var(--color-accent)_60%,transparent)] hover:brightness-110",
  secondary:
    "bg-transparent text-[var(--color-text)] border border-[var(--color-border-strong)] hover:border-[var(--color-text)] hover:bg-[var(--color-bg-subtle)]",
  ghost: "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-bg-subtle)]",
};

const sizeClass: Record<Size, string> = {
  md: "px-5 py-3 text-sm",
  sm: "px-3.5 py-2 text-sm",
};

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Show the trailing arrow that shifts on hover. Defaults to on for
   * the primary variant, off otherwise, since it's meant to read as a
   * "go" affordance rather than decoration on every button. */
  withArrow?: boolean;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * A single Button component that renders as a real <button> or, when
 * given an `href`, a Next.js <Link> styled identically. Keeping one
 * component (rather than a separate LinkButton) avoids the two drifting
 * apart visually, which matters for the "one consistent treatment"
 * discipline the Design Brief asks for across the whole site.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  withArrow,
  ...props
}: ButtonProps) {
  const showArrow = withArrow ?? variant === "primary";
  const classes = cn("group", base, variantClass[variant], sizeClass[size], className);

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
        {showArrow && (
          <ArrowIcon className="h-3.5 w-3.5 shrink-0 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-0.5" />
        )}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
      {showArrow && (
        <ArrowIcon className="h-3.5 w-3.5 shrink-0 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-0.5" />
      )}
    </button>
  );
}
