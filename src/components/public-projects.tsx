import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { fetchStars } from '@/lib/github'
import { statusLabel } from '@/lib/status'
import { BuildLinkButton } from './build-link'

/** The other public projects, as plain rows. */
export async function PublicProjects({ locale }: { locale: Locale }) {
  const others = getSiteContent(locale).builds.filter((b) => !b.shots?.length)
  if (others.length === 0) return null
  const copy = getMessages(locale).apps
  // Fetched once at build; fails soft to an empty map.
  const stars = await fetchStars(others)

  return (
    <section aria-labelledby="public-title" className="shell band-1">
      <h2 id="public-title" className="title">
        {copy.publicHeading}
      </h2>
      <ul className="mt-6 grid gap-4">
        {others.map((build) => (
          <li
            key={build.slug}
            className="reveal card grid gap-4 lg:grid-cols-12 lg:gap-10"
          >
            <div className="lg:col-span-4">
              <h3 className="subtitle" translate="no">
                {build.name}
              </h3>
              <p className="mt-1 text-[14px] text-muted">
                {statusLabel(build.status, locale)}. {build.availability}
              </p>
            </div>
            <div className="lg:col-span-5">
              <p className="font-bold">{build.tagline}</p>
              <p className="mt-1 text-[15px] leading-relaxed text-muted">{build.summary}</p>
            </div>
            <ul className="flex flex-wrap content-start gap-2 lg:col-span-3 lg:justify-end">
              {build.links.map((link) => (
                <li key={link.kind}>
                  <BuildLinkButton link={link} locale={locale} stars={stars} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}
