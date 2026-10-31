import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { AppCard } from './app-card'

/**
 * Home: the two apps as a compact dark band after the services. On a phone the
 * panels swipe; from tablet up they sit side by side. Never pushed: one heading,
 * one link to the rest.
 */
export function AppsTeaser({ locale }: { locale: Locale }) {
  const featured = getSiteContent(locale).builds.filter((b) => b.shots?.length)
  if (featured.length === 0) return null
  const copy = getMessages(locale).home

  return (
    <section aria-labelledby="apps-title" className="band sheet ground-night on-night">
      <div className="shell">
        <div className="title-band reveal flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
          <h2 id="apps-title" className="headline max-w-[14ch]">
            {copy.appsHeading}
          </h2>
          <Link href="/products" className="btn-light">
            {copy.appsAll}
          </Link>
        </div>
        <ul className="snap-row mt-10">
          {featured.map((build) => (
            <li key={build.slug}>
              <AppCard build={build} locale={locale} variant="compact" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Apps page: the same panels, larger phones. */
export function AppsFull({ locale }: { locale: Locale }) {
  const featured = getSiteContent(locale).builds.filter((b) => b.shots?.length)

  return (
    <section className="band sheet ground-tint" aria-label={getMessages(locale).apps.h1}>
      <div className="shell">
        <ul className="grid gap-4 md:grid-cols-2 md:gap-5">
          {featured.map((build) => (
            <li key={build.slug} className="reveal">
              <AppCard build={build} locale={locale} variant="full" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/**
 * The head of the products page: the two apps' own icons, large, on the colour
 * each app already wears on its panel below. Decorative, so no text and no alt.
 */
export function AppMarks({ locale }: { locale: Locale }) {
  const marks = getSiteContent(locale).builds.filter((b) => b.shots?.length && b.logo)
  if (marks.length === 0) return null

  return (
    <div className="marks" aria-hidden="true">
      {marks.map((build) => (
        <span key={build.slug} className="mark" data-theme={build.slug}>
          <Image
            src={build.logo!}
            alt=""
            width={144}
            height={144}
            preload
            unoptimized={build.logo!.endsWith('.svg')}
          />
        </span>
      ))}
    </div>
  )
}
