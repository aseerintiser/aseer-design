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

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-2">
            {nav.map((item) => {
              const isActive = isActiveHref(item.href);
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative block px-3 py-2 text-sm font-medium transition-colors duration-[var(--duration-fast)]",
                      isActive
                        ? "text-[var(--color-text)]"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
                    )}
                  >
                    {item.label}
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
          className="inline-flex items-center justify-center rounded-[var(--radius-md)] p-2 md:hidden"
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
          className="border-t border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-4 md:hidden"
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
                      "block rounded-[var(--radius-md)] px-3 py-3 text-base font-medium transition-colors duration-[var(--duration-fast)]",
                      isActive
                        ? "bg-[var(--color-bg-subtle)] text-[var(--color-text)]"
                        : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text)]",
                    )}
                  >
                    {item.label}
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
