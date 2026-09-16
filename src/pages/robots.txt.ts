import type { APIRoute } from "astro"

import { absolute, ROBOTS } from "../seo"

/**
 * Generated rather than kept as a static file, so the sitemap address and the
 * studio line come from the same constants as the rest of the site and can
 * never drift from it.
 */
export const GET: APIRoute = () => {
  const lines = [
    ...ROBOTS.extra,
    "",
    "User-agent: *",
    "Allow: /",
    ...ROBOTS.disallow.map((path) => `Disallow: ${path}`),
    "",
    `Sitemap: ${absolute("/sitemap-index.xml")}`,
  ]

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
