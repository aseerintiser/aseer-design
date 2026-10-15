import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { TrustMark } from "@/components/ui/TrustMark";

/**
 * The 404 (Phase 2): the one place, besides the Lumi study, where the
 * trust line is allowed to break, because a broken link is exactly the
 * kind of small failure the research is about. The line draws its own
 * story: a slow climb, a sudden fall, and the climb back, which is where
 * the two ways forward come in.
 */
export default function NotFound() {
  return (
    <Section tone="dark" density="open" className="min-h-[70vh]">
      <TrustMark draw className="w-40 md:w-56" weight={2} />
      <p className="mt-10 font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
        404 · Page not found
      </p>
      <Heading level={1} className="mt-3 max-w-3xl">
        This link is broken. Trust: <mark className="italic">reset</mark>.
      </Heading>
      <Text muted className="mt-5 max-w-[var(--measure)]">
        The page may have moved, or the address has a typo. Trust comes back the same way it was
        built, one working step at a time.
      </Text>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/">Back to the homepage</Button>
        <Button href="/work" variant="secondary">
          See the work
        </Button>
      </div>
    </Section>
  );
}
