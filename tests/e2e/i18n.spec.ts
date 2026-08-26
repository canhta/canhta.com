import { test, expect, type Page } from '@playwright/test'

/**
 * Two locales that do not declare each other are two competing pages, not one
 * page in two languages — and a `/vi` that serves English metadata is a
 * Vietnamese page that shares as an English one. Both were real regressions on
 * this site; both are cheap to pin.
 */

const SITE = 'https://canhta.com'

async function meta(page: Page, selector: string) {
  return page.locator(`head ${selector}`).getAttribute('content')
}

async function alternates(page: Page) {
  return page
    .locator('head link[rel="alternate"]')
    .evaluateAll((els) =>
      els.map((e) => [e.getAttribute('hreflang'), e.getAttribute('href')] as const),
    )
}

test.describe('locale routing', () => {
  test('/ serves lang="en" and /vi serves lang="vi"', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('agentic')

    await page.goto('/vi')
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi')
    // Diacritics are the cheapest proof that Vietnamese copy actually rendered.
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Tôi xây')
  })

  /**
   * The switcher's own accessible name is translated, so it has to be looked up
   * per locale. Hardcoding 'Language' passed only because the label used to be
   * English on the Vietnamese route too — which was the bug, not the contract:
   * a screen-reader user on /vi was hearing an English landmark name on an
   * otherwise fully translated page.
   */
  const NAV_NAME = { '/': 'Language', '/vi': 'Ngôn ngữ' } as const

  for (const [from, to, path] of [
    ['/', 'VI', '/vi'],
    ['/vi', 'EN', '/'],
  ] as const) {
    test(`the switch navigates ${from} → ${path} and marks the active locale`, async ({ page }) => {
      await page.goto(from)
      const nav = page.getByRole('navigation', { name: NAV_NAME[from] })
      await expect(nav).toBeVisible()

      const target = nav.getByRole('link', { name: to, exact: true })
      await target.click()
      await page.waitForURL(`**${path === '/' ? '/' : path}`)

      // The landmark is re-resolved after navigation: its name changed with the
      // locale, so the pre-navigation locator no longer matches.
      const navAfter = page.getByRole('navigation', { name: NAV_NAME[path] })
      const en = navAfter.getByRole('link', { name: 'EN', exact: true })
      const vi = navAfter.getByRole('link', { name: 'VI', exact: true })
      const active = path === '/vi' ? vi : en
      const inactive = path === '/vi' ? en : vi

      await expect(active).toHaveAttribute('aria-current', 'page')
      // The inactive one must not claim it: two `aria-current="page"` links is
      // the same as none.
      await expect(inactive).not.toHaveAttribute('aria-current', 'page')
      await expect(page.locator('html')).toHaveAttribute('lang', path === '/vi' ? 'vi' : 'en')
    })
  }
})

test.describe('hreflang', () => {
  for (const [locale, path] of [
    ['en', '/'],
    ['vi', '/vi'],
  ] as const) {
    test(`[${locale}] declares reciprocal alternates plus x-default`, async ({ page }) => {
      await page.goto(path)
      const links = await alternates(page)
      const map = Object.fromEntries(links)

      // Reciprocal: every locale points at every locale, itself included.
      expect(map.en, 'no en alternate').toBe(SITE)
      expect(map.vi, 'no vi alternate').toBe(`${SITE}/vi`)
      // x-default is what a crawler falls back to for an unmatched language.
      expect(map['x-default'], 'no x-default alternate').toBe(SITE)

      // And a canonical, so the two do not compete.
      await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute(
        'href',
        locale === 'en' ? SITE : `${SITE}/vi`,
      )
    })
  }
})

test('/vi does not serve English metadata', async ({ page }) => {
  await page.goto('/')
  const en = {
    title: await page.title(),
    description: await meta(page, 'meta[name="description"]'),
    ogTitle: await meta(page, 'meta[property="og:title"]'),
    ogDescription: await meta(page, 'meta[property="og:description"]'),
    ogLocale: await meta(page, 'meta[property="og:locale"]'),
  }

  await page.goto('/vi')
  const vi = {
    title: await page.title(),
    description: await meta(page, 'meta[name="description"]'),
    ogTitle: await meta(page, 'meta[property="og:title"]'),
    ogDescription: await meta(page, 'meta[property="og:description"]'),
    ogLocale: await meta(page, 'meta[property="og:locale"]'),
  }

  for (const key of ['title', 'description', 'ogTitle', 'ogDescription'] as const) {
    expect(en[key], `EN ${key} is empty`).toBeTruthy()
    expect(vi[key], `VI ${key} is empty`).toBeTruthy()
    expect(vi[key], `/vi serves the English ${key}`).not.toBe(en[key])
  }

  expect(en.ogLocale).toBe('en_US')
  expect(vi.ogLocale).toBe('vi_VN')

  // A shared link preview that reads as English is the failure this catches, so
  // check the Vietnamese strings are actually Vietnamese.
  expect(vi.ogTitle, 'VI og:title has no Vietnamese diacritics').toMatch(/[ăâđêôơưàáảãạ]/i)
  expect(vi.description, 'VI description has no Vietnamese diacritics').toMatch(
    /[ăâđêôơưàáảãạ]/i,
  )
})

test('the page content itself changes language, not just the metadata', async ({ page }) => {
  await page.goto('/')
  const enHeadings = await page.locator('h2').allInnerTexts()
  await page.goto('/vi')
  const viHeadings = await page.locator('h2').allInnerTexts()

  expect(viHeadings).toHaveLength(enHeadings.length)
  for (const [i, heading] of viHeadings.entries()) {
    expect(heading, `section heading ${i + 1} was not translated`).not.toBe(enHeadings[i])
  }
})
