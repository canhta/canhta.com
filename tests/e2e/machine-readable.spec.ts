import { test, expect } from '@playwright/test'

/**
 * The half of the page only machines read.
 *
 * This suite once asserted a blanket `Disallow: /` as correct behaviour, on the
 * reasoning that placeholder product names should not reach a crawler. Canh
 * reversed that policy: the site is indexable. The tests follow the policy.
 */

const SITE = 'https://canhta.com'

test.describe('crawler surface', () => {
  test('robots.txt invites crawlers, and names the AI ones explicitly', async ({ request }) => {
    const body = await (await request.get('/robots.txt')).text()
    expect(body).toContain('Allow: /')
    expect(body, 'a blanket disallow is back').not.toMatch(/^\s*Disallow: \/\s*$/m)
    // Several AI crawlers treat a bare wildcard as ambiguous.
    for (const bot of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended']) {
      expect(body, `${bot} is not named`).toContain(bot)
    }
    expect(body).toContain('sitemap.xml')
  })

  test('llms.txt serves the real summary', async ({ request }) => {
    const body = await (await request.get('/llms.txt')).text()
    expect(body).toMatch(/^# /)
    expect(body, 'llms.txt is still the stub').not.toContain('Not available')
    expect(body).toContain('## What I build')
  })

  test('sitemap lists both locales with reciprocal alternates', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text()
    expect(xml).toContain('https://canhta.com</loc>')
    expect(xml).toContain('https://canhta.com/vi</loc>')
    expect((xml.match(/hreflang="en"/g) ?? []).length).toBe(2)
    expect((xml.match(/hreflang="vi"/g) ?? []).length).toBe(2)
  })
})

test.describe('structured data', () => {
  for (const [locale, path] of [
    ['en', '/'],
    ['vi', '/vi'],
  ] as const) {
    test(`[${locale}] the JSON-LD graph parses and carries the three entities`, async ({
      page,
    }) => {
      await page.goto(path)

      const scripts = page.locator('script[type="application/ld+json"]')
      await expect(scripts).toHaveCount(1)

      const raw = (await scripts.first().textContent()) ?? ''
      expect(raw.length, 'the ld+json block is empty').toBeGreaterThan(0)

      let graph: { '@context'?: string; '@graph'?: Array<Record<string, unknown>> }
      try {
        graph = JSON.parse(raw)
      } catch (error) {
        throw new Error(`ld+json did not parse: ${(error as Error).message}\n\n${raw.slice(0, 400)}`)
      }

      expect(graph['@context']).toBe('https://schema.org')
      const nodes = graph['@graph'] ?? []
      const types = nodes.map((n) => n['@type'])

      for (const required of ['Person', 'ProfessionalService', 'FAQPage']) {
        expect(types, `no ${required} in the graph — types were ${types.join(', ')}`).toContain(
          required,
        )
      }

      const person = nodes.find((n) => n['@type'] === 'Person')!
      const service = nodes.find((n) => n['@type'] === 'ProfessionalService')!
      const faq = nodes.find((n) => n['@type'] === 'FAQPage')!

      // An @id nothing points at is decoration; the service must reference the
      // person, which is what makes the two one entity to a consumer.
      expect(person['@id']).toBe(`${SITE}/#person`)
      expect(service.provider).toEqual({ '@id': person['@id'] })

      const questions = faq.mainEntity as Array<Record<string, unknown>>
      expect(questions.length, 'FAQPage with no questions').toBeGreaterThan(0)
      for (const q of questions) {
        expect(q['@type']).toBe('Question')
        expect(typeof q.name).toBe('string')
        expect((q.acceptedAnswer as Record<string, unknown>)['@type']).toBe('Answer')
      }

      // The graph is per-locale, not one English blob served twice.
      expect(person.description, 'Person.description is empty').toBeTruthy()
      const webPage = nodes.find((n) => n['@type'] === 'WebPage')!
      expect(webPage.inLanguage).toBe(locale)
      expect(webPage.url).toBe(locale === 'en' ? SITE : `${SITE}/vi`)
    })
  }

  test('the JSON-LD text differs between locales', async ({ page }) => {
    await page.goto('/')
    const en = await page.locator('script[type="application/ld+json"]').textContent()
    await page.goto('/vi')
    const vi = await page.locator('script[type="application/ld+json"]').textContent()
    expect(vi, '/vi serves the English structured data').not.toBe(en)
    expect(vi, 'VI structured data has no Vietnamese copy').toMatch(/[ăâđêôơưàáảãạ]/i)
  })
})
