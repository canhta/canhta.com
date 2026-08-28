import { test, expect, type Page } from '@playwright/test'

/**
 * Nothing on this page may push the document sideways.
 *
 * WHAT CHANGED. This used to be `schedule-table.spec.ts`, guarding a six-column
 * register that legitimately outgrew a phone and therefore scrolled inside its
 * own box. That table is gone — three projects are three entries, not rows — and
 * with it the only element on the site wide enough to need an escape hatch.
 *
 * `body { overflow-x: hidden }` went with it too, and that matters here: while
 * it was set, `documentElement.scrollWidth` could never report an overrun
 * because the clip happened first, so the document-level assertion below was
 * unfalsifiable and the element walk was doing all the work. Both are real
 * signals now.
 */

const WIDTHS = [320, 390, 768, 1024, 1440]

async function horizontalOverflow(page: Page) {
  return page.evaluate(() => {
    const de = document.documentElement
    const vw = de.clientWidth
    const inScroller = (el: Element) => {
      let p = el.parentElement
      while (p && p !== document.body && p !== de) {
        const ox = getComputedStyle(p).overflowX
        if (ox === 'auto' || ox === 'scroll' || ox === 'hidden') return true
        p = p.parentElement
      }
      return false
    }
    return {
      documentOverrun: de.scrollWidth - de.clientWidth,
      bodyOverrun: document.body.scrollWidth - document.body.clientWidth,
      escapees: Array.from(document.querySelectorAll('body *'))
        .filter((el) => {
          const r = el.getBoundingClientRect()
          if (r.width === 0 && r.height === 0) return false
          return (r.right > vw + 1 || r.left < -1) && !inScroller(el)
        })
        .slice(0, 8)
        .map((el) => {
          const r = el.getBoundingClientRect()
          const cls = (el.className || '').toString().slice(0, 60)
          return `${el.tagName}.${cls} [${Math.round(r.left)} … ${Math.round(r.right)}]`
        }),
    }
  })
}

for (const [locale, path] of [
  ['en', '/'],
  // Vietnamese runs materially longer than English in every label on the page,
  // so it is the locale that actually finds a fixed width someone forgot about.
  ['vi', '/vi'],
] as const) {
  for (const width of WIDTHS) {
    test(`[${locale}] nothing overflows horizontally at ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(path)
      await page.waitForLoadState('networkidle')
      await expect(page.locator('h1')).toBeVisible()

      const overflow = await horizontalOverflow(page)
      expect(overflow.documentOverrun, `documentElement overruns at ${width}px`).toBe(0)
      expect(overflow.bodyOverrun, `body overruns at ${width}px`).toBeLessThanOrEqual(0)
      expect(
        overflow.escapees,
        `elements sit outside the ${width}px viewport with no scroll container:\n${overflow.escapees.join('\n')}`,
      ).toEqual([])
    })
  }
}

/**
 * The page no longer needs a horizontal scroll container anywhere. If one
 * appears, either a table came back or something is being clipped rather than
 * laid out — both worth a diff.
 */
test('[en] no element needs a horizontal scroller to fit a phone', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.waitForLoadState('networkidle')

  const scrollers = await page.evaluate(() =>
    Array.from(document.querySelectorAll('body *'))
      .filter((el) => {
        const ox = getComputedStyle(el).overflowX
        return (ox === 'auto' || ox === 'scroll') && el.scrollWidth > el.clientWidth
      })
      .map((el) => `${el.tagName}.${(el.className || '').toString().slice(0, 60)}`),
  )
  expect(scrollers).toEqual([])
})
