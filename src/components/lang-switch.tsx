'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Page = { key: string; en: string; vi: string }

/**
 * EN / VI. It has to know the current path to land on the same page in the
 * other language, so it is client code. Used in the header pill (`light`) and in
 * the footer's bottom bar (`night`). The label and the page table arrive as props.
 * The other language is never prefetched: few visitors switch, and prefetching
 * would fetch a copy of every page in it on every visit.
 */
export function LangSwitch({
  locale,
  label,
  pages,
  tone = 'light',
}: {
  locale: 'en' | 'vi'
  label: string
  pages: Page[]
  tone?: 'light' | 'night'
}) {
  const rest = usePathname().replace(/^\/(en|vi)(?=\/|$)/, '').replace(/\/$/, '') || '/'
  const here = pages.find((p) => rest === p.key || p.en === rest || p.vi.replace(/^\/vi/, '') === rest)
  const idle = tone === 'night' ? 'text-on-dark hover:bg-white/15 hover:text-white' : 'text-muted hover:bg-wash hover:text-ink'
  const active = tone === 'night' ? 'bg-white text-night' : 'bg-night text-white'

  return (
    <div role="group" aria-label={label} className="flex items-center">
      {(['en', 'vi'] as const).map((code) => (
        <Link
          key={code}
          href={here?.[code] ?? (code === 'en' ? '/' : '/vi')}
          prefetch={false}
          aria-current={locale === code ? 'page' : undefined}
          className={`grid h-11 min-w-11 place-items-center rounded-full text-[13px] font-bold transition-[color,background-color,transform] active:scale-95 ${
            locale === code ? active : idle
          }`}
        >
          {code.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
