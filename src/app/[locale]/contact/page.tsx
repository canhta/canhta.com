import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { ContactActions } from '@/components/contact-actions'
import { PageHeader } from '@/components/page-header'
import { PageShell } from '@/components/page-shell'
import { pageMetadata } from '@/lib/metadata'
import { buildGraph } from '@/lib/structured-data'

/** One ask: a problem or an idea, no brief. Three ways to send it. */
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  return pageMetadata((await params).locale, 'contact')
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const messages = getMessages(locale)
  const copy = messages.contact
  const next = messages.process.steps.slice(1)

  return (
    <PageShell locale={locale} jsonLd={buildGraph(locale, 'contact')}>
      <PageHeader title={copy.h1} intro={copy.body} />
      <section className="shell band-2">
        <ContactActions locale={locale} />
      </section>
      <section aria-labelledby="help-title" className="shell band-1">
        <h2 id="help-title" className="subtitle">
          {copy.helpHeading}
        </h2>
        <ul className="mt-4 grid max-w-[44ch] gap-2 text-[17px]">
          {copy.help.map((item) => (
            <li key={item} className="border-t border-ink pt-2">
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="next-title" className="shell band-1">
        <h2 id="next-title" className="subtitle">
          {copy.nextHeading}
        </h2>
        <ol className="mt-4 grid max-w-[52ch] gap-4">
          {next.map((step) => (
            <li key={step.id} className="border-t border-ink pt-3">
              <p className="font-bold">{step.label}</p>
              <p className="text-[15px] text-muted">{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>
    </PageShell>
  )
}
