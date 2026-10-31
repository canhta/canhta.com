import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { PAGES } from './pages'

/**
 * WCAG 2.0/2.1 A and AA on every page, in both languages, at a desktop and a
 * phone width. A gate, not a record of known defects: no rule is excluded.
 */
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'phone', width: 390, height: 844 },
] as const

for (const { locale, key, path } of PAGES) {
  for (const vp of VIEWPORTS) {
    test(`[${locale}] ${key} has no WCAG A or AA violations on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      await page.goto(path)
      await page.evaluate(
        () =>
          // Arrival animations only: the ticker loops forever and scroll-driven
          // animations only move on scroll, so neither ever finishes.
          Promise.all(
            document
              .getAnimations()
              .filter(
                (a) => a.timeline === document.timeline && a.effect?.getComputedTiming().iterations !== Infinity,
              )
              .map((a) => a.finished.catch(() => undefined)),
          ) as Promise<unknown>,
      )
      const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze()
      const summary = violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length} nodes)`)
      expect(summary).toEqual([])
    })
  }
}
