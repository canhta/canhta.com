import { test, expect } from '@playwright/test'

/**
 * The skip link is the first thing a keyboard visitor meets, and it is
 * translated, so it is also the earliest place the two locales can diverge
 * without anyone noticing.
 */

const SKIP = {
  en: { path: '/', label: 'Skip to content' },
  vi: { path: '/vi', label: 'Tới nội dung chính' },
} as const

for (const locale of ['en', 'vi'] as const) {
  const { path, label } = SKIP[locale]

  test(`[${locale}] the first Tab reveals the skip link`, async ({ page }) => {
    await page.goto(path)
    const link = page.getByRole('link', { name: label })

    /**
     * It is in the DOM from the start — `translateY(-200%)` parks it off the
     * sheet — so "hidden" here means positioned out of view, not `display:none`.
     * Playwright reports an off-screen but rendered element as visible, so the
     * meaningful assertion is where its box actually is.
     */
    const top = () => link.evaluate((el) => el.getBoundingClientRect().top)
    expect(await top(), 'skip link is on screen before it is focused').toBeLessThan(0)

    await page.keyboard.press('Tab')
    await expect(link).toBeFocused()
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', '#sheet')

    /**
     * `:focus-visible` swaps `translateY(-200%)` for `translateY(0)` over 150ms,
     * so the box is still mid-flight the instant focus lands. Polling waits on
     * the settled position rather than on a duration this test would have to
     * keep in sync with the stylesheet.
     */
    await expect
      .poll(async () => (await link.boundingBox())?.y ?? -1, {
        message: 'the focused skip link never travelled onto the sheet',
      })
      .toBeGreaterThanOrEqual(0)

    const box = await link.boundingBox()
    expect(box, 'focused skip link has no box').not.toBeNull()
    expect(box!.height, 'focused skip link has no height').toBeGreaterThan(0)
    expect(box!.width, 'focused skip link has no width').toBeGreaterThan(0)
    await expect(link).toHaveText(label)
  })

  test(`[${locale}] activating the skip link puts the keyboard inside <main>`, async ({ page }) => {
    await page.goto(path)
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: label })).toBeFocused()

    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(new RegExp(`${path === '/' ? '' : path}#sheet$`))

    const main = page.locator('main#sheet')
    await expect(main).toBeVisible()

    /**
     * `<main id="sheet">` carries no `tabindex="-1"`, so activating the link does
     * not move `document.activeElement` — it only moves the sequential focus
     * navigation starting point. That is enough in Chromium (the next Tab lands
     * inside `<main>`, asserted below) but it is the browser doing the work, not
     * the page. See the handover notes: adding `tabIndex={-1}` to `<main>` would
     * make this deterministic everywhere. Asserted here as the behaviour that
     * actually matters to a keyboard user.
     */
    await page.keyboard.press('Tab')
    const landed = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null
      return {
        inMain: !!el?.closest('main#sheet'),
        tag: el?.tagName ?? null,
        text: el?.textContent?.trim().slice(0, 40) ?? null,
      }
    })
    expect(
      landed.inMain,
      `after the skip link, Tab landed on ${landed.tag} "${landed.text}" outside <main>`,
    ).toBe(true)

    // And it landed on something real, not on a stray focusable wrapper.
    await expect(page.locator(':focus')).toBeVisible()
  })
}

test('the skip link is the very first thing in the tab order', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  const first = await page.evaluate(() => document.activeElement?.className ?? '')
  expect(first, 'something is focusable ahead of the skip link').toContain('skip-link')
})
