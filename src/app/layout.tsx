import type { Metadata } from "next";
import Script from "next/script";
import { SkipLink } from "@/components/layout/SkipLink";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { LightboxProvider } from "@/components/ui/Lightbox";
import { footerPages, nav, site } from "@/content/site";
import { caseStudies } from "@/content/projects";
import { CommandBar } from "@/components/ui/CommandBar";
import { VisionFilters, VisionNotice } from "@/components/ui/VisionView";
import { PrintPrep } from "@/components/ui/PrintPrep";
// Self-hosted fonts (no request to Google Fonts at build or runtime).
// Newsreader loads with its optical-size axis ("opsz") in both styles,
// since italics carry emphasis in headlines. IBM Plex Mono is not a
// variable font, so only the two weights the site uses are loaded.
// Family names are referenced from the --font-* tokens in globals.css.
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "@fontsource-variable/schibsted-grotesk";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "./globals.css";
import { newsreader, schibsted, plexMono } from "@/lib/fonts";

const siteUrl = "https://aseer.design";

// Cookie-free visit counts (Umami's free tier), so there is a baseline
// before the redesign ships and no cookie banner is needed. Inert until
// NEXT_PUBLIC_UMAMI_WEBSITE_ID is set in the Vercel project settings.
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    // Middle dot, not an em dash -- matches the name/title separator
    // already used on-site (Eyebrow on the homepage hero, resume page).
    default: `${site.name} · ${site.title}`,
    template: `%s · ${site.name}`,
  },
  description: site.heroProofPoint,
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} · ${site.title}`,
    description: site.heroProofPoint,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.title}`,
    description: site.heroProofPoint,
  },
  robots: {
    index: true,
    follow: true,
  },
  // Phase 1 identity: the trust-line mark (yellow on night) replaces
  // the earlier "A" glyph. One icon serves light and dark browser
  // chrome, since the night square carries its own ground. Assets live
  // in public/ (not app/), because file-based icon conventions in app/
  // would override this object.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

// The ⌘K bar's destinations, built here on the server so the client
// bundle carries only titles and links, not the case study content.
const commandCases = caseStudies.map((study) => ({
  label: study.title,
  href: `/${study.track === "work" ? "work" : "research"}/${study.slug}`,
  hint: study.track === "work" ? "Work" : "Research",
}));
const commandPages = [
  { label: "Home", href: "/", hint: "Page" },
  ...nav.map((item) => ({ label: item.label, href: item.href, hint: "Page" })),
  { label: "CV", href: "/resume", hint: "Page" },
  // Ask the portfolio has its own row at the top of the bar.
  ...footerPages.filter((item) => item.href !== "/ask").map((item) => ({ label: item.label, href: item.href, hint: "Page" })),
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${schibsted.variable} ${plexMono.variable}`}>
      <body>
        {/* Functional grain, not decorative -- see globals.css .grain-overlay
            for the full rationale (prevents banding on flat color fields). */}
        <div className="grain-overlay" aria-hidden="true" />
        <VisionFilters />
        <SkipLink />
        <NavBar />
        {/* Media Experience milestone: mounted once here so every
            click-to-enlarge trigger anywhere in the app (CaseStudyImage,
            ImageRow, and anything added later) shares one overlay
            implementation instead of each rolling its own modal. */}
        <LightboxProvider>
          <main id="main-content">{children}</main>
        </LightboxProvider>
        <Footer />
        <CommandBar
          cases={commandCases}
          pages={commandPages}
          email={site.email}
          resumeUrl={site.resumeUrl}
          academicCvUrl={site.academicCvUrl}
        />
        <VisionNotice />
        <PrintPrep />
        {umamiWebsiteId && (
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id={umamiWebsiteId}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
