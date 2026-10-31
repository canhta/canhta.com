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

const DAY = 86_400

/**
 * Files in /public keep their names when their content changes, so they cannot
 * be `immutable`: a visitor would keep the old picture until the cache expired
 * and nothing could reach them sooner. One day in the browser, then served stale
 * for a month while it is checked in the background (a cheap 304 when unchanged).
 * If these files are ever renamed with a version (`score-v2.webp`), switch to
 * `max-age=31536000, immutable`.
 */
const publicAsset = `public, max-age=${DAY}, stale-while-revalidate=${30 * DAY}`

/**
 * robots.txt, sitemap.xml and llms.txt change only with a deployment, and the
 * CDN drops its copy on every deployment. So the CDN may keep them for a day and
 * serve stale for a week; browsers and crawlers always ask again.
 */
const generatedText = `public, max-age=0, s-maxage=${DAY}, stale-while-revalidate=${7 * DAY}`

/**
 * The site icon is linked as `/icon.svg?icon.<content hash>.svg`, so a changed icon
 * is a new URL and the old one can be kept for ever.
 */
const hashedAsset = 'public, max-age=31536000, immutable'

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
    // Optimised copies are keyed by URL and size, not by content, and there is no
    // way to invalidate them. 31 days (the figure in Next's docs) keeps a visitor
    // and the CDN from re-checking pictures that rarely change. The price: a file
    // replaced under the same name shows its old version for up to 31 days, so
    // change the file name (or add `?v=2` to the src) when a picture changes.
    minimumCacheTTL: 31 * DAY,
  },
  async headers() {
    // `:path+` (one or more segments), not `:path*`: `/products` itself is the
    // English products page and must keep its page headers.
    return [
      { source: '/products/:path+', headers: [{ key: 'Cache-Control', value: publicAsset }] },
      { source: '/art/:path+', headers: [{ key: 'Cache-Control', value: publicAsset }] },
      { source: '/robots.txt', headers: [{ key: 'Cache-Control', value: generatedText }] },
      { source: '/sitemap.xml', headers: [{ key: 'Cache-Control', value: generatedText }] },
      { source: '/llms.txt', headers: [{ key: 'Cache-Control', value: generatedText }] },
      { source: '/manifest.webmanifest', headers: [{ key: 'Cache-Control', value: generatedText }] },
      { source: '/icon.svg', headers: [{ key: 'Cache-Control', value: hashedAsset }] },
    ]
  },
})
