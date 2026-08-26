import { test, expect, type Page } from '@playwright/test'

/**
 * FIG. 2's schedule is the one element on the sheet that legitimately outgrows a
 * phone, and the deal it makes is explicit in `selected-work.tsx`: it scrolls
 * inside its own box so the *document* never does. Both halves of that deal are
 * asserted here, because only enforcing the first is how you end up with a page
 * that scrolls sideways.
 */

const SCHEDULE = {
  en: { path: '/', name: 'Schedule', caption: /one row each/i },
  vi: { path: '/vi', name: 'Bảng kê', caption: /một dòng/i },
} as const

const WIDTHS = [390, 768, 1440]

/**
 * `body { overflow-x: hidden }` in globals.css means `documentElement.scrollWidth`
 * can never report an overrun — the clip happens first. So the document-level
 * assertion is kept (it is the contract) and backed by a walk that finds any box
 * escaping the viewport *without* a scroll container to justify it.
 */
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

for (const locale of ['en', 'vi'] as const) {
  const { path, name, caption } = SCHEDULE[locale]

  test(`[${locale}] the schedule is a named, reachable, captioned region`, async ({ page }) => {
    await page.goto(path)

    // Named region, so a screen reader can announce and jump to it.
    const region = page.getByRole('region', { name })
    await expect(region).toHaveCount(1)
    await expect(region).toBeVisible()

    // Focusable, because a scroll container a keyboard cannot reach is a
    // scroll container a keyboard user cannot read.
    await expect(region).toHaveAttribute('tabindex', '0')
    await region.focus()
    await expect(region).toBeFocused()

    const table = region.getByRole('table')
    await expect(table).toHaveCount(1)
    // The accessible name of the table comes from its caption.
    await expect(table).toHaveAccessibleName(caption)
    await expect(table.locator('caption')).toHaveText(caption)

    // Column headers must be scoped, or every cell is orphaned.
    const headers = table.locator('thead th')
    expect(await headers.count()).toBeGreaterThan(0)
    for (const scope of await headers.evaluateAll((els) =>
      els.map((e) => e.getAttribute('scope')),
    )) {
      expect(scope).toBe('col')
    }

    expect(await table.locator('tbody tr').count(), 'schedule has no rows').toBeGreaterThan(0)
  })

  test(`[${locale}] at 390 the table scrolls, the document does not`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(path)

    const region = page.getByRole('region', { name })
    const scroll = await region.evaluate((el) => ({
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
      overflowX: getComputedStyle(el).overflowX,
    }))

    expect(scroll.overflowX, 'schedule region does not scroll horizontally').toBe('auto')
    expect(
      scroll.scrollWidth,
      'the table no longer outgrows a phone — this test is now vacuous, check the min-width',
    ).toBeGreaterThan(scroll.clientWidth)

    // It actually scrolls, rather than merely claiming it can.
    await region.evaluate((el) => el.scrollBy(200, 0))
    expect(await region.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0)

    const overflow = await horizontalOverflow(page)
    expect(overflow.documentOverrun, 'the document scrolls sideways at 390').toBe(0)
  })

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
