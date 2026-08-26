import type { Metadata, Viewport } from 'next'
import { Be_Vietnam_Pro, IBM_Plex_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { routing } from '@/i18n/routing'
import { CONTENT_IS_FIXTURE, profile } from '@/content'
import type { Locale } from '@/content/types'
import { t } from '@/lib/text'
import { MotionProvider } from '@/components/motion-provider'
import '../globals.css'

// A Vietnamese-designed typeface for a Vietnamese builder's bilingual site.
// Full diacritic coverage, and a real choice rather than the default sans.
const bvp = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  // 600 was declared and never used — grep finds no `font-semibold` in src/.
  // Each declared weight is two more font files (latin + vietnamese) fetched on
  // a page whose LCP element is text, so a dead weight is pure LCP cost.
  weight: ['400', '500', '800'],
  variable: '--font-bvp',
  display: 'swap',
})

// The annotation face: dimensions, statuses, part references.
const plexMono = IBM_Plex_Mono({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

const COPY = {
  role: { en: 'Agentic product builder', vi: 'Người xây sản phẩm agentic' },
} as const

/**
 * Measurement is off unless the numbers would mean something.
 *
 * Two conditions, both load-bearing:
 * - Not in development. A local session is one person reloading; both packages
 *   would otherwise pull their debug scripts and narrate to the console.
 * - Not while the content is fixture. `ALLOW_FIXTURES=1` makes a *real* deploy
 *   serving invented product names and invented numbers. Pageviews and Core Web
 *   Vitals collected against placeholder copy become the baseline the finished
 *   site is later compared against, and Vercel gives you no way to subtract
 *   them afterwards — so the guard has to be before the first datapoint, not a
 *   filter after it.
 *
 * Both are read once at module scope: this is a decision about the deployment,
 * not about the request, and re-evaluating it per render would only suggest
 * otherwise.
 */
const MEASURE = process.env.NODE_ENV === 'production' && !CONTENT_IS_FIXTURE

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

/**
 * The browser chrome matches the paper the sheet is drawn on, so the address bar
 * does not sit on the page as a foreign band. `maximumScale` is deliberately
 * absent — capping zoom is an accessibility failure, not a polish detail.
 */
export const viewport: Viewport = {
  themeColor: '#e8eae7',
  colorScheme: 'light',
}

/**
 * Per-locale metadata, with reciprocal hreflang.
 *
 * This was one static English block serving both routes, so `/vi` advertised an
 * English title and description to every crawler and shared-link preview, and
 * neither route declared the other existed. Two locales that do not point at
 * each other are two competing pages, not one page in two languages.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const l: Locale = locale === 'vi' ? 'vi' : 'en'
  const canonical = l === 'en' ? '/' : `/${l}`

  return {
    metadataBase: new URL('https://canhta.com'),
    title: `${profile.name} — ${t(COPY.role, l)}`,
    description: t(profile.supporting, l),
    alternates: {
      canonical,
      languages: { en: '/', vi: '/vi', 'x-default': '/' },
    },
    openGraph: {
      type: 'profile',
      siteName: profile.name,
      locale: l === 'vi' ? 'vi_VN' : 'en_US',
      alternateLocale: l === 'vi' ? 'en_US' : 'vi_VN',
      url: canonical,
      title: t(profile.hook, l),
      description: t(profile.supporting, l),
    },
    twitter: {
      card: 'summary_large_image',
      title: t(profile.hook, l),
      description: t(profile.supporting, l),
    },
  }
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

  return (
    <html lang={locale} className={`${bvp.variable} ${plexMono.variable}`}>
      <body>
        <a href="#sheet" className="skip-link">
          {locale === 'vi' ? 'Tới nội dung chính' : 'Skip to content'}
        </a>
        <NextIntlClientProvider>
          <MotionProvider>
            {children}
          </MotionProvider>
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
