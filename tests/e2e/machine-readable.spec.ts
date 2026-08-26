import { test, expect } from '@playwright/test'

/**
 * The half of the page only machines read.
 *
 * The fixture guard is the important part here and it is asserted as *correct
 * behaviour*, not tolerated as a known failure: while `src/content` is
 * placeholder, every product name and number on this site is invented, and
 * `robots.ts` / `llms.txt` deliberately refuse to hand that to a crawler. A
 * suite that expected `Allow: /` today would be demanding the site publish
 * fabrications.
 *
 * When the real content lands, `CONTENT_IS_FIXTURE` flips and these two tests
 * fail loudly — which is the reminder to come back and invert them.
 */

const SITE = 'https://canhta.com'

test.describe('crawler surface', () => {
  test('/robots.txt disallows everything while the content is fixture', async ({ request }) => {
    const res = await request.get('/robots.txt')
    expect(res.status()).toBe(200)
    const body = await res.text()

    expect(body).toMatch(/^User-Agent:\s*\*$/im)
    expect(body).toMatch(/^Disallow:\s*\/$/im)
    // A blanket disallow that also advertises a sitemap is a mixed signal.
    expect(body, 'robots.txt allows a path while fixtures are live').not.toMatch(/^Allow:/im)
  })

  test('/llms.txt serves the stub while the content is fixture', async ({ request }) => {
    const res = await request.get('/llms.txt')
    expect(res.status()).toBe(200)
    expect(res.headers()['content-type']).toContain('text/plain')
    const body = await res.text()
    expect(body).toContain('# Not available')
    // The point of the guard: no invented product names in the most quotable
    // format on the site.
    expect(body.split('\n').length, 'llms.txt is serving real content').toBeLessThan(8)
  })

  test('/sitemap.xml lists both locales with reciprocal alternates', async ({ request }) => {
    const res = await request.get('/sitemap.xml')
    expect(res.status()).toBe(200)
    const xml = await res.text()

    const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => {
      const block = m[1]!
      return {
        loc: /<loc>(.*?)<\/loc>/.exec(block)?.[1],
        alternates: [...block.matchAll(/hreflang="(.*?)"\s+href="(.*?)"/g)].map(
          (a) => [a[1], a[2]] as const,
        ),
      }
    })

    expect(entries.map((e) => e.loc)).toEqual([SITE, `${SITE}/vi`])

    // Reciprocal means identical: every entry declares every locale, itself
    // included. A one-way declaration is ignored by every crawler that reads it.
    for (const entry of entries) {
      const map = Object.fromEntries(entry.alternates)
      expect(map.en, `${entry.loc} has no en alternate`).toBe(SITE)
      expect(map.vi, `${entry.loc} has no vi alternate`).toBe(`${SITE}/vi`)
    }

    expect(xml).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"')
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
