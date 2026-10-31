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
    // Placeholder assets are SVG while we wait for real product imagery.
    // Sandboxed per Next's documented pattern; revisit when raster assets land.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
})
