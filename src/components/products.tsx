import { Link } from '@/i18n/navigation'
import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { AppCard } from './app-card'
import { SectionHeading } from './section'

/** Home: the two apps as compact cards, with a way to the apps page. */
export function AppsTeaser({ locale }: { locale: Locale }) {
  const featured = getSiteContent(locale).builds.filter((b) => b.shots?.length)
  if (featured.length === 0) return null
  const copy = getMessages(locale).home

  return (
    <section aria-labelledby="apps-title" className="shell band-1 reveal">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading id="apps-title" title={copy.appsHeading} />
        <Link href="/products" className="btn-secondary">
          {copy.appsAll}
        </Link>
      </div>
      <ul className="snap-row mt-8" data-cols="2">
        {featured.map((build) => (
          <li key={build.slug}>
            <AppCard build={build} locale={locale} variant="compact" />
          </li>
        ))}
      </ul>
    </section>
  )
}

/** Apps page: the same cards with every screen shown. */
export function AppsFull({ locale }: { locale: Locale }) {
  const featured = getSiteContent(locale).builds.filter((b) => b.shots?.length)

  return (
    <section className="shell band-2">
      <div className="grid gap-6 lg:grid-cols-2">
        {featured.map((build) => (
          <div key={build.slug} className="reveal">
            <AppCard build={build} locale={locale} variant="full" />
          </div>
        ))}
      </div>
    </section>
  )
}
