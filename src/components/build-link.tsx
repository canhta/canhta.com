import type { BuildLink, Locale } from '@/content/types'
import { linkLabel } from '@/lib/build-meta'
import { DocsIcon, GitHubIcon, GlobeIcon } from './icons'

/** One destination, wearing its own mark. No counts: the page carries no metrics. */
const ICONS = {
  web: GlobeIcon,
  github: GitHubIcon,
  docs: DocsIcon,
} as const

export function BuildLinkButton({ link, locale }: { link: BuildLink; locale: Locale }) {
  const Icon = ICONS[link.kind]

  return (
    <a href={link.url} target="_blank" rel="noreferrer noopener" className="chip">
      <Icon aria-hidden="true" width={15} height={15} />
      {linkLabel(link.kind, locale)}
    </a>
  )
}
