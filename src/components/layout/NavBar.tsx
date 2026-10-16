"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/utils";
import { TrustMark } from "@/components/ui/TrustMark";
import { OPEN_COMMAND_BAR } from "@/components/ui/CommandBar";

const noSubscribe = () => () => {};

const cvLinks = [
  { label: "Design CV", note: "Product and UX roles", href: site.resumeUrl },
  { label: "Academic CV", note: "Research and PhD roles", href: site.academicCvUrl },
];

/**
 * Persistent top navigation (Phase 2).
 *
 * Four destinations, in the order a visitor needs them: Work, Research,
 * About, and the CV, which recruiters look for first and which used to
 * live only in the footer. The CV is a small menu with the design and
 * academic versions. Contact is a button rather than a page: it jumps to
 * the contact block that closes every page.
 *
 * The bar is transparent at the top and picks up a blurred ground once
 * the page scrolls. On the homepage it sits on night, matching the
 * screening room.
 */
export function NavBar() {
  const [open, setOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const cvRef = useRef<HTMLLIElement>(null);
  const cvButtonRef = useRef<HTMLButtonElement>(null);
  const onHome = pathname === "/";
  // "⌘K" on Apple devices, "Ctrl K" elsewhere; the key cap keeps one
  // width either way, so the bar never shifts when this settles.
  const shortcut = useSyncExternalStore(
    noSubscribe,
    () => (/Mac|iPhone|iPad/i.test(navigator.userAgent) ? "⌘K" : "Ctrl K"),
    () => "⌘K",
  );

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: focus moves in on open, Escape closes and returns focus.
  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // CV menu: closes on Escape (focus back to its button) or a click
  // anywhere outside it.
  useEffect(() => {
    if (!cvOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setCvOpen(false);
        cvButtonRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!cvRef.current?.contains(event.target as Node)) setCvOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [cvOpen]);

  function isActiveHref(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header
      data-tone={onHome ? "dark" : undefined}
      className={cn(
        "sticky top-0 z-40 border-b text-[var(--color-text)] transition-colors duration-[var(--duration-slow)] ease-[var(--ease-standard)]",
        scrolled || onHome ? "border-[var(--color-border)]" : "border-transparent",
        scrolled ? "bg-[var(--color-bg)]/85 backdrop-blur" : onHome ? "bg-[var(--color-bg)]" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-[family-name:var(--font-display)] text-[1.375rem] leading-none tracking-[-0.01em]"
        >
          <TrustMark draw hoverDraw className="w-7 translate-y-[1px]" />
          <span>{site.shortName}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const isActive = isActiveHref(item.href);
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative isolate block px-3 py-2 text-sm font-medium transition-colors duration-[var(--duration-fast)]",
                      isActive
                        ? "text-[var(--color-text)]"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
                    )}
                  >
                    {item.label}
                    {/* Active page: a highlighter stroke under the label,
                        behind the text. The label also turns from muted to
                        full strength, so color is never the only cue. */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        aria-hidden="true"
                        className="absolute inset-x-2 bottom-[0.55rem] -z-10 h-[0.45em] rounded-[2px] bg-[var(--color-signal)] opacity-90"
                        transition={
                          shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 40 }
                        }
                      />
                    )}
                  </Link>
                </li>
              );
            })}
            <li className="relative" ref={cvRef}>
              <button
                ref={cvButtonRef}
                type="button"
                aria-expanded={cvOpen}
                aria-controls="cv-menu"
                onClick={() => setCvOpen((value) => !value)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--color-text-muted)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-text)]"
              >
                CV
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className={cn("h-3 w-3 transition-transform duration-[var(--duration-fast)]", cvOpen && "rotate-180")}
                >
                  <path fill="currentColor" d="M3.3 5.8 8 10.4l4.7-4.6 1 1L8 12.4 2.3 6.8z" />
                </svg>
              </button>
              {cvOpen && (
                <ul
                  id="cv-menu"
                  className="absolute top-full right-0 mt-2 w-64 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-1.5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.35)]"
                >
                  {cvLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setCvOpen(false)}
                        className="flex items-start justify-between gap-3 rounded-[var(--radius-md)] px-3 py-2.5 transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-bg-subtle)]"
                      >
                        <span>
                          <span className="block text-sm font-medium">{link.label}</span>
                          <span className="block text-xs text-[var(--color-text-muted)]">{link.note}</span>
                        </span>
                        <span aria-hidden="true" className="font-[family-name:var(--font-mono)] text-[0.625rem] tracking-[0.12em] text-[var(--color-text-muted)] uppercase">
                          PDF ↗
                        </span>
                        <span className="sr-only">(PDF, opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event(OPEN_COMMAND_BAR))}
                aria-label="Search the site"
                aria-keyshortcuts="Meta+K Control+K"
                className="ml-1 flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] py-1.5 pr-1.5 pl-2.5 text-[var(--color-text-muted)] transition-colors duration-[var(--duration-fast)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <kbd aria-hidden="true" className="inline-block w-[4.6em] rounded-[5px] bg-[var(--color-bg-subtle)] py-0.5 text-center font-[family-name:var(--font-mono)] text-[0.625rem] whitespace-nowrap">
                  {shortcut}
                </kbd>
              </button>
            </li>
            <li className="ml-2">
              <Link
                href="#contact"
                className="inline-flex items-center rounded-[var(--radius-md)] bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-[var(--color-accent-contrast)] transition-[filter] duration-[var(--duration-fast)] hover:brightness-110"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <button
          ref={triggerRef}
          type="button"
          className="inline-flex items-center justify-center rounded-[var(--radius-md)] p-2.5 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
            {open ? (
              <path
                fill="currentColor"
                d="M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12 19 6.4 17.6 5 12 10.6Z"
              />
            ) : (
              <path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-[var(--color-border)] bg-[var(--color-bg)] px-4 pt-3 pb-5 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {nav.map((item, index) => {
              const isActive = isActiveHref(item.href);
              return (
                <li key={item.href}>
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-[var(--radius-md)] px-3 py-3 font-[family-name:var(--font-display)] text-2xl transition-colors duration-[var(--duration-fast)]",
                      isActive ? "bg-[var(--color-bg-subtle)]" : "hover:bg-[var(--color-bg-subtle)]",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            {cvLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-baseline justify-between rounded-[var(--radius-md)] px-3 py-3 font-[family-name:var(--font-display)] text-2xl hover:bg-[var(--color-bg-subtle)]"
                >
                  {link.label}
                  <span className="font-[family-name:var(--font-mono)] text-[0.625rem] tracking-[0.12em] text-[var(--color-text-muted)] uppercase">
                    PDF ↗<span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              window.dispatchEvent(new Event(OPEN_COMMAND_BAR));
            }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-4 py-3 text-base font-medium"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            Search the site
          </button>
          <Link
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent)] px-4 py-3 text-base font-medium text-[var(--color-accent-contrast)]"
          >
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
