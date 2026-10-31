import { test, expect, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { PAGES } from './pages'

/**
 * WCAG 2.0/2.1 A and AA on every page, in both languages, at a desktop and a
 * phone width. A gate, not a record of known defects: no rule is excluded.
 */
/** Arrival animations only: the ticker loops forever and scroll-driven animations only move on scroll, so neither ever finishes. */
const settle = (page: Page) =>
  page.evaluate(
    () =>
      Promise.all(
        document
          .getAnimations()
          .filter((a) => a.timeline === document.timeline && a.effect?.getComputedTiming().iterations !== Infinity)
          .map((a) => a.finished.catch(() => undefined)),
      ) as Promise<unknown>,
  )
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'phone', width: 390, height: 844 },
  // The narrowest phone, and what a 200% zoom of a 640px window leaves.
  { name: 'narrow phone', width: 320, height: 568 },
] as const

for (const { locale, key, path } of PAGES) {
  for (const vp of VIEWPORTS) {
    test(`[${locale}] ${key} has no WCAG A or AA violations on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      await page.goto(path)
      await settle(page)
      const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze()
      const summary = violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length} nodes)`)
      expect(summary).toEqual([])
    })
  }
}

/** The phone menu is closed in every scan above; scan it open, and walk it by keyboard. */
for (const { locale, path } of PAGES.filter((p) => p.key === 'home')) {
  test(`[${locale}] the open phone menu has no WCAG A or AA violations`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(path)
    await settle(page)
    await page.locator('button[aria-controls="menu-panel"]').click()
    await expect(page.locator('#menu-panel')).toBeVisible()
    const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze()
    expect(violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length} nodes)`)).toEqual([])
  })

  test(`[${locale}] the header is reachable by keyboard, shows focus, and opens the menu`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(path)
    const menu = page.locator('button[aria-controls="menu-panel"]')
    const visited: string[] = []
    for (let i = 0; i < 8 && !(await menu.evaluate((el) => el === document.activeElement)); i++) {
      await page.keyboard.press('Tab')
      const focus = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement
        const s = getComputedStyle(el)
        return {
          label: el.textContent?.trim() || el.getAttribute('aria-label') || el.tagName,
          outlined: s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0,
        }
      })
      expect(focus.outlined, `no visible focus on ${focus.label}`).toBe(true)
      visited.push(focus.label)
    }
    await expect(menu).toBeFocused()
    expect(visited.length, 'skip link, brand, two language links, a button, then the menu').toBeGreaterThanOrEqual(5)
    await page.keyboard.press('Enter')
    await expect(menu).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Tab')
    await expect(page.locator('#menu-panel a').first()).toBeFocused()
  })
}
