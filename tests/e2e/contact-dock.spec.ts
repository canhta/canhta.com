import { test, expect } from '@playwright/test'

for (const path of ['/products', '/vi/san-pham']) {
  test(`${path}: product links remain unobstructed by the phone contact dock`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(path)
    const link = page.locator('.app-card .chip').first()
    await link.scrollIntoViewIfNeeded()
    await expect(page.locator('nav.contact-bar')).toBeHidden()
    await expect(link).toBeVisible()
    expect(await link.evaluate((el) => {
      const box = el.getBoundingClientRect()
      return el.contains(document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2))
    })).toBe(true)
  })
}
