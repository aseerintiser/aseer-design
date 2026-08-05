interface ExpandIconProps {
  className?: string;
}

/**
 * Four-corner "enlarge" glyph for the gallery hover/focus affordance
 * (Convay Mobile App Revamp rebuild, 05_Interaction_and_Motion.md: the
 * existing `opacity-90` hover dim "is too subtle to communicate this is
 * interactive"). Shares ArrowIcon's convention of taking a full
 * className from the caller rather than baking in size/color.
 */
export function ExpandIcon({ className }: ExpandIconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className}>
      <path
        fill="currentColor"
        d="M1 1h5v1.5H2.5V6H1V1Zm14 0v5h-1.5V2.5H10V1h5ZM1 15v-5h1.5v3.5H6V15H1Zm14 0h-5v-1.5h3.5V10H15v5Z"
      />
    </svg>
  );
}
