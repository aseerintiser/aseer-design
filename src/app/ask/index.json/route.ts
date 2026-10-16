import { buildAskIndex } from "@/lib/ask/build-index";

/** Ask the portfolio's index, built once at build time and served as a
 * static file. The page fetches it on load; questions never leave the
 * browser. */
export const dynamic = "force-static";

export function GET() {
  return Response.json(buildAskIndex());
}
