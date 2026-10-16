import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value:
      "browsing-topics=(), camera=(), geolocation=(), microphone=(), payment=(), usb=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    // The Bazaar screenshot comes from the owner's public repository.
    // Keep the allowlist exact so other external images cannot be proxied.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/LiamTheMo/HYSB-Bazaar-Tracker/main/shots/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  // Keep legacy URLs useful while standardizing the public information
  // architecture around the developer portfolio. The portfolio detail
  // redirect only matches one path segment, so image assets under
  // /portfolio/<slug>/* remain untouched.
  async redirects() {
    return [
      {
        source: "/portfolio",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/portfolio/:slug",
        destination: "/projects/:slug",
        permanent: true,
      },
      {
        source: "/services/:slug",
        destination: "/contact?topic=:slug",
        permanent: true,
      },
    ];
  },

  // Codespaces serves the dev server through a forwarded *.app.github.dev
  // domain, not localhost. Next 15+ blocks cross-origin requests to dev
  // assets (JS chunks, HMR) by default, so without this the HTML loads but
  // hydration never happens — a blank white page with no visible error
  // outside the terminal log.
  allowedDevOrigins: ["*.app.github.dev"],
};

export default nextConfig;

// Makes Cloudflare bindings (ASSETS, IMAGES) available during `next dev`.
// Without this, anything reading a binding works in preview and production but
// is undefined in the dev server.
initOpenNextCloudflareForDev();
