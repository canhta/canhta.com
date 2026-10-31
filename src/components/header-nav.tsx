'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Logo } from './logo'
import { LangSwitch } from './lang-switch'

/**
 * The only client code in the header: the open/closed state of the phone menu,
 * the current-page marker and the language switch (which has to know the current
 * path to land on the same page in the other language). Labels arrive as props;
 * a client component must never import the content module.
 */
type NavLink = { href: string; label: string }
type Page = { key: string; en: string; vi: string }

export function HeaderNav({
  locale,
  name,
  cta,
  home,
  phone,
  pages,
  links,
  labels,
}: {
  locale: 'en' | 'vi'
  name: string
  cta: string
  home: string
  phone: { href: string; display: string }
  pages: Page[]
  links: NavLink[]
  labels: { primary: string; language: string; menu: string; closeMenu: string }
}) {
  // Hrefs arrive finished (already in this language), so no routing library runs
  // in the browser. The pathname is the address bar's, `/vi/dich-vu`, or on the
  // server's first render the route's own, `/vi/services`; both name the same page.
  const rest = (usePathname().replace(/^\/(en|vi)(?=\/|$)/, '').replace(/\/$/, '') || '/')
  const here = pages.find((p) => rest === p.key || p.en === rest || p.vi.replace(/^\/vi/, '') === rest)
  const current = (href: string) => here?.[locale] === href
  const [open, setOpen] = useState(false)

  // The phone contact bar steps aside while the menu is open (see globals.css).
  useEffect(() => {
    document.documentElement.toggleAttribute('data-menu-open', open)
    return () => document.documentElement.removeAttribute('data-menu-open')
  }, [open])

  return (
    <>
      <div className="pill">
        <Link
          href={home}
          className="flex min-h-11 min-w-11 shrink-0 items-center gap-2 pr-1 text-[16px] font-bold tracking-tight min-[360px]:pr-2"
          translate="no"
          onClick={() => setOpen(false)}
        >
          <Logo size={30} />
          <span className="max-[359px]:sr-only">{name}</span>
        </Link>

        <nav aria-label={labels.primary} className="ml-auto hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={current(l.href) ? 'page' : undefined}
              className="pill-link"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center md:ml-3">
          <LangSwitch locale={locale} label={labels.language} pages={pages} />
        </div>

        <span className="ml-2 hidden text-[14px] font-bold whitespace-nowrap lg:inline" translate="no">
          {phone.display}
        </span>
        <a href={phone.href} className="pill-cta min-[360px]:ml-1">
          {cta}
        </a>

        <button
          type="button"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full transition-[background-color,transform] hover:bg-wash active:scale-95 md:hidden"
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
                  aria-current={current(l.href) ? 'page' : undefined}
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
