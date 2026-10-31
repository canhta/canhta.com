import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/**
 * Permanent (308) redirects for addresses people or old links may use that are
 * not the canonical one: the default language has no prefix, and each page has
 * one slug per language. next-intl would send these with a temporary 307. These
 * run before the proxy, so they win. Specific pages first, then the bare prefix.
 */
const slugs = [
  ['services', 'dich-vu'],
  ['products', 'san-pham'],
  ['contact', 'lien-he'],
] as const

const redirects = [
  ...slugs.flatMap(([en, vi]) => [
    { source: `/en/${en}`, destination: `/${en}` },
    { source: `/en/${vi}`, destination: `/${en}` },
    { source: `/${vi}`, destination: `/${en}` },
    { source: `/vi/${en}`, destination: `/vi/${vi}` },
  ]),
  { source: '/en', destination: '/' },
  { source: '/en/:path*', destination: '/:path*' },
].map((rule) => ({ ...rule, permanent: true }))

export default withNextIntl({
  reactStrictMode: true,
  redirects: async () => redirects,
  images: {
    // Served by Next's own optimizer (Vercel runs it; there is no static export).
    // AVIF first, WebP for browsers without it. Widths are trimmed to what this
    // site really draws: icons and phone screens up to 3x on a 144px slot
    // (imageSizes), then full-width steps for anything larger (deviceSizes).
    formats: ['image/avif', 'image/webp'],
    imageSizes: [48, 96, 144, 288, 432],
    deviceSizes: [640, 828, 1080, 1920],
    qualities: [75, 82],
    // SVG logos skip the optimizer (they carry `unoptimized`), so
    // dangerouslyAllowSVG stays off.
  },
})
