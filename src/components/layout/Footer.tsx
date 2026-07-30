import { site } from "@/content/site";
import { Container } from "./Container";

/**
 * Persistent footer Contact CTA, per Blueprint Part 1: "Recommend keeping
 * this as the persistent footer CTA the live site already uses, not a
 * separate page... a contact action shouldn't require a dedicated
 * click-through."
 *
 * Milestone 2: copy migrated verbatim from the live footer (site.footer
 * in content/site.ts). The live version renders "Let's / design /
 * together" as three separately stacked, oversized lines (a kinetic-text
 * effect); rendered here as one heading line instead, since that's a
 * component-level formatting difference the migration brief explicitly
 * allows, not a content change -- the words themselves are unchanged.
 */
export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <Container className="py-16">
        <p className="font-[family-name:var(--font-display)] text-[length:var(--text-h2)] font-[560] leading-[1.05]">
          {site.footer.heading.join(" ")}
        </p>
        <a
          href={`mailto:${site.email}`}
          className="mt-3 inline-block text-lg text-[var(--color-text-muted)] underline-offset-4 hover:text-[var(--color-text)] hover:underline"
        >
          {site.email}
        </a>

        <div className="mt-10 flex flex-col gap-6 border-t border-[var(--color-border)] pt-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-medium text-[var(--color-text)]">
              {site.footer.openTo}
              <br />
              {site.footer.openToLine2}
            </p>
            <p className="mt-2 max-w-md text-sm text-[var(--color-text-muted)]">
              {site.footer.body}
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 md:items-end">
            <ul className="flex gap-6">
              {site.socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-xs text-[var(--color-text-muted)]">{site.footer.copyright}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
