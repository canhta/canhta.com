import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getMessages } from '@/i18n/messages'
import { Measure } from '@/components/measure'
import '../globals.css'

// One family for the whole page. Be Vietnam Pro was drawn for Vietnamese, so the
// stacked marks (ệ, ộ) are designed in rather than patched, and a Vietnamese
// reader sees a face they already know. Three weights only: every declared
// weight is two more font files (latin + vietnamese). 800 is the display weight.
//
// The files are the two subsets Google serves for this family, kept in the repo
// instead of fetched by next/font/google. That is on purpose. Google also serves a
// third "latin-ext" subset whose range overlaps the Vietnamese one (đ ơ ư ă), and
// where ranges overlap the browser uses the one declared last. So a Vietnamese
// page fetched three more files after first paint, just for those letters, and
// showed them in the fallback font until they arrived. Declared by hand, each
// letter has exactly one file, and both subsets are preloaded.
//
// Two families, chained in `--font-sans`: a letter outside one family's
// unicode-range falls through to the next. `Be Vietnam Pro Fallback` (globals.css)
// is the size-adjusted system font shown until the files arrive. (next/font needs
// literal values here, so the file list is written out.)
const bvp = localFont({
  src: [
    { path: '../../assets/fonts/bvp-latin-400.woff2', weight: '400', style: 'normal' },
    { path: '../../assets/fonts/bvp-latin-700.woff2', weight: '700', style: 'normal' },
    { path: '../../assets/fonts/bvp-latin-800.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-bvp',
  display: 'swap',
  adjustFontFallback: false,
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    },
  ],
})
const bvpVietnamese = localFont({
  src: [
    { path: '../../assets/fonts/bvp-vietnamese-400.woff2', weight: '400', style: 'normal' },
    { path: '../../assets/fonts/bvp-vietnamese-700.woff2', weight: '700', style: 'normal' },
    { path: '../../assets/fonts/bvp-vietnamese-800.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-bvp-vi',
  display: 'swap',
  adjustFontFallback: false,
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB',
    },
  ],
})

/**
 * Measurement is on for every deployment, and off in development.
 *
 * This used to carry a second condition — `&& !CONTENT_IS_FIXTURE` — on the
 * reasoning that pageviews and Core Web Vitals collected while the profile and
 * the answers are placeholder become the baseline the finished site is later
 * compared against, and Vercel gives you no way to subtract them afterwards.
 * That reasoning is still true, and it is not what Canh wants: the effect was
 * that the live site shipped both scripts and reported nothing, for as long as
 * any placeholder remained. A measurement setup that silently measures nothing
 * is worse than a slightly dirty baseline, because you find out about it late.
 *
 * So: real traffic is recorded from the first visit. The early datapoints are
 * against draft copy.
 *
 * The development exclusion stays. A local session is one person reloading, and
 * both packages would otherwise pull their debug scripts and narrate to the
 * console.
 *
 * Read once at module scope: this is a decision about the deployment, not about
 * the request, and re-evaluating it per render would only suggest otherwise.
 */
const MEASURE = process.env.NODE_ENV === 'production'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

/**
 * The browser chrome matches the ground every page opens on (a night hero or
 * page header), so the address bar does not sit above the page as a foreign
 * band. Must stay equal to `--color-night` in globals.css and to `theme_color`
 * in `src/app/manifest.ts`.
 *
 * `maximumScale` is deliberately absent — capping zoom is an accessibility
 * failure, not a polish detail.
 */
export const viewport: Viewport = {
  themeColor: '#131517',
  colorScheme: 'dark',
}

/**
 * Site-wide defaults only. Each page sets its own title, description, canonical
 * and hreflang in its own `generateMetadata` (see `src/lib/metadata.ts`): one
 * page, one search intent, one set of tags.
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://canhta.com'),
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const messages = getMessages(locale)

  return (
    <html lang={locale} className={`${bvp.variable} ${bvpVietnamese.variable}`}>
      <body>
        <div aria-hidden="true" className="scroll-line" />
        <a href="#main" className="skip-link">
          {messages.common.skipToContent}
        </a>
        {children}
        {/* Loaded after the page is idle (see `Measure`). The `/next` entry points
            of both packages read the App Router's own `useParams`/`usePathname`, so a
            visit is reported against the route `/[locale]` instead of splitting one
            page into two unrelated URLs. */}
        {MEASURE ? <Measure /> : null}
      </body>
    </html>
  )
}
