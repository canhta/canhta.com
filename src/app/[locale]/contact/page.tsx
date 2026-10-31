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
      <PageHeader title={copy.h1} intro={copy.body}>
        <ContactActions locale={locale} />
      </PageHeader>

      <section className="band sheet ground-tint" aria-labelledby="help-title">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="reveal lg:col-span-5">
            <h2 id="help-title" className="headline">
              {copy.helpHeading}
            </h2>
            <ul className="mt-8 grid gap-3">
              {copy.help.map((item) => (
                <li
                  key={item}
                  className="rounded-[28px] bg-white px-6 py-5 text-[clamp(1.1rem,1.8vw,1.35rem)] leading-snug font-bold shadow-[var(--shadow-card)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal lg:col-span-7" aria-labelledby="next-title" role="region">
            <h2 id="next-title" className="headline">
              {copy.nextHeading}
            </h2>
            <ol className="mt-8">
              {next.map((step, i) => (
                <li key={step.id} className="step">
                  <p aria-hidden="true" className="step-num !text-[clamp(3.5rem,8vw,5.5rem)]">
                    {i + 2}
                  </p>
                  <div className="min-w-0">
                    <h3 className="title max-w-[20ch]">{step.label}</h3>
                    <p className="lead mt-2 max-w-[36ch]">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
