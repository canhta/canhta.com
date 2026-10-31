import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { BuildLinkButton } from './build-link'

/** The other public projects, as wide rows on a dark band. */
export function PublicProjects({ locale }: { locale: Locale }) {
  const others = getSiteContent(locale).builds.filter((b) => !b.shots?.length)
  if (others.length === 0) return null
  const copy = getMessages(locale).apps

  return (
    <section aria-labelledby="public-title" className="band sheet ground-night on-night">
      <div className="shell">
        <h2 id="public-title" className="headline reveal max-w-[16ch]">
          {copy.publicHeading}
        </h2>
        <ul className="mt-10 grid gap-4">
          {others.map((build) => (
            <li key={build.slug} className="row-card reveal">
              <div className="lg:col-span-4">
                <h3 className="title" translate="no">
                  {build.name}
                </h3>
                <p className="mt-2 text-[15px] leading-snug text-muted">
                  {build.availability}
                </p>
              </div>
              <div className="lg:col-span-5">
                <p className="subtitle">{build.tagline}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{build.summary}</p>
              </div>
              <ul className="flex flex-wrap content-start gap-2 lg:col-span-3 lg:justify-end">
                {build.links.map((link) => (
                  <li key={link.kind}>
                    <BuildLinkButton link={link} locale={locale} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
