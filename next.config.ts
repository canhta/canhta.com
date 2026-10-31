import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

export default withNextIntl({
  reactStrictMode: true,
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
