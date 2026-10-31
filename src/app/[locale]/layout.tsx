import type { Metadata, Viewport } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
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
const bvp = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '700', '800'],
  variable: '--font-bvp',
  display: 'swap',
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
  colorScheme: 'light',
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
    <html lang={locale} className={bvp.variable}>
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
