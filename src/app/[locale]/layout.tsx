import type { Metadata } from 'next'
import { Be_Vietnam_Pro, IBM_Plex_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  metadataBase: new URL('https://canhta.com'),
  title: 'Canh Ta — Agentic Product Builder',
  description:
    'I design and ship agentic systems, mobile apps, and focused mini-SaaS products.',
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
        <NextIntlClientProvider>
          <MotionProvider>{children}</MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
