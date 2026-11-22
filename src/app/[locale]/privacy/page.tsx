import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/content/types'
import { getPageCopy } from '@/content/pages'
import { DocBody } from '@/components/doc-body'
import { PageHeader } from '@/components/page-header'
import { PageShell } from '@/components/page-shell'
import { pageMetadata } from '@/lib/metadata'
import { buildGraph } from '@/lib/structured-data'


export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  return pageMetadata((await params).locale, 'privacy')
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const copy = getPageCopy(locale).privacy

  return (
    <PageShell locale={locale} jsonLd={buildGraph(locale, 'privacy')}>
      <PageHeader title={copy.h1} intro={copy.intro} />
      <DocBody sections={copy.sections} updated={copy.updated} />

    </PageShell>
  )
}
