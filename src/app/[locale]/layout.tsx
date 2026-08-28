import type { Metadata, Viewport } from 'next'
import { Be_Vietnam_Pro, Newsreader } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { routing } from '@/i18n/routing'
import { profile } from '@/content'
import type { Locale } from '@/content/types'
import { t } from '@/lib/text'
import '../globals.css'

// The organising voice: labels, controls, metadata, body copy.
// A Vietnamese-designed typeface for a Vietnamese builder's bilingual site —
// full diacritic coverage, and a real choice rather than the default sans.
// Two weights only. Every declared weight is two more font files (latin +
// vietnamese) on a page whose LCP element is text, so an unused weight is pure
// LCP cost — 800 went with the old display face that no longer sets anything.
const bvp = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500'],
  variable: '--font-bvp',
  display: 'swap',
})

// The arguing voice: the hook, every section title, every product name.
//
// There are no screenshots on this site and no metrics anyone could check, so
// the sentences are the product demo. A serif is what makes a page read as
// written rather than assembled — and Newsreader is one of the few editorial
// faces with a real Vietnamese subset, which is not optional here.
//
// Declared without `weight`: this is a variable font, so one file covers the
// whole range and next/font refuses a weight list for it.
const newsreader = Newsreader({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-newsreader',
  display: 'swap',
})

const COPY = {
  role: { en: 'Agentic product builder', vi: 'Người xây sản phẩm agentic' },
} as const

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
 * against draft copy — which is what the draft notice on the page says too.
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
  themeColor: '#fbf9f5',
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
    <html lang={locale} className={`${bvp.variable} ${newsreader.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          {locale === 'vi' ? 'Tới nội dung chính' : 'Skip to content'}
        </a>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
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
