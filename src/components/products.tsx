import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { AppCard } from './app-card'
import { BuildLinkButton } from './build-link'
import { Words } from './words'

/**
 * Home: the two apps as short rows (icon, name, one line, their site) after
 * the services. Never pushed: no screenshots here; those live on the products
 * page, one link away.
 */
export function AppsTeaser({ locale }: { locale: Locale }) {
  const featured = getSiteContent(locale).builds.filter((b) => b.shots?.length)
  if (featured.length === 0) return null
  const copy = getMessages(locale).home

  return (
    <section aria-labelledby="apps-title" className="band sheet ground-night on-night">
      <div className="shell">
        <div className="title-band reveal flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <h2 id="apps-title" className="section-title max-w-[14ch]">
            <Words text={copy.appsHeading} />
          </h2>
          <Link href="/products" className="link inline-flex min-h-11 items-center font-bold">
            {copy.appsAll}
          </Link>
        </div>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {featured.map((build) => (
            <li key={build.slug} className="app-row">
              {build.logo ? (
                <Image
                  src={build.logo}
                  alt=""
                  width={48}
                  height={48}
                  className="size-12 shrink-0 rounded-xl"
                  unoptimized={build.logo.endsWith('.svg')}
                />
              ) : null}
              <div className="min-w-0 flex-1">
                <h3 className="subtitle" translate="no">
                  {build.name}
                </h3>
                <p className="cell-muted mt-1 text-[15px] leading-snug">{build.tagline}</p>
              </div>
              {build.links[0] ? <BuildLinkButton link={build.links[0]} locale={locale} /> : null}
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
              <AppCard build={build} locale={locale} />
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
 * They are the largest thing on the first screen (the LCP), so they are preloaded
 * and fetched at high priority.
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
            fetchPriority="high"
            unoptimized={build.logo!.endsWith('.svg')}
          />
        </span>
      ))}
    </div>
  )
}
