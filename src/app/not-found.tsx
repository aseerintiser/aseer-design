import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section density="open">
      <Heading level={1}>Page not found</Heading>
      <Text muted className="mt-4 max-w-[var(--measure)]">
        The page you&apos;re looking for doesn&apos;t exist, or has moved.
      </Text>
      <div className="mt-8">
        <Button href="/">Back to home</Button>
      </div>
    </Section>
  );
}
