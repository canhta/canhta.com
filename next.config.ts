import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

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
  images: {
    // Placeholder assets are SVG while we wait for real product imagery.
    // Sandboxed per Next's documented pattern; revisit when raster assets land.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
