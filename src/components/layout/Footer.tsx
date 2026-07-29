import { site } from "@/content/site";
import { Container } from "./Container";

/**
 * Persistent footer Contact CTA, per Blueprint Part 1: "Recommend keeping
 * this as the persistent footer CTA the live site already uses, not a
 * separate page... a contact action shouldn't require a dedicated
 * click-through."
 */
export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <Container className="flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-[family-name:var(--font-display)] text-xl">
            Let&apos;s talk.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-1 inline-block text-sm text-[var(--color-text-muted)] underline-offset-4 hover:text-[var(--color-text)] hover:underline"
          >
            {site.email}
          </a>
        </div>
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
      </Container>
    </footer>
  );
}
