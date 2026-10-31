/**
 * Hover and press effects that CSS cannot do alone, driven from a handful of
 * listeners on `document` (event delegation), so the server-rendered components
 * stay server components and nothing here ships per element.
 *
 *   - ripple on press (any pointer, so a tap answers too)
 *   - fine pointers only: the follower, magnetic buttons, card tilt, the sliding
 *     highlight in the header, a replay of a service picture when it is entered
 *
 * Everything is off while the visitor asks for reduced motion (and switches back
 * on or off if the setting changes while the page is open). Nothing here writes
 * layout: only custom properties that CSS turns into `translate` / `transform`.
 * The follower's frame loop runs only while the ring is still catching up.
 * Each effect is switched off for good by `stop`.
 */

const PRESS = '.btn-primary,.btn-accent,.btn-light,.pill-cta,.chip'
const HOT = 'a[href],button,summary,[role="button"],[data-cursor]'
const TEXT = 'input,textarea,select,[contenteditable=""],[contenteditable="true"]'

const clamp = (n: number, m: number) => Math.max(-m, Math.min(m, n))
type Stop = () => void

export function startFx(cursor: HTMLElement): Stop {
  const fine = matchMedia('(hover: hover) and (pointer: fine)')
  const calm = matchMedia('(prefers-reduced-motion: reduce)')
  let stopLive: Stop | null = null
  const sync = () => {
    stopLive?.()
    stopLive = calm.matches ? null : live(cursor, fine.matches)
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

function live(cursor: HTMLElement, withPointer: boolean): Stop {
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

  const dot = cursor.querySelector<HTMLElement>('.fx-dot')!
  const ring = cursor.querySelector<HTMLElement>('.fx-ring')!
  const label = cursor.querySelector<HTMLElement>('.fx-label')!
  html.setAttribute('data-fx-cursor', '')

  let x = 0
  let y = 0
  let rx = 0
  let ry = 0
  let last = 0
  let raf = 0
  let shown = false

  let magnet: HTMLElement | null = null
  let card: HTMLElement | null = null
  let glide: HTMLElement | null = null
  let replayed = 0

  const tick = (now: number) => {
    raf = 0
    // Frame-rate independent catch-up, about 70ms to close most of the gap.
    const k = 1 - Math.exp(-(now - last) / 70)
    last = now
    rx += (x - rx) * k
    ry += (y - ry) * k
    const close = Math.abs(x - rx) + Math.abs(y - ry) < 0.2
    if (close) {
      rx = x
      ry = y
    }
    // `translate`, not `transform`: the dot also has a CSS `scale`, which is applied after a
    // translate in the same property chain and would pull a transform toward the origin.
    dot.style.translate = `${x}px ${y}px`
    ring.style.transform = `translate3d(${rx}px,${ry}px,0)`
    if (!close) raf = requestAnimationFrame(tick)
  }
  const kick = () => {
    if (raf) return
    last = performance.now()
    raf = requestAnimationFrame(tick)
  }

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
    html.dataset.fxInput = 'pointer'
    if (!shown) {
      shown = true
      rx = x
      ry = y
      cursor.dataset.on = ''
    }
    const el = e.target as Element | null
    if (!el || !el.closest) return

    // What the follower says about what is under it.
    const hot = el.closest<HTMLElement>(HOT)
    const key = hot?.closest<HTMLElement>('[data-cursor]')?.dataset.cursor
    const state = el.closest(TEXT) ? 'off' : key ? 'label' : hot ? 'link' : 'idle'
    if (cursor.dataset.state !== state) cursor.dataset.state = state
    if (key && label.dataset.key !== key) {
      label.dataset.key = key
      label.textContent = cursor.dataset[key] ?? ''
    }

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

    kick()
  })

  on<PointerEvent>(document, 'pointerdown', (e) => {
    if (e.pointerType !== 'touch') cursor.dataset.down = ''
  })
  on<PointerEvent>(document, 'pointerup', () => {
    delete cursor.dataset.down
  })
  // Keyboard navigation hides the follower until the mouse moves again.
  on<KeyboardEvent>(document, 'keydown', (e) => {
    if (e.key === 'Tab' || e.key.startsWith('Arrow')) html.dataset.fxInput = 'key'
  })
  // It also leaves with the pointer.
  on(html, 'mouseleave', () => {
    shown = false
    delete cursor.dataset.on
    releaseMagnet()
    releaseCard()
    releaseGlide()
  })

  return () => {
    off.forEach((f) => f())
    if (raf) cancelAnimationFrame(raf)
    releaseMagnet()
    releaseCard()
    releaseGlide()
    html.removeAttribute('data-fx-cursor')
    delete html.dataset.fxInput
    delete cursor.dataset.on
    delete cursor.dataset.down
    delete cursor.dataset.state
  }
}
