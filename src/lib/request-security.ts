/**
 * Reject browser requests initiated from a different origin. This is not a
 * replacement for edge rate limiting, but it prevents ordinary cross-site
 * form/fetch abuse from using public POST endpoints as CSRF targets.
 *
 * Requests without an Origin header are allowed because non-browser clients,
 * uptime checks, and some same-origin navigations may omit it. They still pass
 * the endpoint's normal validation and Cloudflare edge controls.
 */
export function isSameOriginRequest(request: Request): boolean {
  const secFetchSite = request.headers.get("sec-fetch-site");
  if (secFetchSite === "cross-site") return false;

  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}
