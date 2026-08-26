import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

export default withNextIntl({
  reactStrictMode: true,
  images: {
    // Placeholder assets are SVG while we wait for real product imagery.
    // Sandboxed per Next's documented pattern; revisit when raster assets land.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
})
