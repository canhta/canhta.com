import Image from 'next/image'
import type { Build, Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { Link } from '@/i18n/navigation'
import type { AppPathname } from '@/i18n/routing'
import { BuildLinkButton } from './build-link'
import { PhoneShot } from './phone-shot'
import { Tilt } from './tilt'

/**
 * One app, as a rounded panel on the dark band. The app's own colour sits
 * behind two overlapping phone screens that lean toward the pointer; the text
 * is light on a dark card below. Used on the products page, where the card
 * name follows the h1, so it is an h2. Platform is text, never only a colour or
 * an image. An app with no screens in the repo shows its name on its colour
 * instead, and the panel lies on its side (`app-card-wide`).
 */
export function AppCard({ build, locale }: { build: Build; locale: Locale }) {
  const shown = (build.shots ?? []).slice(0, 2)
  const copy = getMessages(locale).apps

  return (
    <article
      id={build.slug}
      data-theme={build.slug}
      data-tilt=""
      className={`app-card on-night ${shown.length ? '' : 'app-card-wide'}`}
    >
      {shown.length > 0 ? (
        <div className="app-media">
          {shown.map((shot) => (
            <div key={shot} className="phone-slot w-[40%] max-w-[210px]">
              <Tilt>
                <PhoneShot
                  slug={build.slug}
                  shot={shot}
                  locale={locale}
                  sizes="(min-width: 540px) 210px, 36vw"
                />
              </Tilt>
            </div>
          ))}
        </div>
      ) : (
        <div className="app-media app-word" aria-hidden="true">
          <span translate="no">{build.name}</span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-3">
          {build.logo ? (
            <Image
              src={build.logo}
              alt=""
              width={48}
              height={48}
              unoptimized={build.logo.endsWith('.svg')}
              className="h-12 w-12 rounded-[14px]"
            />
          ) : null}
          <h2 className="title" translate="no">
            {build.name}
          </h2>
        </div>
        <p className="subtitle mt-4">{build.tagline}</p>
        <p className="cell-muted mt-2 text-[14px] leading-relaxed">{build.summary}</p>

        <p className="mt-5 text-[14px] leading-snug">
          <span className="cell-muted">{build.availability}</span>
        </p>
        <ul data-no-bar className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          {build.detail ? (
            <li>
              <Link
                href={`/products/${build.slug}` as AppPathname}
                className="link inline-flex min-h-11 items-center font-bold"
              >
                {copy.detailLink.replace('{name}', build.name)}
              </Link>
            </li>
          ) : null}
          {build.links.map((link) => (
            <li key={link.kind}>
              <BuildLinkButton link={link} locale={locale} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
