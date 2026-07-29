import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-medium " +
  "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent)] text-[var(--color-accent-contrast)] hover:opacity-90",
  secondary:
    "bg-transparent text-[var(--color-text)] border border-[var(--color-border-strong)] hover:bg-[var(--color-bg-subtle)]",
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
  ...props
}: ButtonProps) {
  const classes = cn(base, variantClass[variant], sizeClass[size], className);

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
