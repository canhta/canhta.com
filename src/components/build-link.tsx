import type { BuildLink, Locale } from '@/content/types'
import { githubStarsLabel, linkLabel } from '@/lib/build-meta'
import { repoKey, type Stars } from '@/lib/github'
import { AppleIcon, DocsIcon, GitHubIcon, GlobeIcon, PlayStoreIcon } from './icons'

/**
 * One destination, wearing its own mark. A GitHub link carries its star count
 * when there is one: the only number on the page anybody can check in a click,
 * read from the API at build time rather than typed into content.
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
    <a href={link.url} target="_blank" rel="noreferrer noopener" className="chip">
      <Icon aria-hidden="true" width={15} height={15} />
      {linkLabel(link.kind, locale)}
      {typeof count === 'number' ? (
        <>
          <span className="tnum inline-flex items-center gap-1">
            <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden="true">
              <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.35 6.19 20.4 7.3 13.93 2.6 9.35l6.5-.95L12 2.5Z" />
            </svg>
            {count}
          </span>
          <span className="sr-only">{githubStarsLabel(count, locale)}</span>
        </>
      ) : null}
      <span aria-hidden="true">↗</span>
    </a>
  )
}
