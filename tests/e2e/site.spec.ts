import { test, expect, type Page } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { canonicalOf, PAGES, SITE } from './pages'

/**
 * What every page must do, in both languages: load, state one h1, carry its own
 * metadata and reciprocal hreflang, fit every phone width, hide nothing, link to
 * its counterpart, and ship valid structured data.
 */

const catalog = (locale: string) =>
  JSON.parse(readFileSync(new URL(`../../messages/${locale}.json`, import.meta.url), 'utf8')) as {
    contact: { mailSubject: string }
  }

const WIDTHS = [320, 390, 768, 1280]

const head = (page: Page, selector: string, attr = 'content') =>
  page.locator(`head ${selector}`).getAttribute(attr)

/**
 * Wait for finite arrival animations only. The ticker loops forever and
 * scroll-driven animations only move when the page scrolls, so neither ever
 * "finishes"; waiting on them would hang.
 */
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

for (const locale of ['en', 'vi'] as const) {
  test(`[${locale}] every page has a different title and description`, async ({ page }) => {
    const titles: string[] = []
    const descriptions: string[] = []
    for (const { path } of PAGES.filter((p) => p.locale === locale)) {
      await page.goto(path)
      titles.push(await page.title())
      descriptions.push((await head(page, 'meta[name="description"]')) ?? '')
    }
    expect(new Set(titles).size, `titles: ${titles.join(' | ')}`).toBe(titles.length)
    expect(new Set(descriptions).size, 'descriptions repeat').toBe(descriptions.length)
  })
}

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

    test('hides nothing: no text rests invisible, no animation fades anything', async ({ page }) => {
      // First paint, before any arrival animation has finished: an animation
      // that fades (opacity) would show up here as a keyframe, and a headline
      // that starts transparent would fail the opacity check below.
      await page.goto(path, { waitUntil: 'domcontentloaded' })
      const fading = await page.evaluate(() =>
        document
          .getAnimations()
          .flatMap((a) => (a.effect as KeyframeEffect | null)?.getKeyframes() ?? [])
          .filter((k) => 'opacity' in k || 'visibility' in k)
          .map((k) => JSON.stringify(k)),
      )
      expect(fading, 'motion must be position or transform only').toEqual([])

      await settle(page)
      const hidden = await page.evaluate(() => {
        const out: string[] = []
        const exempt = '[aria-hidden="true"], .sr-only, [hidden], .ticker-copy'
        for (const el of document.querySelectorAll('main h1, main h2, main h3, main p, main li, main a, main button')) {
          if (el.closest(exempt)) continue
          if (!(el.textContent ?? '').trim()) continue
          // Walk up: an element is invisible if any ancestor removes or fades it.
          for (let node: Element | null = el; node; node = node.parentElement) {
            const s = getComputedStyle(node)
            if (s.display === 'none' || s.visibility === 'hidden' || s.opacity === '0') {
              out.push(`${el.tagName} "${(el.textContent ?? '').trim().slice(0, 30)}" hidden by ${node.tagName}.${String(node.className).slice(0, 40)}`)
              break
            }
          }
        }
        return out.slice(0, 8)
      })
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
      await page.getByRole('banner').getByRole('group').getByRole('link', { name: target, exact: true }).click()
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
      const nodes = graph['@graph']
      const types = nodes.map((n) => n['@type'])
      for (const required of ['ProfessionalService', 'WebSite', 'WebPage']) {
        expect(types).toContain(required)
      }
      // We speak as "we": no person, photo, job title or founder in the markup.
      expect(types).not.toContain('Person')
      expect(JSON.stringify(graph)).not.toMatch(/"(image|jobTitle|founder)"|avatar/)
      if (key === 'services') expect(types).toContain('FAQPage')
      if (key === 'products') expect(types).toContain('ItemList')
      if (key !== 'home') expect(types).toContain('BreadcrumbList')

      // Every reference points at a node that exists, and the entities carry content.
      const ids = new Set(nodes.map((n) => n['@id']))
      for (const [, ref] of JSON.stringify(graph).matchAll(/"@id":"([^"]+#[^"]+)"/g)) expect(ids.has(ref)).toBe(true)
      const service = nodes.find((n) => n['@type'] === 'ProfessionalService') as {
        name: string
        hasOfferCatalog: { itemListElement: unknown[] }
      }
      expect(service.name).toBeTruthy()
      expect(service.hasOfferCatalog.itemListElement.length).toBeGreaterThan(0)
      const siteNode = nodes.find((n) => n['@type'] === 'WebSite') as { name: string; inLanguage: string }
      expect(siteNode.name).toBe(service.name)
      expect(siteNode.inLanguage).toBe(locale)
      const list = (type: string, field: string) =>
        ((nodes.find((n) => n['@type'] === type) as Record<string, unknown[]> | undefined)?.[field] ?? []).length
      if (key === 'services') expect(list('FAQPage', 'mainEntity')).toBeGreaterThan(0)
      if (key === 'products') expect(list('ItemList', 'itemListElement')).toBeGreaterThan(0)

      const webPage = nodes.find((n) => n['@type'] === 'WebPage')!
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

for (const { locale, path } of PAGES.filter((p) => p.key === 'home')) {
  test.describe(`[${locale}] the phone contact bar`, () => {
    test.use({ viewport: { width: 390, height: 844 } })

    test('shows email, Zalo and WhatsApp as 44px targets after the first screen, with a localized email draft', async ({
      page,
    }) => {
      await page.goto(path)
      const bar = page.locator('nav.contact-bar')
      await expect(bar).toBeHidden()
      await page.evaluate(() => window.scrollTo(0, 1400))
      await expect(bar).toBeVisible()
      const links = bar.getByRole('link')
      await expect(links).toHaveCount(3)
      for (const box of await links.evaluateAll((els) => els.map((el) => el.getBoundingClientRect().toJSON()))) {
        expect(box.width).toBeGreaterThanOrEqual(44)
        expect(box.height).toBeGreaterThanOrEqual(44)
      }
      const mail = new URL((await bar.locator('a[href^="mailto:"]').getAttribute('href')) ?? '')
      // Read from the catalog so the test checks the language, not frozen prose.
      expect(mail.searchParams.get('subject')).toBe(catalog(locale).contact.mailSubject)
      await expect(bar.locator('a[href*="zalo.me"]')).toHaveCount(1)
      await expect(bar.locator('a[href*="wa.me"]')).toHaveCount(1)
    })

    test('steps aside while the menu is open and while the footer is on screen', async ({ page }) => {
      await page.goto(path)
      const bar = page.locator('nav.contact-bar')
      await page.evaluate(() => window.scrollTo(0, 1400))
      await expect(bar).toBeVisible()
      await page.locator('button[aria-controls="menu-panel"]').click()
      await expect(bar).toBeHidden()
      await page.locator('button[aria-controls="menu-panel"]').click()
      await expect(bar).toBeVisible()
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await expect(bar).toBeHidden()
    })
  })
}

test('the contact bar is for phones only', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => window.scrollTo(0, 1400))
  await expect(page.locator('nav.contact-bar')).toBeHidden()
})

for (const width of [320, 390, 1440]) {
  for (const { locale, path } of PAGES.filter((p) => p.key === 'home')) {
    test(`[${locale}] every header control is at least 44px at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 })
      await page.goto(path)
      const small = await page.evaluate(() =>
        [...document.querySelectorAll('header a, header button')]
          .map((el) => ({ el, r: el.getBoundingClientRect() }))
          .filter(({ r }) => r.width > 0 && r.height > 0)
          .filter(({ r }) => r.width < 44 || r.height < 44)
          .map(
            ({ el, r }) =>
              `${el.textContent?.trim() || el.getAttribute('aria-label')} ${Math.round(r.width)}x${Math.round(r.height)}`,
          ),
      )
      expect(small).toEqual([])
    })
  }
}

for (const locale of ['en', 'vi'] as const) {
  const contact = locale === 'en' ? '/contact' : '/vi/lien-he'

  test(`[${locale}] every email link opens a drafted message in this language`, async ({ page }) => {
    await page.goto(contact)
    const hrefs = await page
      .locator('a[href^="mailto:"]')
      .evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''))
    // The contact rows and the footer both link to our email.
    expect(hrefs.length).toBeGreaterThanOrEqual(2)
    for (const href of hrefs) {
      const url = new URL(href)
      expect(url.searchParams.get('subject'), href).toBeTruthy()
      expect(url.searchParams.get('body'), href).toBeTruthy()
    }
    expect(new Set(hrefs).size, 'every email link carries the same draft').toBe(1)
  })

  test(`[${locale}] the footer offers email, Zalo and WhatsApp together`, async ({ page }) => {
    await page.goto(contact)
    const footer = page.locator('footer')
    // The headline address and the email row both open the same draft.
    expect(await footer.locator('a[href^="mailto:"]').count()).toBeGreaterThanOrEqual(1)
    await expect(footer.locator('a[href*="zalo.me"]')).toHaveCount(1)
    await expect(footer.locator('a[href*="wa.me"]')).toHaveCount(1)
  })
}

for (const locale of ['en', 'vi'] as const) {
  const contact = locale === 'en' ? '/contact' : '/vi/lien-he'
  const rows = [
    { brand: 'email', href: 'a[href^="mailto:"]' },
    { brand: 'zalo', href: 'a[href*="zalo.me"]' },
    { brand: 'whatsapp', href: 'a[href*="wa.me"]' },
  ] as const

  // Each channel shows its logo tile (decorative) next to a visible text label.
  for (const place of ['.rows', 'footer'] as const) {
    test(`[${locale}] ${place}: each contact channel shows its logo and a visible label`, async ({ page }) => {
      await page.goto(contact)
      for (const { brand, href } of rows) {
        const link = page.locator(`${place} ${href}:has(svg[data-brand="${brand}"])`).first()
        await expect(link, brand).toBeVisible()
        await expect(link.locator('svg[data-brand]')).toHaveAttribute('aria-hidden', 'true')
        const label = (await link.innerText()).trim()
        expect(label.length, `${brand} has a visible label`).toBeGreaterThan(2)
        if (brand !== 'email') expect(label.toLowerCase()).toContain(brand)
      }
    })
  }

  test(`[${locale}] phone contact bar: each channel shows its logo and a visible label`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(locale === 'en' ? '/' : '/vi')
    await page.evaluate(() => window.scrollTo(0, 700))
    const bar = page.locator('nav.contact-bar')
    await expect(bar).toBeVisible()
    for (const { brand, href } of rows) {
      const link = bar.locator(`${href}:has(svg[data-brand="${brand}"])`)
      await expect(link, brand).toBeVisible()
      expect((await link.innerText()).trim().length, `${brand} label`).toBeGreaterThan(2)
      expect((await link.boundingBox())?.height ?? 0).toBeGreaterThanOrEqual(44)
    }
  })
}

test('llms.txt lists email, Zalo and WhatsApp before other profiles', async ({ request }) => {
  const text = await (await request.get('/llms.txt')).text()
  const contact = text.slice(text.indexOf('## Contact'))
  const at = (needle: string) => contact.indexOf(needle)
  for (const needle of ['Email:', 'Zalo:', 'WhatsApp:']) expect(at(needle), needle).toBeGreaterThan(-1)
  const firstProfile = Math.min(...['GitHub:', 'LinkedIn:', 'X:'].map(at).filter((i) => i > -1))
  expect(Math.max(at('Email:'), at('Zalo:'), at('WhatsApp:'))).toBeLessThan(firstProfile)
})

test.describe('reduced motion', () => {
  test('asking for it while the page is open stops the 3D scene and brings back the drawing', async ({ page }) => {
    await page.goto('/')
    const scene = page.locator('.hero-scene')
    const hasWebGL = await page.evaluate(() => !!document.createElement('canvas').getContext('webgl2'))
    test.skip(!hasWebGL, 'this browser has no WebGL, so there is no scene to stop')
    await expect(scene).toHaveAttribute('data-live', 'true')
    await expect(scene.locator('canvas')).toHaveCount(1)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect(scene).toHaveAttribute('data-live', 'false')
    await expect(scene.locator('canvas')).toHaveCount(0)
    await expect(scene.locator('.hv')).toBeVisible()
  })

  test('phone screens do not lean toward the pointer', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/products')
    const tilt = page.locator('.tilt').first()
    await tilt.scrollIntoViewIfNeeded()
    const box = (await tilt.boundingBox())!
    await page.mouse.move(box.x + box.width * 0.9, box.y + box.height * 0.1)
    await page.mouse.move(box.x + box.width * 0.95, box.y + box.height * 0.05)
    expect(await tilt.evaluate((el) => getComputedStyle(el).transform)).toBe('none')
  })
})
