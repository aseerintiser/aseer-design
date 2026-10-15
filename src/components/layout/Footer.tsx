import Link from "next/link";
import { footerPages, site } from "@/content/site";
import { Container } from "./Container";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { LocalTime } from "@/components/ui/LocalTime";
import { TrustMark } from "@/components/ui/TrustMark";

/**
 * The contact block that closes every page (Phase 2). It is the target
 * of the Contact button in the navigation, so reaching Aseer is one
 * click from anywhere: the address, a copy button that confirms in
 * place, his local time in Tampere, both CVs, and the secondary pages
 * that left the main navigation.
 */
export function Footer() {
  return (
    <footer id="contact" data-tone="dark" className="scroll-mt-16 bg-[var(--color-bg)] text-[var(--color-text)]">
      <Container className="pt-20 pb-10 md:pt-28">
        <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
          Contact
        </p>
        <h2 className="mt-4 max-w-4xl font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-[1.05] font-[420] tracking-[-0.02em]">
          Let&apos;s build something worth <mark className="italic">trusting</mark>.
        </h2>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a href={`mailto:${site.email}`} className="link-ink text-lg md:text-xl">
            {site.email}
          </a>
          <CopyEmail email={site.email} />
        </div>

        <div className="mt-16 grid gap-10 border-t border-[var(--color-border)] pt-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-[var(--color-text)]">
              {site.footer.openTo} {site.footer.openToLine2}
            </p>
            <p className="mt-3 font-[family-name:var(--font-mono)] text-xs tracking-[0.06em] text-[var(--color-text-muted)]">
              Tampere, Finland · <LocalTime /> local time
            </p>
          </div>

          <nav aria-label="CV and profiles" className="md:col-span-3 md:col-start-7">
            <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
              CV and profiles
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={site.resumeUrl} target="_blank" rel="noreferrer" className="link-ink no-underline">
                  Design CV<span className="sr-only"> (PDF, opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={site.academicCvUrl} target="_blank" rel="noreferrer" className="link-ink no-underline">
                  Academic CV<span className="sr-only"> (PDF, opens in a new tab)</span>
                </a>
              </li>
              {site.socials.map((social) => (
                <li key={social.href}>
                  <a href={social.href} target="_blank" rel="noreferrer" className="link-ink no-underline">
                    {social.label === "Linkedin" ? "LinkedIn" : social.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="More from the site" className="md:col-span-3">
            <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
              More
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {footerPages.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className="link-ink no-underline">
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--color-text-muted)]">
          <span className="flex items-center gap-2">
            <TrustMark className="w-5" />
            {site.footer.copyright}
          </span>
          <span>Designed and built by Aseer</span>
        </div>
      </Container>
    </footer>
  );
}
