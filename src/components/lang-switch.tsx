'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

type Page = { key: string; en: string; vi: string }
const CODES = ['en', 'vi'] as const

/**
 * EN / VI. It has to know the current path to land on the same page in the
 * other language, so it is client code. Used in the header pill (`light`) and in
 * the footer's bottom bar (`night`). The label and the page table arrive as props.
 * The other language is never prefetched: few visitors switch, and prefetching
 * would fetch a copy of every page in it on every visit.
 *
 * The filled disc behind the current language slides to the one you pressed at
 * once, while the new page is still on its way (see `.lang-sw` in fx.css).
 * `aria-current` follows the page's real language, never the optimistic one.
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
  // The choice only counts for the page it was made on; once the language
  // changes, `locale` is the truth again.
  const [chosen, setChosen] = useState<{ from: string; code: string } | null>(null)
  const shown = chosen && chosen.from === locale ? chosen.code : locale
  const idle = tone === 'night' ? 'text-on-dark hover:bg-white/15 hover:text-white' : 'text-muted hover:bg-wash hover:text-ink'
  const active = tone === 'night' ? 'text-night' : 'text-white'

  return (
    <div
      role="group"
      aria-label={label}
      className="lang-sw"
      data-tone={tone}
      style={{ '--i': CODES.indexOf(shown as 'en' | 'vi') } as React.CSSProperties}
    >
      {CODES.map((code) => (
        <Link
          key={code}
          href={here?.[code] ?? (code === 'en' ? '/' : '/vi')}
          prefetch={false}
          aria-current={locale === code ? 'page' : undefined}
          onClick={() => setChosen({ from: locale, code })}
          className={`grid h-11 min-w-11 place-items-center rounded-full text-[13px] font-bold transition-[color,background-color,transform] active:scale-95 ${
            shown === code ? active : idle
          }`}
        >
          {code.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
