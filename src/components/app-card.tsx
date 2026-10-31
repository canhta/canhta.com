import Image from 'next/image'
import type { Build, Locale } from '@/content/types'
import { statusLabel } from '@/lib/status'
import { BuildLinkButton } from './build-link'
import { PhoneShot } from './phone-shot'
import { Tilt } from './tilt'

/**
 * One app. The card is the same white skeleton for every app; the app's own
 * colour lives only in the panel behind its screens. Status and platform are
 * text, never only a colour or an image.
 */
export function AppCard({
  build,
  locale,
  variant,
}: {
  build: Build
  locale: Locale
  variant: 'compact' | 'full'
}) {
  const shots = build.shots ?? []
  const shown = variant === 'compact' ? shots.slice(0, 1) : shots
  // Under the home page's section heading a card name is an h3; on the products
  // page it follows the h1 directly, so it is an h2 (no skipped level).
  const Heading = variant === 'full' ? 'h2' : 'h3'

  return (
    <article data-theme={build.slug} className="app-card">
      {shown.length > 0 ? (
        <div className="app-media">
          {shown.map((shot) => (
            <Tilt key={shot} className={variant === 'compact' ? 'w-[148px]' : 'w-[42%] max-w-[220px]'}>
              <PhoneShot
                slug={build.slug}
                shot={shot}
                locale={locale}
                sizes={variant === 'compact' ? '160px' : '(min-width: 1024px) 220px, 40vw'}
              />
            </Tilt>
          ))}
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center gap-3">
          {build.logo ? (
            <Image src={build.logo} alt="" width={44} height={44} className="h-11 w-11 rounded-[11px]" />
          ) : null}
          <Heading className="title" translate="no">
            {build.name}
          </Heading>
        </div>
        <p className="subtitle mt-4">{build.tagline}</p>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{build.summary}</p>

        <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[14px]">
          <span>
            <span className="font-bold">{statusLabel(build.status, locale)}.</span>{' '}
            <span className="text-muted">{build.availability}</span>
          </span>
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {build.links.map((link) => (
            <li key={link.kind}>
              <BuildLinkButton link={link} locale={locale} stars={{}} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
