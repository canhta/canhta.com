'use client'

import { Link, usePathname } from '@/i18n/navigation'

/**
 * EN / VI. It has to know the current path to land on the same page in the
 * other language, so it is client code. Used in the header pill (`light`) and in
 * the footer's bottom bar (`night`). The label arrives as a prop.
 */
export function LangSwitch({
  locale,
  label,
  tone = 'light',
}: {
  locale: 'en' | 'vi'
  label: string
  tone?: 'light' | 'night'
}) {
  const pathname = usePathname()
  const idle = tone === 'night' ? 'text-on-dark hover:bg-white/15 hover:text-white' : 'text-muted hover:bg-wash hover:text-ink'
  const active = tone === 'night' ? 'bg-white text-night' : 'bg-night text-white'

  return (
    <div role="group" aria-label={label} className="flex items-center">
      {(['en', 'vi'] as const).map((code) => (
        <Link
          key={code}
          href={pathname}
          locale={code}
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
