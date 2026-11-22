import Image from 'next/image'
import { getSiteContent } from '@/content'
import { getPageCopy } from '@/content/pages'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { Link } from '@/i18n/navigation'
import type { AppPage } from '@/lib/metadata'
import { Closing } from './closing'
import { DocBody, DocLinks } from './doc-body'
import { PageHeader } from './page-header'
import { PhoneShot } from './phone-shot'
import { Tilt } from './tilt'
import { Words } from './words'

/**
 * One app's own page: what it does, who it is for, where it works, and the
 * app's own site, support and privacy pages. No status, no store badges, no
 * counts (AGENTS.md). The head shows the app's screens on its colour, or its
 * name when there are no screens in the repo.
 */
export function AppDetail({ locale, slug }: { locale: Locale; slug: AppPage }) {
  const build = getSiteContent(locale).builds.find((b) => b.slug === slug)!
  const copy = getPageCopy(locale).apps[slug]
  const labels = getMessages(locale).appPage
  const shots = (build.shots ?? []).slice(0, 2)

  const visual = shots.length ? (
    <div className="app-hero app-media" data-theme={slug}>
      {shots.map((shot) => (
        <div key={shot} className="phone-slot w-[42%] max-w-[220px]">
          <Tilt>
            <PhoneShot slug={slug} shot={shot} locale={locale} sizes="(min-width: 1024px) 220px, 40vw" />
          </Tilt>
        </div>
      ))}
    </div>
  ) : (
    <div className="app-hero app-media app-word" data-theme={slug} aria-hidden="true">
      <span translate="no">{build.name}</span>
    </div>
  )

  return (
    <>
      <PageHeader title={copy.h1} intro={copy.intro} visual={visual} />

      <section aria-labelledby="features-title" className="band sheet ground-tint">
        <div className="shell">
          <div className="flex items-center gap-4">
            {build.logo ? (
              <Image
                src={build.logo}
                alt=""
                width={56}
                height={56}
                unoptimized={build.logo.endsWith('.svg')}
                className="size-14 rounded-2xl"
              />
            ) : null}
            <h2 id="features-title" className="section-title">
              <Words text={labels.featuresHeading} />
            </h2>
          </div>
          <dl className="mt-10 grid gap-x-12 sm:grid-cols-2">
            {copy.features.map((f) => (
              <div key={f.name} className="reveal border-t border-black/15 py-5">
                <dt className="subtitle">{f.name}</dt>
                <dd className="lead mt-2 max-w-[44ch]">{f.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-label={build.name} className="band sheet ground-night on-night">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="reveal lg:col-span-7">
            <h2 className="section-title">{labels.audienceHeading}</h2>
            <p className="mt-5 max-w-[46ch] text-[clamp(1.0625rem,1rem+0.4vw,1.3125rem)] leading-[1.55]">
              {copy.audience}
            </p>
          </div>
          <div className="reveal lg:col-span-5">
            <h2 className="title">{labels.platformsHeading}</h2>
            <p className="lead mt-3 max-w-[40ch]">{copy.platforms}</p>
            <h2 className="title mt-8">{labels.linksHeading}</h2>
            <DocLinks links={copy.links} className="mt-2" />
            <p className="mt-8 flex flex-wrap gap-x-6">
              <Link href="/services" className="link inline-flex min-h-11 items-center font-bold">
                {getMessages(locale).apps.servicesLink}
              </Link>
              <Link href="/products" className="link inline-flex min-h-11 items-center font-bold">
                {labels.allProducts}
              </Link>
            </p>
          </div>
        </div>
      </section>

      <DocBody sections={copy.notes} />

      <Closing locale={locale} />
    </>
  )
}
