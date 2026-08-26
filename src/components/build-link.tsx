import type { BuildLink, Locale } from '@/content/types'
import { linkLabel } from '@/lib/build-meta'
import { repoKey, type Stars } from '@/lib/github'
import { AppleIcon, DocsIcon, GitHubIcon, GlobeIcon, PlayStoreIcon } from './icons'

/**
 * One destination, wearing its own mark.
 *
 * Every link used to render identically with a generic `↗`, so "App Store",
 * "Google Play" and "Source" were three words in the same grey box and a scanner
 * had to read each one. The mark is what a person actually recognises.
 *
 * A GitHub link carries its star count when there is one. It is the only number
 * on this page anybody can check in a single click, which is exactly why it is
 * allowed to be here — and why it is read from the API at build rather than
 * typed into content.
 */
const ICONS = {
  appstore: AppleIcon,
  playstore: PlayStoreIcon,
  web: GlobeIcon,
  github: GitHubIcon,
  docs: DocsIcon,
} as const

export function BuildLinkButton({
  link,
  locale,
  stars,
}: {
  link: BuildLink
  locale: Locale
  stars: Stars
}) {
  const Icon = ICONS[link.kind]
  const key = link.kind === 'github' ? repoKey(link.url) : null
  const count = key ? stars[key] : undefined

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex h-11 items-center gap-2 border border-rule px-3 font-mono text-[11px] tracking-[0.1em] uppercase transition-colors duration-150 hover:border-ink"
    >
      <Icon aria-hidden="true" width={14} height={14} />
      {linkLabel(link.kind, locale)}
      {typeof count === 'number' ? (
        <>
          <span aria-hidden="true" className="text-rule-strong">
            ·
          </span>
          {/* tabular figures so a row of counts lines up */}
          <span className="tnum inline-flex items-center gap-1">
            <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden="true">
              <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.35 6.19 20.4 7.3 13.93 2.6 9.35l6.5-.95L12 2.5Z" />
            </svg>
            {count}
          </span>
          <span className="sr-only">
            {locale === 'vi' ? 'sao trên GitHub' : 'stars on GitHub'}
          </span>
        </>
      ) : null}
      <span aria-hidden="true">↗</span>
    </a>
  )
}
