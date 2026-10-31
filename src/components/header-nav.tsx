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
  name,
  cta,
  links,
  labels,
}: {
  locale: 'en' | 'vi'
  name: string
  cta: string
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
      className={`grid h-11 min-w-10 place-items-center rounded-full text-[13px] min-[360px]:min-w-11 font-bold transition-colors ${
        locale === code ? 'bg-brand-tint text-brand-dark' : 'text-muted hover:bg-tint hover:text-ink'
      }`}
    >
      {code.toUpperCase()}
    </Link>
  )

  return (
    <>
      <div className="pill">
        <Link
          href="/"
          className="grid min-h-11 shrink-0 place-items-center pr-1 text-[16px] font-extrabold tracking-tight min-[360px]:pr-2 min-[360px]:text-[17px]"
          translate="no"
          onClick={() => setOpen(false)}
        >
          {name}
        </Link>

        <nav aria-label={labels.primary} className="ml-auto hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href ? 'page' : undefined}
              className="pill-link"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div role="group" aria-label={labels.language} className="ml-auto flex items-center md:ml-3">
          {lang('en')}
          {lang('vi')}
        </div>

        <Link href="/contact" className="pill-cta min-[360px]:ml-1">
          {cta}
        </Link>

        <button
          type="button"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full hover:bg-tint md:hidden"
          aria-expanded={open}
          aria-controls="menu-panel"
          aria-label={open ? labels.closeMenu : labels.menu}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className="grid gap-[5px]">
            <span
              className={`block h-0.5 w-5 rounded bg-ink transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`}
            />
            <span className={`block h-0.5 w-5 rounded bg-ink transition-transform ${open ? 'scale-x-0' : ''}`} />
            <span
              className={`block h-0.5 w-5 rounded bg-ink transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`}
            />
          </span>
        </button>
      </div>

      {open ? (
        <div id="menu-panel" className="menu-panel md:hidden">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={pathname === l.href ? 'page' : undefined}
                  className="menu-link"
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
