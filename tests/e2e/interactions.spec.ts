import { test, expect, type Page } from '@playwright/test'

/**
 * Hover, press and motion. These pin what must stay true however the effects
 * are tuned: the follower exists only for a fine pointer with motion allowed,
 * keyboard focus is always visible, targets stay 44px, nothing overflows or
 * hides, and a page change keeps the skip link, focus and anchors working.
 */

const live = (page: Page) => expect(page.locator('html')).toHaveAttribute('data-fx-cursor', '', { timeout: 15_000 })
const shows = (page: Page) => page.locator('.fx-cursor').evaluate((el) => getComputedStyle(el).display)

for (const [locale, path, open] of [
  ['en', '/', 'Open'],
  ['vi', '/vi', 'Mở'],
] as const) {
  test(`[${locale}] the pointer follower tracks the mouse, says "${open}" over a service and never blocks a click`, async ({ page }) => {
    await page.goto(path)
    await live(page)
    expect(await shows(page)).toBe('block')

    const cell = page.locator('.cell[data-cursor]').first()
    await cell.scrollIntoViewIfNeeded()
    const box = (await cell.boundingBox())!
    // Move twice: the follower is switched on by the first move, labelled by the next.
    await page.mouse.move(box.x + 40, box.y + 40)
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 6 })
    await expect(page.locator('.fx-cursor')).toHaveAttribute('data-state', 'label')
    await expect(page.locator('.fx-label')).toHaveText(open)

    const probe = await page.evaluate(
      ([x, y]) => {
        const hit = document.elementFromPoint(x!, y!)
        const ring = document.querySelector('.fx-cursor')!
        return { overFollower: !!hit && ring.contains(hit), pe: getComputedStyle(ring).pointerEvents }
      },
      [box.x + box.width / 2, box.y + box.height / 2],
    )
    expect(probe.overFollower, 'the follower sits in front of the page for hit-testing').toBe(false)
    expect(probe.pe).toBe('none')

    // The native cursor is never hidden.
    expect(await page.evaluate(() => getComputedStyle(document.body).cursor)).not.toBe('none')
  })
}

test('the pointer follower is absent on a touch device', async ({ browser }) => {
  const context = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } })
  const page = await context.newPage()
  await page.goto('/')
  await page.waitForLoadState('load')
  await page.waitForTimeout(1500)
  expect(await shows(page)).toBe('none')
  await expect(page.locator('html')).not.toHaveAttribute('data-fx-cursor', '')
  await context.close()
})

test('the pointer follower is absent when motion is reduced, and returns when it is allowed again', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.waitForLoadState('load')
  await page.waitForTimeout(1500)
  expect(await shows(page)).toBe('none')
  await expect(page.locator('html')).not.toHaveAttribute('data-fx-cursor', '')
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await live(page)
  expect(await shows(page)).toBe('block')
})

test('the follower steps aside while the keyboard is used, and the focus ring is always drawn', async ({ page }) => {
  await page.goto('/')
  await live(page)
  await page.mouse.move(300, 400, { steps: 3 })
  await page.mouse.move(320, 410)
  await expect(page.locator('.fx-cursor')).toHaveCSS('opacity', '1')
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab')
    // Wait out the 240ms ease-in of the ring: it is drawn from the first frame, but settles.
    const focus = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement
      const s = getComputedStyle(el)
      return { drawn: s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2, label: el.textContent?.trim() || el.tagName }
    })
    expect(focus.drawn, `no focus ring on "${focus.label}"`).toBe(true)
  }
  await expect(page.locator('html')).toHaveAttribute('data-fx-input', 'key')
  await expect(page.locator('.fx-cursor')).toHaveCSS('opacity', '0')
  await page.mouse.move(500, 500)
  await expect(page.locator('html')).toHaveAttribute('data-fx-input', 'pointer')
})

test('a button is pulled a few pixels toward the pointer, keeps its size and answers a press with a ripple', async ({ page }) => {
  await page.goto('/')
  await live(page)
  const cta = page.locator('.hero .btn-accent')
  const before = (await cta.boundingBox())!
  await page.mouse.move(before.x - 30, before.y - 30)
  await page.mouse.move(before.x + before.width - 6, before.y + before.height / 2, { steps: 8 })
  await expect.poll(() => cta.evaluate((el) => parseFloat(getComputedStyle(el).translate) || 0)).toBeGreaterThan(1)
  const pull = await cta.evaluate((el) => parseFloat(getComputedStyle(el).translate))
  expect(pull).toBeLessThanOrEqual(6)
  const box = (await cta.boundingBox())!
  expect(box.height).toBeGreaterThanOrEqual(44)
  expect(box.width).toBeCloseTo(before.width, 0)

  await page.mouse.down()
  await expect(cta.locator('.fx-ripple')).toHaveCount(1)
  await page.mouse.up()
  await expect(cta.locator('.fx-ripple')).toHaveCount(0, { timeout: 3000 })
})

test('hovering does not push the page sideways, at any width', async ({ page }) => {
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await live(page)
    for (const sel of ['.cell[data-tilt]', '.app-card', '.row-link', '.btn-accent']) {
      const el = page.locator(sel).first()
      if ((await el.count()) === 0) continue
      await el.scrollIntoViewIfNeeded()
      const b = (await el.boundingBox())!
      await page.mouse.move(b.x + b.width - 2, b.y + 2, { steps: 4 })
      await page.waitForTimeout(150)
      const wide = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(wide, `${sel} at ${width}px`).toBeLessThanOrEqual(0)
    }
  }
})

