import type { Metadata, Viewport } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { routing } from '@/i18n/routing'
import { getMessages } from '@/i18n/messages'
import '../globals.css'

// One family for the whole page. Be Vietnam Pro was drawn for Vietnamese, so the
// stacked marks (ệ, ộ) are designed in rather than patched, and a Vietnamese
// reader sees a face they already know. Four weights only: every declared
// weight is two more font files (latin + vietnamese). 800 is the display weight.
const bvp = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '700', '800'],
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
 * The browser chrome matches the page ground, so the address bar does not sit
 * above the page as a foreign band. Must stay equal to `--color-bg` in
 * globals.css and to `theme_color` in `src/app/manifest.ts`.
 *
 * `maximumScale` is deliberately absent — capping zoom is an accessibility
 * failure, not a polish detail.
 */
export const viewport: Viewport = {
  themeColor: '#ffffff',
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
        <a href="#main" className="skip-link">
          {messages.common.skipToContent}
        </a>
        {/* Locale only, no messages: the one client component (the header menu) takes
            its labels as props, so no message catalog ships to the browser. */}
        <NextIntlClientProvider locale={locale} messages={null}>
          {children}
        </NextIntlClientProvider>
        {/* The `/next` entry point, not the bare package: it reads the App
            Router's own `useParams`/`usePathname`, so a visit is reported
            against the route `/[locale]` instead of splitting one page into two
            unrelated URLs. Both render `null` and append a `<script defer>`
            from an effect after hydration, so neither is on the path to first
            paint — they cannot be, there is no element to paint. */}
        {MEASURE ? (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        ) : null}
      </body>
    </html>
  )
}
