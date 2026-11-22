import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/content/types'
import { routing } from '@/i18n/routing'
import { AppDetail } from '@/components/app-detail'
import { PageShell } from '@/components/page-shell'
import { APP_PAGES, pageMetadata, type AppPage } from '@/lib/metadata'
import { buildGraph } from '@/lib/structured-data'

/** One page per app: Scori, Remoti and Piggo. Any other slug is a 404. */
export const dynamicParams = false

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => APP_PAGES.map((slug) => ({ locale, slug })))
}

function asApp(slug: string): AppPage {
  if (!(APP_PAGES as readonly string[]).includes(slug)) notFound()
  return slug as AppPage
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params
  return pageMetadata(locale, asApp(slug))
}

export default async function AppPageRoute({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const app = asApp(slug)

  return (
    <PageShell locale={locale} jsonLd={buildGraph(locale, app)}>
      <AppDetail locale={locale} slug={app} />
    </PageShell>
  )
}
