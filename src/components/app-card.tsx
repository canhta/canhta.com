import Image from 'next/image'
import type { Build, Locale } from '@/content/types'
import { statusLabel } from '@/lib/status'
import { BuildLinkButton } from './build-link'
import { PhoneShot } from './phone-shot'
import { Tilt } from './tilt'

/**
 * One app, as a rounded panel on the dark band. The app's own colour sits
 * behind two overlapping phone screens that lean toward the pointer; the text
 * is light on a dark card below. The compact version (home) leaves out the long
 * summary; the products page carries it. Status and platform are text, never only a
 * colour or an image.
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
  const shown = (build.shots ?? []).slice(0, 2)
  // Under the home page's section heading a card name is an h3; on the products
  // page it follows the h1 directly, so it is an h2 (no skipped level).
  const Heading = variant === 'full' ? 'h2' : 'h3'
  const phoneWidth = variant === 'compact' ? 'w-[40%] max-w-[124px]' : 'w-[40%] max-w-[210px]'

  return (
    <article data-theme={build.slug} className="app-card on-night">
      {shown.length > 0 ? (
        <div className="app-media">
          {shown.map((shot) => (
            <div key={shot} className={`phone-slot ${phoneWidth}`}>
              <Tilt>
                <PhoneShot
                  slug={build.slug}
                  shot={shot}
                  locale={locale}
                  sizes={variant === 'compact' ? '124px' : '(min-width: 1024px) 210px, 40vw'}
                />
              </Tilt>
            </div>
          ))}
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex items-center gap-3">
          {build.logo ? (
            <Image src={build.logo} alt="" width={48} height={48} className="h-12 w-12 rounded-[14px]" />
          ) : null}
          <Heading className="title" translate="no">
            {build.name}
          </Heading>
        </div>
        <p className="subtitle mt-4">{build.tagline}</p>
        {variant === 'full' ? <p className="cell-muted mt-2 text-[15px] leading-relaxed">{build.summary}</p> : null}

        <p className="mt-5 text-[14px] leading-snug">
          <span className="font-extrabold text-accent">{statusLabel(build.status, locale)}.</span>{' '}
          <span className="cell-muted">{build.availability}</span>
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
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
