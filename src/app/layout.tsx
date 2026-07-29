import type { Metadata } from "next";
import { SkipLink } from "@/components/layout/SkipLink";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/site";
// Self-hosted variable fonts (no request to Google Fonts at build or
// runtime). "full.css" includes the optical-size axis Fraunces needs for
// its expressive display treatment at large sizes; Inter only needs its
// weight axis. Family names ("Inter Variable" / "Fraunces Variable") are
// referenced directly from the --font-sans / --font-display tokens in
// globals.css.
import "@fontsource-variable/inter";
import "@fontsource-variable/fraunces/full.css";
import "./globals.css";

const siteUrl = "https://aseer.design";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s — ${site.name}`,
  },
  description: site.heroProofPoint,
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — ${site.title}`,
    description: site.heroProofPoint,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.title}`,
    description: site.heroProofPoint,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Functional grain, not decorative -- see globals.css .grain-overlay
            for the full rationale (prevents banding on flat color fields). */}
        <div className="grain-overlay" aria-hidden="true" />
        <SkipLink />
        <NavBar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
