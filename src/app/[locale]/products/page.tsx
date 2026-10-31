import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { Closing } from '@/components/closing'
import { PageHeader } from '@/components/page-header'
import { PageShell } from '@/components/page-shell'
import { AppMarks, AppsFull } from '@/components/products'
import { PublicProjects } from '@/components/public-projects'
import { pageMetadata } from '@/lib/metadata'
import { buildGraph } from '@/lib/structured-data'

/** Some of the apps we make, each with its own site. */
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  return pageMetadata((await params).locale, 'products')
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const copy = getMessages(locale).apps

  return (
    <PageShell locale={locale} jsonLd={buildGraph(locale, 'products')}>
      <PageHeader
        title={copy.h1}
        intro={copy.intro}
        visual={<AppMarks locale={locale} />}
      />
      <AppsFull locale={locale} />
      <PublicProjects locale={locale} />
      <Closing locale={locale} />
    </PageShell>
  )
}
