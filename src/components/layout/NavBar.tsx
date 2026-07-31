"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Persistent top navigation.
 *
 * Two refinements over a flat sticky bar: the background is transparent
 * at the very top of the page and only picks up the blur-behind treatment
 * once the visitor has actually scrolled past the hero (so the hero's
 * generated visual reads as full-bleed for that first screen, rather
 * than being capped by a bar immediately), and the active link is
 * indicated with a small animated underline that slides between items
 * (a `layoutId`-driven shared element) instead of a flat color swap.
 *
 * Five items, per Portfolio_Content_Architecture_Blueprint.md Part 2:
 * Home, Work, Research, About, Resume, with Contact kept out of the nav
 * as a persistent footer CTA instead.
 *
 * Visual Polish milestone: the live nav array actually carries seven
 * items (Work, Articles, Certifications, Testimonials, About Me,
 * Research, Resume), which need roughly 650-700px alongside the logo --
 * the horizontal layout below used to switch on at `md` (768px), a
 * width where that easily crowds or wraps. It now switches at `lg`
 * (1024px) instead, both fixing that and matching the breakpoint the
 * rest of the site's 12-column grid already treats as "desktop."
 */
export function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Focus management for the mobile menu: without this, opening it via
  // keyboard leaves focus stranded on the trigger button while the menu
  // it just revealed sits unreachable except by tabbing through whatever
  // else is on the page first. Move focus into the menu on open, close on
  // Escape, and return focus to the trigger on close so a keyboard user
  // never loses their place.
  useEffect(() => {
    if (open) {
      firstLinkRef.current?.focus();
      function onKeyDown(event: KeyboardEvent) {
        if (event.key === "Escape") {
          setOpen(false);
          triggerRef.current?.focus();
        }
      }
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
  }, [open]);

  function isActiveHref(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-[var(--duration-slow)] ease-[var(--ease-standard)]",
        scrolled
          ? "border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-lg font-medium"
        >
          {site.shortName}
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-2">
            {nav.map((item) => {
              const isActive = !item.external && isActiveHref(item.href);
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={cn(
                      "relative block px-3 py-2 text-sm font-medium transition-colors duration-[var(--duration-fast)]",
                      isActive
                        ? "text-[var(--color-text)]"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
                    )}
                  >
                    {item.label}
                    {/* External items (currently just Design Showcase,
                        pointing at the source Figma prototype) get a small
                        arrow instead of the active-page underline, since
                        they can never be the "current page" -- a quiet
                        visual cue that this one leaves the site. */}
                    {item.external && (
                      <span aria-hidden="true" className="ml-1 text-xs">
                        ↗
                      </span>
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-[var(--color-accent)]"
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 500, damping: 40 }
                        }
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          ref={triggerRef}
          type="button"
          className="inline-flex items-center justify-center rounded-[var(--radius-md)] p-2.5 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">
            {open ? "Close menu" : "Open menu"}
          </span>
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
          className="border-t border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {nav.map((item, index) => {
              const isActive = !item.external && isActiveHref(item.href);
              return (
                <li key={item.href}>
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={cn(
                      "block rounded-[var(--radius-md)] px-3 py-3 text-base font-medium transition-colors duration-[var(--duration-fast)]",
                      isActive
                        ? "bg-[var(--color-bg-subtle)] text-[var(--color-text)]"
                        : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text)]",
                    )}
                  >
                    {item.label}
                    {item.external && (
                      <span aria-hidden="true" className="ml-1 text-xs">
                        ↗
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
