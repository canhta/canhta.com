import Link from 'next/link'
import { socialByNetwork } from '@/content'
import type { Locale } from '@/content/types'
import { t } from '@/lib/text'
import { GitHubIcon, LinkedInIcon } from './icons'

/**
 * These were hardcoded English on both routes. An accessible name is content:
 * a Vietnamese screen-reader user was getting an English landmark name and
 * English link names on a page that is otherwise fully translated.
 */
const COPY = {
  language: { en: 'Language', vi: 'Ngôn ngữ' },
  newTab: { en: 'opens in a new tab', vi: 'mở trong tab mới' },
} as const

/** Deliberately not a navbar and deliberately not sticky. */
export function UtilityRow({ locale }: { locale: Locale }) {
  const github = socialByNetwork('github')
  // Was X. That handle 404s, so it is out of the content set entirely and this
  // slot would have rendered nothing.
  const linkedin = socialByNetwork('linkedin')

  return (
    <div className="container-sheet">
      <div className="flex h-11 items-center justify-between">
        <Link
          href={locale === 'en' ? '/' : '/vi'}
          className="font-mono text-[11px] tracking-tight text-graphite transition-colors duration-150 hover:text-ink"
        >
          <span translate="no">canhta.com</span>
        </Link>

        <div className="flex items-center gap-1">
          <nav aria-label={t(COPY.language, locale)} className="flex items-center font-mono text-[11px]">
            <Link
              href="/"
              aria-current={locale === 'en' ? 'page' : undefined}
              className={`grid h-11 min-w-11 place-items-center transition-colors duration-150 ${
                locale === 'en' ? 'text-ink' : 'text-graphite hover:text-ink'
              }`}
            >
              EN
            </Link>
            <span aria-hidden="true" className="text-rule">
              /
            </span>
            <Link
              href="/vi"
              aria-current={locale === 'vi' ? 'page' : undefined}
              className={`grid h-11 min-w-11 place-items-center transition-colors duration-150 ${
                locale === 'vi' ? 'text-ink' : 'text-graphite hover:text-ink'
              }`}
            >
              VI
            </Link>
          </nav>

          {github ? (
            <a
              href={github.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`GitHub (${t(COPY.newTab, locale)})`}
              className="grid h-11 w-11 place-items-center text-graphite transition-colors duration-150 hover:text-ink"
            >
              <GitHubIcon />
            </a>
          ) : null}
          {linkedin ? (
            <a
              href={linkedin.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`LinkedIn (${t(COPY.newTab, locale)})`}
              className="grid h-11 w-11 place-items-center text-graphite transition-colors duration-150 hover:text-ink"
            >
              <LinkedInIcon />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  )
}
