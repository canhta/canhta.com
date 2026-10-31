import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'

const en: typeof import('../../messages/en.json') = JSON.parse(readFileSync(new URL('../../messages/en.json', import.meta.url), 'utf8'))
const vi: typeof import('../../messages/vi.json') = JSON.parse(readFileSync(new URL('../../messages/vi.json', import.meta.url), 'utf8'))

for (const [locale, copy] of [['en', en], ['vi', vi]] as const) {
  for (const missing of ['missing-page', 'missing/nested/page', 'missing.html']) {
    test(`[${locale}] ${missing} returns a branded, localized 404`, async ({ page }) => {
      const prefix = locale === 'vi' ? '/vi' : ''
      const response = await page.goto(`${prefix}/${missing}`)
      expect(response?.status()).toBe(404)
      await expect(page.locator('html')).toHaveAttribute('lang', locale)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(copy.notFound.heading)
      await expect(page.locator('header').getByRole('link', { name: copy.nav.services, exact: true })).toBeVisible()
      await expect(page.locator('footer nav').getByRole('link', { name: copy.nav.contact, exact: true })).toBeVisible()
      await expect(page.locator('head meta[name="robots"]')).toHaveAttribute('content', /noindex/)
      await page.getByRole('link', { name: copy.notFound.home, exact: true }).click()
      await expect(page).toHaveURL(new RegExp(`${prefix || '/'}$`))
    })
  }
  test(`[${locale}] the branded 404 works without JavaScript`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false })
    const page = await context.newPage()
    const response = await page.goto(`http://localhost:3310${locale === 'vi' ? '/vi' : ''}/missing-page`)
    expect(response?.status()).toBe(404)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(copy.notFound.heading)
    await expect(page.locator('footer a[href^="mailto:"]')).toBeVisible()
    await context.close()
  })
}
