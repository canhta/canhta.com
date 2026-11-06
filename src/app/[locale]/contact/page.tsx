import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { ContactActions } from '@/components/contact-actions'
import { PageHeader } from '@/components/page-header'
import { PageShell } from '@/components/page-shell'
import { pageMetadata } from '@/lib/metadata'
import { buildGraph } from '@/lib/structured-data'

/** One ask: a problem or an idea, no brief. Four ways to send it. */
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  return pageMetadata((await params).locale, 'contact')
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const messages = getMessages(locale)
  const copy = messages.contact

  return (
    <PageShell locale={locale} jsonLd={buildGraph(locale, 'contact')}>
      <PageHeader title={copy.h1} intro={copy.body}>
        <ContactActions locale={locale} />
      </PageHeader>

      <section className="band sheet ground-tint" aria-labelledby="help-title">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="reveal lg:col-span-5">
            <h2 id="help-title" className="section-title">
              {copy.helpHeading}
            </h2>
            <ul className="mt-6 grid">
              {copy.help.map((item) => (
                <li
                  key={item}
                  className="border-t border-black/15 py-4 text-[clamp(1rem,0.95rem+0.3vw,1.1875rem)] leading-snug font-bold last:border-b"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal lg:col-span-7" aria-labelledby="next-title" role="region">
            <h2 id="next-title" className="section-title">
              {copy.nextHeading}
            </h2>
            <p className="lead mt-6 max-w-[40ch]">{copy.next}</p>
            <p className="mt-4">
              <Link
                href={{ pathname: '/services', hash: 'process-title' }}
                className="link inline-flex min-h-11 items-center font-bold"
              >
                {messages.services.processHeading}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
