'use client'

import { useEffect, useState } from 'react'
import { MailTile, PhoneTile, WhatsAppTile, ZaloTile } from './icons'

/**
 * The compact contact bar for phones: email, Zalo and WhatsApp as three big
 * targets pinned to the bottom of the screen. It stays out of the way:
 * it appears only after the visitor has scrolled past the first screen, and it
 * steps aside whenever the page already shows its own contact block (the
 * footer, the contact rows), and while the menu is open (the header sets
 * `data-menu-open` on <html>; see globals.css). Anything on the page that
 * carries `data-no-bar` hides it while it is on screen. Labels and links arrive
 * as props; this file never imports content.
 */
export type BarItem = { key: string; label: string; href: string; external: boolean }

const TILES = { phone: PhoneTile, email: MailTile, zalo: ZaloTile, whatsapp: WhatsAppTile } as const

export function ContactBarView({ label, items }: { label: string; items: BarItem[] }) {
  const [scrolled, setScrolled] = useState(false)
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 240)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const seen = new Set<Element>()
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) seen.add(entry.target)
        else seen.delete(entry.target)
      }
      setBlocked(seen.size > 0)
    })
    document.querySelectorAll('[data-no-bar]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <nav aria-label={label} className="contact-bar" data-show={scrolled && !blocked}>
      {items.map((item) => {
        const Tile = TILES[item.key as keyof typeof TILES]
        return (
          <a
            key={item.key}
            href={item.href}
            data-primary={item.key === 'phone' ? 'true' : undefined}
            {...(item.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
          >
            {Tile ? <Tile size={24} /> : null}
            <span translate={item.key === 'email' || item.key === 'phone' ? undefined : 'no'}>{item.label}</span>
          </a>
        )
      })}
    </nav>
  )
}
