import { test, expect, type Page } from '@playwright/test'
import { canonicalOf, PAGES, SITE } from './pages'

/**
 * What every page must do, in both languages: load, state one h1, carry its own
 * metadata and reciprocal hreflang, fit every phone width, hide nothing, link to
 * its counterpart, and ship valid structured data.
 */

const WIDTHS = [320, 390, 768, 1280]

const head = (page: Page, selector: string, attr = 'content') =>
  page.locator(`head ${selector}`).getAttribute(attr)

for (const { locale, key, path, other } of PAGES) {
  test.describe(`[${locale}] ${key} (${path})`, () => {
    test('loads with one h1 and the right language', async ({ page }) => {
      const response = await page.goto(path)
      expect(response?.status()).toBe(200)
      await expect(page.locator('html')).toHaveAttribute('lang', locale)
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page.locator('h1')).toBeVisible()
    })

    test('has its own title, description, canonical and hreflang', async ({ page }) => {
      await page.goto(path)
      expect((await page.title()).length).toBeGreaterThan(10)
      expect(((await head(page, 'meta[name="description"]')) ?? '').length).toBeGreaterThan(40)
      expect(await head(page, 'link[rel="canonical"]', 'href')).toBe(canonicalOf(path))

      const alternates = await page
        .locator('head link[rel="alternate"][hreflang]')
        .evaluateAll((els) =>
          Object.fromEntries(els.map((el) => [el.getAttribute('hreflang'), el.getAttribute('href')])),
        )
      expect(alternates['en']).toBeTruthy()
      expect(alternates['vi']).toBeTruthy()
      expect(alternates['x-default']).toBeTruthy()
      expect(alternates[locale]).toBe(canonicalOf(path))
      expect(alternates[locale === 'en' ? 'vi' : 'en']).toBe(canonicalOf(other))
    })

    for (const width of WIDTHS) {
      test(`does not overflow sideways at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 })
        await page.goto(path)
        const overrun = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        )
        expect(overrun, `document is ${overrun}px wider than the viewport`).toBeLessThanOrEqual(0)
      })
    }

    test('hides nothing: no content rests invisible', async ({ page }) => {
      await page.goto(path)
      await page.evaluate(
        () =>
          // Wait for the arrival animations only. The ticker loops forever and
          // scroll-driven animations only move when the page scrolls, so neither
          // ever "finishes"; waiting on them would hang.
          Promise.all(
            document
              .getAnimations()
              .filter(
                (a) => a.timeline === document.timeline && a.effect?.getComputedTiming().iterations !== Infinity,
              )
              .map((a) => a.finished.catch(() => undefined)),
          ) as Promise<unknown>,
      )
      const hidden = await page.evaluate(() =>
        Array.from(document.querySelectorAll('main *'))
          .filter((el) => {
            const s = getComputedStyle(el)
            if (s.display === 'none' || s.visibility === 'hidden') return false
            if (el.closest('[aria-hidden="true"]')) return false
            if (el.className.toString().includes('sr-only')) return false
            return s.opacity === '0'
          })
          .slice(0, 8)
          .map((el) => `${el.tagName}.${el.className.toString().slice(0, 50)}`),
      )
      expect(hidden).toEqual([])
    })

    test('every image has an alt attribute', async ({ page }) => {
      await page.goto(path)
      const missing = await page.locator('img:not([alt])').count()
      expect(missing).toBe(0)
    })

    test('switches to the same page in the other language', async ({ page }) => {
      await page.goto(path)
      const target = locale === 'en' ? 'VI' : 'EN'
      await page.getByRole('group').getByRole('link', { name: target, exact: true }).click()
      await expect(page).toHaveURL(new RegExp(`${other === '/' ? '/$' : other}$`))
      await expect(page.locator('html')).toHaveAttribute('lang', locale === 'en' ? 'vi' : 'en')
    })

    test('carries valid structured data for this page', async ({ page }) => {
      await page.goto(path)
      const scripts = page.locator('script[type="application/ld+json"]')
      await expect(scripts).toHaveCount(1)
      const graph = JSON.parse((await scripts.first().textContent()) ?? '') as {
        '@context': string
        '@graph': Array<Record<string, unknown>>
      }
      expect(graph['@context']).toBe('https://schema.org')
      const types = graph['@graph'].map((n) => n['@type'])
      for (const required of ['Person', 'ProfessionalService', 'WebSite', 'WebPage']) {
        expect(types).toContain(required)
      }
      if (key === 'services') expect(types).toContain('FAQPage')
      if (key === 'products') expect(types).toContain('ItemList')
      if (key !== 'home') expect(types).toContain('BreadcrumbList')

      const webPage = graph['@graph'].find((n) => n['@type'] === 'WebPage')!
      expect(webPage['inLanguage']).toBe(locale)
      expect(webPage['url']).toBe(canonicalOf(path))
      expect(JSON.stringify(graph)).not.toMatch(/aggregateRating|"review"|priceRange/)
    })
  })
}

test('the sitemap lists every page in both languages with alternates', async ({ request }) => {
  const xml = await (await request.get('/sitemap.xml')).text()
  for (const { path } of PAGES) expect(xml).toContain(`<loc>${canonicalOf(path)}</loc>`)
  expect(xml).toContain('hreflang="vi"')
  expect(xml.includes(SITE)).toBe(true)
})

test('the phone menu opens, lists the pages and closes on choosing one', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const button = page.getByRole('button', { name: 'Menu' })
  await button.click()
  await expect(button).toHaveAttribute('aria-expanded', 'true')
  await page.locator('#menu-panel').getByRole('link', { name: 'Services' }).click()
  await expect(page).toHaveURL(/\/services$/)
  await expect(page.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false')
})
