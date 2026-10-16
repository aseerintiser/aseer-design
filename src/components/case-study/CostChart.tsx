import { cn } from "@/lib/utils";

interface CostChartProps {
  label: string;
  caption: string;
  items: {
    label: string;
    status: "cut" | "shipped";
    low?: number;
    high?: number;
    value: string;
    note?: string;
  }[];
}

// Log scale from €10 to €1,000,000: each tick is ten times the last,
// so a one-night cost and a half-million build fit on one chart.
const MIN = 1;
const MAX = 6;
const TICKS = ["10", "100", "1k", "10k", "100k", "1M"];
const position = (euros: number) => ((Math.log10(euros) - MIN) / (MAX - MIN)) * 100;

/**
 * Real numbers as a real chart: what each idea would have cost, cut or
 * shipped. Status is carried by the label and the bar's pattern (hatched
 * for cut, solid for shipped), never by color alone. Every row is plain
 * text for screen readers; the bars are decoration on top of it.
 */
export function CostChart({ label, caption, items }: CostChartProps) {
  return (
    <figure className="m-0 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
          {label}
        </p>
        <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
          Euros
        </p>
      </div>

      <ul className="mt-6 space-y-4">
        {items.map((item) => {
          const hasRange = item.low !== undefined && item.high !== undefined;
          return (
            <li
              key={item.label}
              className="grid gap-x-4 gap-y-1.5 sm:grid-cols-[13rem_minmax(0,1fr)_9.5rem] sm:items-center"
            >
              <div>
                <p className="text-[0.9375rem] leading-snug">{item.label}</p>
                <p
                  className={cn(
                    "mt-0.5 font-[family-name:var(--font-mono)] text-[0.625rem] tracking-[0.12em] uppercase",
                    item.status === "shipped" ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)]",
                  )}
                >
                  {item.status === "shipped" ? "Shipped" : "Cut"}
                  {item.note ? <span className="normal-case tracking-normal"> · {item.note}</span> : null}
                </p>
              </div>

              <div aria-hidden="true" className="cost-track relative h-5 border-l border-[var(--color-border-strong)]">
                {hasRange ? (
                  <>
                    <div
                      className={cn("absolute inset-y-0 left-0 rounded-r-[4px]", item.status === "cut" ? "cost-cut" : "bg-[var(--color-text)]")}
                      style={{ width: `${position(item.low!)}%` }}
                    />
                    {item.high! > item.low! && (
                      <div
                        className={cn(
                          "absolute inset-y-0 rounded-r-[4px] opacity-45",
                          item.status === "cut" ? "cost-cut" : "bg-[var(--color-text)]",
                        )}
                        style={{ left: `${position(item.low!)}%`, width: `${position(item.high!) - position(item.low!)}%` }}
                      />
                    )}
                  </>
                ) : (
                  <span className="absolute inset-y-0 left-0 flex items-center bg-[var(--color-surface)] pr-1.5 pl-2 font-[family-name:var(--font-mono)] text-[0.6875rem] text-[var(--color-text-muted)]">
                    No cost estimate
                  </span>
                )}
              </div>

              <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)] sm:text-right">
                {item.value}
              </p>
            </li>
          );
        })}
      </ul>

      <div aria-hidden="true" className="mt-2 hidden sm:grid sm:grid-cols-[13rem_minmax(0,1fr)_9.5rem] sm:gap-x-4">
        <span />
        <div className="relative h-4 font-[family-name:var(--font-mono)] text-[0.625rem] text-[var(--color-text-muted)]">
          {TICKS.map((tick, index) => (
            <span
              key={tick}
              className="absolute top-0 -translate-x-1/2"
              style={{ left: `${(index / (TICKS.length - 1)) * 100}%` }}
            >
              {tick}
            </span>
          ))}
        </div>
        <span />
      </div>

      <figcaption className="mt-5 border-t border-[var(--color-border)] pt-3 text-[0.8125rem] leading-relaxed text-[var(--color-text-muted)]">
        {caption}
      </figcaption>
    </figure>
  );
}
