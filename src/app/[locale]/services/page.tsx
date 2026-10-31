import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { Answers } from '@/components/answers'
import { Closing } from '@/components/closing'
import { OfferList } from '@/components/offers'
import { PageHeader } from '@/components/page-header'
import { PageShell } from '@/components/page-shell'
import { Process } from '@/components/process'
import { pageMetadata } from '@/lib/metadata'
import { buildGraph } from '@/lib/structured-data'

/** The commercial page: what we do for small businesses and individuals. */
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  return pageMetadata((await params).locale, 'services')
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const copy = getMessages(locale).services

  return (
    <PageShell locale={locale} jsonLd={buildGraph(locale, 'services')}>
      <PageHeader title={copy.h1} intro={copy.intro} />
      <OfferList locale={locale} />
      <Process locale={locale} />
      <Answers locale={locale} />
      <Closing locale={locale} />
    </PageShell>
  )
}
