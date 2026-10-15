/**
 * Figure: 14 of 15 participants (Lumi, "The problem").
 *
 * One mark per participant, so the proportion is seen rather than read.
 * Filled marks are the 14 who described wishing something like Lumi had
 * existed when they arrived; the open ring is the one who did not. Shape
 * carries the difference, never color alone.
 */
export function ParticipantsFigure() {
  const total = 15;
  const yes = 14;

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-8 sm:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
        <p className="shrink-0 font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-none tracking-[-0.02em]">
          14 <span className="text-[var(--color-text-muted)] italic">of</span> 15
        </p>
        <div>
          <svg
            viewBox={`0 0 ${total * 26 - 6} 20`}
            className="h-5 w-full max-w-[24rem]"
            role="img"
            aria-label="14 of 15 participants, shown as 14 filled circles and 1 open circle."
          >
            {Array.from({ length: total }, (_, index) => (
              <circle
                key={index}
                cx={index * 26 + 10}
                cy={10}
                r={index < yes ? 9 : 8.25}
                fill={index < yes ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={1.5}
              />
            ))}
          </svg>
          <p className="mt-3 max-w-[30rem] text-sm text-[var(--color-text-muted)]">
            International students who said they wished something like Lumi had existed when they
            arrived in Finland.
          </p>
        </div>
      </div>
    </div>
  );
}
