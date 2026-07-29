/**
 * Design Brief must-have: semantic structure and visible keyboard focus
 * throughout. A skip link is the first focusable element on every page,
 * visually hidden until focused, letting keyboard and screen-reader users
 * bypass the nav straight to main content.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--radius-md)] focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-[var(--color-accent-contrast)]"
    >
      Skip to main content
    </a>
  );
}
