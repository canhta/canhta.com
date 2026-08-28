import Image from 'next/image'
import Link from 'next/link'
import { profile, socialByNetwork } from '@/content'
import type { Locale } from '@/content/types'
import { t } from '@/lib/text'
import { GitHubIcon, XIcon } from './icons'

/**
 * Not a navbar and deliberately not sticky — there is one page and nothing to
 * navigate to. What it carries is identity (who is this) and the two controls a
 * visitor might actually want before reading: the language, and the two places
 * they can go verify the person exists.
 *
 * An accessible name is content, so every label here is translated. A Vietnamese
 * screen-reader user was previously getting English landmark and link names on a
 * page that is otherwise fully translated.
 */
const COPY = {
  language: { en: 'Language', vi: 'Ngôn ngữ' },
  newTab: { en: 'opens in a new tab', vi: 'mở trong tab mới' },
  role: { en: 'Agentic product builder', vi: 'Người xây sản phẩm agentic' },
} as const

export function SiteHeader({ locale }: { locale: Locale }) {
  const github = socialByNetwork('github')
  const x = socialByNetwork('x')
  const home = locale === 'en' ? '/' : '/vi'

  return (
    <header className="shell flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 pb-2 sm:pt-8">
      <Link href={home} className="flex min-w-0 items-center gap-3">
        <Image
          src={profile.avatar}
          alt={`${profile.name}, portrait`}
          width={36}
          height={36}
          priority
          className="h-9 w-9 shrink-0 rounded-full object-cover"
        />
        <span className="min-w-0">
          <span className="block truncate text-[15px] leading-tight font-medium" translate="no">
            {profile.name}
          </span>
          <span className="block truncate text-[13px] leading-tight text-muted">
            {t(COPY.role, locale)}
          </span>
        </span>
      </Link>

      <div className="ml-auto flex items-center gap-1">
        <nav aria-label={t(COPY.language, locale)} className="flex items-center text-[13px]">
          {/* 44px minimum on both axes: these are the smallest targets on the
              page and they sit next to each other, which is exactly where a
              mis-tap costs a visitor their reading position. */}
          <Link
            href="/"
            aria-current={locale === 'en' ? 'page' : undefined}
            className={`grid h-11 min-w-11 place-items-center transition-colors duration-150 ${
              locale === 'en' ? 'font-medium text-ink' : 'text-muted hover:text-ink'
            }`}
          >
            EN
          </Link>
          <span aria-hidden="true" className="text-line-strong">
            /
          </span>
          <Link
            href="/vi"
            aria-current={locale === 'vi' ? 'page' : undefined}
            className={`grid h-11 min-w-11 place-items-center transition-colors duration-150 ${
              locale === 'vi' ? 'font-medium text-ink' : 'text-muted hover:text-ink'
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
            className="grid h-11 w-11 place-items-center text-muted transition-colors duration-150 hover:text-ink"
          >
            <GitHubIcon />
          </a>
        ) : null}
        {x ? (
          <a
            href={x.url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`X (${t(COPY.newTab, locale)})`}
            className="grid h-11 w-11 place-items-center text-muted transition-colors duration-150 hover:text-ink"
          >
            <XIcon />
          </a>
        ) : null}
      </div>
    </header>
  )
}
