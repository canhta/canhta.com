import Link from 'next/link'
import { socialByNetwork } from '@/content'
import type { Locale } from '@/content/types'
import { GitHubIcon, XIcon } from './icons'

/** Deliberately not a navbar and deliberately not sticky. */
export function UtilityRow({ locale }: { locale: Locale }) {
  const github = socialByNetwork('github')
  const x = socialByNetwork('x')

  return (
    <div className="container-sheet">
      <div className="flex h-11 items-center justify-between">
        <Link
          href={locale === 'en' ? '/' : '/vi'}
          className="font-mono text-[13px] tracking-tight text-graphite transition-colors duration-150 hover:text-ink"
        >
          canhta.com
        </Link>

        <div className="flex items-center gap-1">
          <nav aria-label="Language" className="flex items-center font-mono text-[13px]">
            <Link
              href="/"
              aria-current={locale === 'en' ? 'true' : undefined}
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
              aria-current={locale === 'vi' ? 'true' : undefined}
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
              aria-label="GitHub"
              className="grid h-11 w-11 place-items-center text-graphite transition-colors duration-150 hover:text-ink"
            >
              <GitHubIcon />
            </a>
          ) : null}
          {x ? (
            <a
              href={x.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="X"
              className="grid h-11 w-11 place-items-center text-graphite transition-colors duration-150 hover:text-ink"
            >
              <XIcon />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  )
}
