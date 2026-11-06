import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/content/types'
import { About } from '@/components/about'
import { HomeQuestions } from '@/components/answers'
import { Closing } from '@/components/closing'
import { Hero } from '@/components/hero'
import { OfferCards } from '@/components/offers'
import { PageShell } from '@/components/page-shell'
import { AppsTeaser } from '@/components/products'
import { pageMetadata } from '@/lib/metadata'
import { buildGraph } from '@/lib/structured-data'

/**
 * Home: the hook, what we do, a look at the apps, who we are, the ask. Short on purpose:
 * every other topic has its own page, so a phone visitor reaches the end of this
 * one in a few screens and the detail is one tap away.
 */
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  return pageMetadata((await params).locale, 'home')
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <PageShell locale={locale} jsonLd={buildGraph(locale, 'home')}>
      <div className="first-screen">
        <Hero locale={locale} />
      </div>
      <OfferCards locale={locale} />
      <HomeQuestions locale={locale} />
      <AppsTeaser locale={locale} />
      <About locale={locale} />
      <Closing locale={locale} />
    </PageShell>
  )
}