for (const [locale, path] of [
  ['en', '/'],
  ['vi', '/vi'],
] as const) {
  test(`[${locale}] links and buttons keep 44px targets, with the effects on`, async ({ page }) => {
    await page.goto(path)
    await live(page)
    const small = await page.evaluate(() => {
      const hits: string[] = []
      for (const el of document.querySelectorAll<HTMLElement>('.pill-link, .pill-cta, .btn-accent, .btn-light, .btn-primary, .chip, .row-link, .foot-row, .hq-more, .lang-sw a')) {
        const r = el.getBoundingClientRect()
        if (r.width === 0 || r.height === 0) continue
        if (r.height < 44 - 0.5 || r.width < 44 - 0.5) hits.push(`${el.className} ${Math.round(r.width)}x${Math.round(r.height)}`)
      }
      return hits
    })
    expect(small).toEqual([])
  })

  test(`[${locale}] headings keep their exact text, are never transparent and settle`, async ({ page }) => {
    await page.goto(path)
    const h1 = page.locator('h1')
    const probe = () =>
      h1.evaluate((el) => {
        const words = [...el.querySelectorAll<HTMLElement>('.sw')]
        return {
          same: words.map((w) => w.textContent).join(' ') === el.textContent,
          count: words.length,
          opaque: words.every((w) => getComputedStyle(w).opacity === '1' && getComputedStyle(w).color !== 'rgba(0, 0, 0, 0)'),
          tf: words.map((w) => getComputedStyle(w).transform),
        }
      })
    // Visible at full contrast from the first frame...
    const first = await probe()
    expect(first.count).toBeGreaterThan(1)
    expect(first.same).toBe(true)
    expect(first.opaque).toBe(true)
    // ...and flat once it has settled.
    await expect.poll(async () => (await probe()).tf.every((t) => t === 'none' || t === 'matrix(1, 0, 0, 1, 0, 0)'), { timeout: 5000 }).toBe(true)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/\S/)
  })
}

test('the language switch moves its disc at once and lands on the same page', async ({ page }) => {
  await page.goto('/services')
  const sw = page.locator('header .lang-sw')
  await expect(sw).toHaveCSS('--i', '0')
  await sw.getByRole('link', { name: 'VI' }).click()
  await expect(page).toHaveURL(/\/vi\/dich-vu$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'vi')
  await expect(page.locator('header .lang-sw')).toHaveCSS('--i', '1')
})

test.describe('a page change', () => {
  test('keeps the skip link, focus management and scroll position at the top', async ({ page }) => {
    await page.goto('/')
    await page.locator('header .pill-link', { hasText: 'Contact' }).click()
    await expect(page).toHaveURL(/\/contact$/)
    await expect(page.locator('h1')).toBeVisible()
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)

    // The skip link of the new page works: it is there, and it moves focus into <main>.
    const skip = page.locator('a[href="#main"]')
    await skip.focus()
    await expect(skip).toBeVisible()
    await page.keyboard.press('Enter')
    await expect(page.locator('main#main')).toBeFocused()
  })

  test('still lands an anchor link below the pill', async ({ page }) => {
    await page.goto('/')
    await page.locator('.cell a.cell-link', { hasText: 'Business systems' }).click()
    await expect(page).toHaveURL(/\/services#systems$/)
    const top = () => page.locator('#systems').evaluate((el) => el.getBoundingClientRect().top)
    await expect.poll(top, { timeout: 5000 }).toBeGreaterThanOrEqual(62)
    await expect.poll(top).toBeLessThan(200)
  })

  const watchTransitions = (page: Page) =>
    page.evaluate(() => {
      const seen: string[] = []
      ;(window as unknown as { seen: string[] }).seen = seen
      const poll = () => {
        for (const a of document.getAnimations()) {
          const p = a.effect && 'pseudoElement' in a.effect ? String(a.effect.pseudoElement ?? '') : ''
          if (p.startsWith('::view-transition') && Number(a.effect?.getComputedTiming().activeDuration ?? 0) > 1) seen.push(p)
        }
        requestAnimationFrame(poll)
      }
      poll()
    })
  const seen = (page: Page) => page.evaluate(() => (window as unknown as { seen: string[] }).seen)

  test('slides the new page in, and holds the pill still', async ({ page }) => {
    await page.goto('/')
    await watchTransitions(page)
    await page.locator('header .pill-link', { hasText: 'Contact' }).click()
    await expect(page).toHaveURL(/\/contact$/)
    await expect.poll(async () => (await seen(page)).some((p) => p.startsWith('::view-transition-new(')), { timeout: 8000 }).toBe(true)
    // The header is a named group that is never animated.
    expect((await seen(page)).filter((p) => p.includes('site-header'))).toEqual([])
  })

  test('does not animate when motion is reduced', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await watchTransitions(page)
    await page.locator('header .pill-link', { hasText: 'Contact' }).click()
    await expect(page).toHaveURL(/\/contact$/)
    await page.waitForTimeout(800)
    expect(await seen(page)).toEqual([])
  })
})
