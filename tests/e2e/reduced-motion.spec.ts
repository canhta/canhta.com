import { test, expect } from '@playwright/test'

/**
 * The mirror of the fail-visible spec: a page that only finishes as the result
 * of an animation is a page that never finishes for a visitor who asked for no
 * animation.
 *
 * The global `prefers-reduced-motion` block in globals.css clamps every
 * animation and transition to 0.01ms. That must remove the movement and nothing
 * else — the state change still has to land, and every word still has to be on
 * screen.
 */

/** Playwright 1.62 carries the emulation flags under `contextOptions`. */
test.use({ contextOptions: { reducedMotion: 'reduce' } })

const PATHS = { en: '/', vi: '/vi' } as const

for (const locale of ['en', 'vi'] as const) {
  const path = PATHS[locale]

  test(`[${locale}] the page renders complete under reduced motion`, async ({ page }) => {
    await page.goto(path)
    await page.waitForLoadState('networkidle')

    // The preference really is in force for this context.
    expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(
      true,
    )

    for (const heading of await page.locator('h1, h2, h3').all()) {
      await expect(heading).toBeVisible()
      await expect(heading).not.toHaveCSS('opacity', '0')
    }

    const steps = page.locator('ol li')
    await expect(steps).toHaveCount(4)
    for (let i = 0; i < 4; i++) await expect(steps.nth(i)).toBeVisible()
  })

  test(`[${locale}] the process control still changes state`, async ({ page }) => {
    await page.goto(path)
    const options = page.getByRole('radio')

    // Reduced motion must remove the transition, never the outcome.
    await options.first().check()
    await expect(options.first()).toBeChecked()

    await options.last().check()
    await expect(options.last()).toBeChecked()
    await expect(options.first()).not.toBeChecked()
  })
}
