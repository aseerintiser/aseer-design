import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { featuredIn, myWritings } from "@/content/articles";

export const metadata: Metadata = {
  title: "Writing",
  description: "Writing on UX, HCI and strategy, and places my work has been featured.",
};

function ArticleCard({
  image,
  heading,
  body,
  href,
}: {
  image: { src: string; width: number; height: number };
  heading: string;
  body: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group col-span-4 block md:col-span-4"
    >
      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]">
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt=""
          className="aspect-[4/3] w-full object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-standard)] group-hover:scale-[1.03]"
          sizes="(min-width: 768px) 33vw, 100vw"
        />
      </div>
      <Heading level={3} display={false} className="mt-4">
        {heading}
      </Heading>
      <Text muted className="mt-2">
        {body}
      </Text>
      <p className="mt-3 flex items-center gap-1.5 text-sm font-medium">
        <span className="link-ink">Read more</span>
        <ArrowIcon className="h-3.5 w-3.5 shrink-0 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-0.5" />
      </p>
    </a>
  );
}

/**
 * Milestone 2: new page, migrated from the live aseer.design /articles
 * page (didn't exist in this project before). Two groups: press
 * mentions and personal Medium/blog writing, each linking out to the
 * original source rather than reproducing the full articles here.
 */
export default function ArticlesPage() {
  return (
    <>
      {/* Rebuild: titled Writing, matching the footer link. His own
          writing leads; press mentions follow. One paper page instead of
          a dark band for the second group. */}
      <Section density="open">
        <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
          Writing
        </p>
        <Heading level={1} className="mt-3">
          My writing on UX, HCI &amp; strategy
        </Heading>
        <Grid gap="lg" className="mt-10">
          {myWritings.map((entry) => (
            <ArticleCard key={entry.href} {...entry} />
          ))}
        </Grid>
      </Section>

      <Section density="default" className="border-t border-[var(--color-border)]">
        <Heading level={2}>Featured in</Heading>
        <Grid gap="lg" className="mt-10">
          {featuredIn.map((entry) => (
            <ArticleCard key={entry.href} {...entry} />
          ))}
        </Grid>
      </Section>
    </>
  );
}
