/**
 * Hover and press effects that CSS cannot do alone, driven from a handful of
 * listeners on `document` (event delegation), so the server-rendered components
 * stay server components and nothing here ships per element.
 *
 *   - ripple on press (any pointer, so a tap answers too)
 *   - fine pointers only: magnetic buttons, card tilt, the sliding highlight in
 *     the header, a replay of a service picture when it is entered
 *
 * Everything is off while the visitor asks for reduced motion (and switches back
 * on or off if the setting changes while the page is open). Nothing here writes
 * layout: only custom properties that CSS turns into `translate` / `transform`.
 * Each effect is switched off for good by `stop`.
 */

const PRESS = '.btn-primary,.btn-accent,.btn-light,.pill-cta,.chip'

const clamp = (n: number, m: number) => Math.max(-m, Math.min(m, n))
type Stop = () => void

export function startFx(): Stop {
  const fine = matchMedia('(hover: hover) and (pointer: fine)')
  const calm = matchMedia('(prefers-reduced-motion: reduce)')
  let stopLive: Stop | null = null
  const sync = () => {
    stopLive?.()
    stopLive = calm.matches ? null : live(fine.matches)
  }
  sync()
  fine.addEventListener('change', sync)
  calm.addEventListener('change', sync)
  return () => {
    fine.removeEventListener('change', sync)
    calm.removeEventListener('change', sync)
    stopLive?.()
  }
}

function live(withPointer: boolean): Stop {
  const html = document.documentElement
  const off: Stop[] = []
  const on = <T extends Event>(target: EventTarget, type: string, fn: (e: T) => void) => {
    target.addEventListener(type, fn as EventListener)
    off.push(() => target.removeEventListener(type, fn as EventListener))
  }

  // ---- Ripple: a quick pulse from the press point, clipped to the control.
  on<PointerEvent>(document, 'pointerdown', (e) => {
    if (e.button !== 0) return
    const el = (e.target as Element | null)?.closest<HTMLElement>(PRESS)
    if (!el) return
    const r = el.getBoundingClientRect()
    const s = document.createElement('span')
    s.className = 'fx-ripple'
    s.setAttribute('aria-hidden', 'true')
    s.style.cssText = `--rx:${e.clientX - r.left}px;--ry:${e.clientY - r.top}px;--rs:${Math.max(r.width, r.height) * 2.6}px`
    s.addEventListener('animationend', () => s.remove(), { once: true })
    el.append(s)
  })

  if (!withPointer) return () => off.forEach((f) => f())

  let x = 0
  let y = 0

  let magnet: HTMLElement | null = null
  let card: HTMLElement | null = null
  let glide: HTMLElement | null = null
  let replayed = 0

  const releaseMagnet = () => {
    if (!magnet) return
    magnet.style.removeProperty('--mx')
    magnet.style.removeProperty('--my')
    delete magnet.dataset.near
    magnet = null
  }
  const releaseCard = () => {
    if (!card) return
    card.style.removeProperty('--tx')
    card.style.removeProperty('--ty')
    card = null
  }
  const releaseGlide = () => {
    if (glide) glide.dataset.glide = 'off'
    glide = null
  }

  /** Start a service picture's own animation again, at most once every few seconds. */
  const replay = (el: HTMLElement) => {
    const now = performance.now()
    const picture = el.querySelector<HTMLElement>('.mv')
    if (!picture || now - replayed < 4000) return
    const running = picture.getAnimations({ subtree: true }).filter((a) => a.timeline === document.timeline)
    if (running.length === 0) return
    replayed = now
    running.forEach((a) => {
      a.cancel()
      a.play()
    })
  }

  on<PointerEvent>(document, 'pointermove', (e) => {
    if (e.pointerType === 'touch') return
    x = e.clientX
    y = e.clientY
    const el = e.target as Element | null
    if (!el || !el.closest) return

    // Magnetic pull: a few pixels toward the pointer, released with a spring.
    const m = el.closest<HTMLElement>(PRESS)
    if (m !== magnet) {
      releaseMagnet()
      magnet = m
      if (m) m.dataset.near = ''
    }
    if (m) {
      const r = m.getBoundingClientRect()
      m.style.setProperty('--mx', `${clamp(((x - (r.left + r.width / 2)) / (r.width / 2)) * 5, 5).toFixed(2)}px`)
      m.style.setProperty('--my', `${clamp(((y - (r.top + r.height / 2)) / (r.height / 2)) * 3.5, 3.5).toFixed(2)}px`)
    }

    // Card lean: where the pointer is inside the card, as -0.5 to 0.5.
    const c = el.closest<HTMLElement>('[data-tilt]')
    if (c !== card) {
      releaseCard()
      card = c
      if (c) replay(c)
    }
    if (c) {
      const r = c.getBoundingClientRect()
      c.style.setProperty('--tx', ((x - r.left) / r.width - 0.5).toFixed(3))
      c.style.setProperty('--ty', ((y - r.top) / r.height - 0.5).toFixed(3))
    }

    // Sliding highlight behind the header links.
    const nav = el.closest<HTMLElement>('[data-glide]')
    if (nav !== glide) releaseGlide()
    if (nav) {
      glide = nav
      const link = el.closest<HTMLElement>('.pill-link')
      if (link) {
        nav.style.setProperty('--gx', `${link.offsetLeft}px`)
        nav.style.setProperty('--gw', `${link.offsetWidth}px`)
        nav.dataset.glide = 'on'
      } else nav.dataset.glide = 'off'
    }
  })

  // The effects let go when the pointer leaves the window.
  on(html, 'mouseleave', () => {
    releaseMagnet()
    releaseCard()
    releaseGlide()
  })

  return () => {
    off.forEach((f) => f())
    releaseMagnet()
    releaseCard()
    releaseGlide()
  }
}
