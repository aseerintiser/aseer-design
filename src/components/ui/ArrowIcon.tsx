interface ArrowIconProps {
  className?: string;
}

/**
 * Shared trailing-arrow glyph. Was previously two separately hand-drawn
 * copies of the same path data (Button's `Arrow()` and ProjectCard's
 * inline scope-line arrow) that would silently drift apart the next
 * time either one got tweaked. No default sizing/transition classes are
 * baked in here since the two call sites animate it quite differently
 * (translate-on-hover vs. fade-and-slide-in-on-hover) -- callers pass
 * the full className they need.
 */
export function ArrowIcon({ className }: ArrowIconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className}>
      <path
        fill="currentColor"
        d="M9.3 3.3a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.4-1.4L11.6 9H2a1 1 0 1 1 0-2h9.6L9.3 4.7a1 1 0 0 1 0-1.4Z"
      />
    </svg>
  );
}
