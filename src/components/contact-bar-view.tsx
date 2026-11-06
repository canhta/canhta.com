'use client'

import { useEffect, useState } from 'react'
import { MailTile, PhoneTile, WhatsAppTile, ZaloTile } from './icons'

/**
 * The compact contact bar for phones: call, email, Zalo and WhatsApp pinned to
 * the bottom of the screen. It takes turns with the header: it shows while the
 * visitor scrolls down past the first screen, the header while they scroll up. It
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

  const [down, setDown] = useState(false)

  // One bar at a time on a phone (Apple HIG: bars give way to content while
  // reading). Scrolling down hides the header and shows this bar in thumb
  // reach; scrolling up brings the header back and hides this bar. The
  // direction goes on <html> so the header's CSS can follow it.
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 240)
      if (Math.abs(y - last) < 8) return
      const goingDown = y > last && y > 240
      last = y
      setDown(goingDown)
      document.documentElement.dataset.scroll = goingDown ? 'down' : 'up'
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      delete document.documentElement.dataset.scroll
    }
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
    <nav aria-label={label} className="contact-bar" data-show={scrolled && down && !blocked}>
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
