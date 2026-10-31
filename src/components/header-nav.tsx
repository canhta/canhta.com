'use client'

import { useState } from 'react'
import { Link, usePathname } from '@/i18n/navigation'
import type { AppPathname } from '@/i18n/routing'

/**
 * The only client code in the header: the open/closed state of the phone menu,
 * the current-page marker and the language switch (which has to know the current
 * path to land on the same page in the other language). Labels arrive as props;
 * a client component must never import the content module.
 */
type NavLink = { href: Exclude<AppPathname, '/'>; label: string }

export function HeaderNav({
  locale,
  links,
  labels,
}: {
  locale: 'en' | 'vi'
  links: NavLink[]
  labels: { primary: string; language: string; menu: string; closeMenu: string }
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const lang = (code: 'en' | 'vi') => (
    <Link
      href={pathname}
      locale={code}
      aria-current={locale === code ? 'page' : undefined}
      className={`grid h-11 min-w-10 place-items-center text-[13px] ${
        locale === code ? 'font-bold text-ink' : 'text-muted hover:text-ink'
      }`}
    >
      {code.toUpperCase()}
    </Link>
  )

  return (
    <>
      <nav aria-label={labels.primary} className="ml-auto hidden items-center gap-6 md:flex">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={pathname === l.href ? 'page' : undefined}
            className={`text-[14px] font-medium hover:underline hover:underline-offset-4 ${
              pathname === l.href ? 'underline underline-offset-4' : ''
            }`}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <div role="group" aria-label={labels.language} className="ml-auto flex items-center md:ml-0">
        {lang('en')}
        <span aria-hidden="true" className="text-line-strong">
          /
        </span>
        {lang('vi')}
      </div>

      <button
        type="button"
        className="grid h-11 w-11 shrink-0 place-items-center md:hidden"
        aria-expanded={open}
        aria-controls="menu-panel"
        aria-label={open ? labels.closeMenu : labels.menu}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true" className="grid gap-[5px]">
          <span className={`block h-0.5 w-5 bg-ink transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block h-0.5 w-5 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-ink transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </span>
      </button>

      {open ? (
        <div id="menu-panel" className="menu-panel absolute inset-x-0 top-full md:hidden">
          <ul className="shell py-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={pathname === l.href ? 'page' : undefined}
                  className="block border-b border-line py-4 text-[18px] font-bold"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  )
}
