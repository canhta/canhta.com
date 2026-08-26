import { test, expect } from '@playwright/test'

/**
 * `MotionConfig reducedMotion="user"` in `motion-provider.tsx` makes the OS
 * setting the default for everything, so components opt *into* motion. The
 * failure mode that guards against is the mirror of the fail-visible one: a
 * drawing that only ever finishes as the result of an animation is a drawing
 * that never finishes for a visitor who asked for no animation.
 */

/** Playwright 1.62 carries the emulation flags under `contextOptions`. */
test.use({ contextOptions: { reducedMotion: 'reduce' } })

const FIG1 = {
  en: { path: '/', label: /^From problem to running\./ },
  vi: { path: '/vi', label: /^Từ vấn đề đến chạy thật\./ },
} as const

for (const locale of ['en', 'vi'] as const) {
  const { path, label } = FIG1[locale]

  test(`[${locale}] FIG. 1 renders complete under reduced motion`, async ({ page }) => {
    await page.goto(path)
    await page.waitForLoadState('networkidle')

    // The preference really is in force for this context.
    expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(
      true,
    )

    const svg = page.getByRole('img', { name: label })
    await expect(svg).toBeVisible()

    const ink = await svg.evaluate((el) =>
      Array.from(el.querySelectorAll('path, rect, line')).map((n) => ({
        tag: n.tagName,
        dashOffset: getComputedStyle(n).strokeDashoffset,
      })),
    )
    expect(ink.length, 'FIG. 1 drew nothing').toBeGreaterThan(8)
    for (const stroke of ink) {
      expect(
        parseFloat(stroke.dashOffset) || 0,
        `${stroke.tag} left undrawn under reduced motion`,
      ).toBe(0)
    }

    // Headings must be present, not waiting on a wipe that will never play.
    for (const heading of await page.locator('h1, h2').all()) {
      await expect(heading).toBeVisible()
      await expect(heading).not.toHaveCSS('opacity', '0')
    }
  })

  test(`[${locale}] the threshold control still works by keyboard`, async ({ page }) => {
    await page.goto(path)
    const slider = page.getByRole('slider')
    await slider.focus()
    await expect(slider).toBeFocused()

    await page.keyboard.press('Home')
    await expect(slider).toHaveAttribute('aria-valuenow', '0')

    await page.keyboard.press('ArrowRight')
    await expect(slider).toHaveAttribute('aria-valuenow', '1')

    await page.keyboard.press('End')
    await expect(slider).toHaveAttribute('aria-valuenow', '3')

    // The state change still lands even with every transition at zero duration:
    // reduced motion must remove the animation, never the outcome.
    const svg = page.getByRole('img', { name: label })
    const calloutOpacity = () =>
      svg.evaluate((el) => {
        const heading = Array.from(el.querySelectorAll('text')).find((node) =>
          /^(WHAT IT TURNS INTO|NÓ THÀNH CÁI GÌ)$/.test(node.textContent?.trim() ?? ''),
        )
        return heading?.parentElement ? getComputedStyle(heading.parentElement).opacity : null
      })
    await expect
      .poll(calloutOpacity, { message: 'the callout list did not respond under reduced motion' })
      .toBe('0')
  })
}
