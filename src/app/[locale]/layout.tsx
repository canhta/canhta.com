import type { Metadata, Viewport } from 'next'
import { Be_Vietnam_Pro, IBM_Plex_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { profile } from '@/content'
import type { Locale } from '@/content/types'
import { t } from '@/lib/text'
import { MotionProvider } from '@/components/motion-provider'
import '../globals.css'

// A Vietnamese-designed typeface for a Vietnamese builder's bilingual site.
// Full diacritic coverage, and a real choice rather than the default sans.
const bvp = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '800'],
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
      </body>
    </html>
  )
}
