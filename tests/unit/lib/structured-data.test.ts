import { describe, expect, it } from 'vitest'
import { builds, faq } from '@/content'
import type { Locale } from '@/content/types'
import { buildGraph } from '@/lib/structured-data'

const LOCALES: Locale[] = ['en', 'vi']

/** Every key anywhere in the graph, however deeply nested. */
function allKeys(value: unknown, into: Set<string> = new Set()): Set<string> {
  if (Array.isArray(value)) {
    for (const item of value) allKeys(item, into)
    return into
  }
  if (value !== null && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      into.add(key)
      allKeys(child, into)
    }
  }
  return into
}

function nodesOfType(graph: ReturnType<typeof buildGraph>, type: string) {
  return graph['@graph'].filter((node) => node['@type'] === type)
}

describe.each(LOCALES)('buildGraph(%s)', (locale) => {
  const graph = buildGraph(locale)

  it('serialises to valid JSON', () => {
    const json = JSON.stringify(graph)
    expect(() => JSON.parse(json) as unknown).not.toThrow()
    // Embedded in a <script> tag, so a literal `</script>` would end it early.
    expect(json).not.toContain('</script')
  })

  it('declares the schema.org context and a non-empty graph', () => {
    expect(graph['@context']).toBe('https://schema.org')
    expect(Array.isArray(graph['@graph'])).toBe(true)
    expect(graph['@graph'].length).toBeGreaterThan(0)
  })

  it('contains exactly the expected top-level types', () => {
    const types = graph['@graph'].map((node) => node['@type'])
    expect(types).toEqual([
      'Person',
      'ProfessionalService',
      'WebSite',
      'WebPage',
      'ItemList',
      'FAQPage',
    ])
  })

  it('gives every node an @type and every referenced @id a definition', () => {
    const defined = new Set(
      graph['@graph']
        .map((node) => (node as { '@id'?: unknown })['@id'])
        .filter((id): id is string => typeof id === 'string'),
    )
    for (const node of graph['@graph']) {
      expect(node['@type']).toBeTruthy()
    }
    // Every `{ '@id': ... }` reference in the tree must resolve to a node the
    // same graph defines; a dangling reference is a fact a crawler drops.
    const json = JSON.stringify(graph)
    for (const match of json.matchAll(/"@id":"([^"]+)"/g)) {
      const id = match[1]
      if (id !== undefined && id.includes('#')) expect(defined.has(id)).toBe(true)
    }
  })

  it('states the language of the page it describes', () => {
    const [website] = nodesOfType(graph, 'WebSite')
    const [webpage] = nodesOfType(graph, 'WebPage')
    expect(website).toMatchObject({ inLanguage: locale })
    expect(webpage).toMatchObject({ inLanguage: locale })
  })

  it('lists one FAQ entry per fixture question', () => {
    const [faqPage] = nodesOfType(graph, 'FAQPage')
    const mainEntity = (faqPage as { mainEntity?: unknown[] } | undefined)?.mainEntity
    expect(mainEntity).toHaveLength(faq.length)
    expect(faq.length).toBe(6)

    for (const question of mainEntity ?? []) {
      expect(question).toMatchObject({ '@type': 'Question' })
      const q = question as { name: string; acceptedAnswer: { '@type': string; text: string } }
      expect(q.name.length).toBeGreaterThan(0)
      expect(q.acceptedAnswer['@type']).toBe('Answer')
      expect(q.acceptedAnswer.text.length).toBeGreaterThan(0)
    }
  })

  it('lists only products a crawler can actually follow', () => {
    const [itemList] = nodesOfType(graph, 'ItemList')
    const items = (itemList as { itemListElement?: unknown[] } | undefined)?.itemListElement ?? []
    expect(items).toHaveLength(builds.filter((b) => b.links.length > 0).length)

    items.forEach((element, i) => {
      const listItem = element as { position: number; item: { url: string; name: string } }
      expect(listItem.position).toBe(i + 1)
      expect(listItem.item.url).toMatch(/^https?:\/\//)
      expect(listItem.item.name.length).toBeGreaterThan(0)
    })
  })

  /**
   * The hard project rule. Structured data is exactly where fabrication gets
   * penalised, and it is the one part of the page a human reviewer never sees —
   * so a made-up rating could sit here for months. There are no real ratings and
   * no published prices, so these keys must not exist at any depth.
   */
  it('carries no fabricated proof: no aggregateRating, review or priceRange', () => {
    const keys = allKeys(graph)
    for (const forbidden of ['aggregateRating', 'review', 'reviewCount', 'ratingValue', 'priceRange', 'price']) {
      expect(keys.has(forbidden)).toBe(false)
    }

    const json = JSON.stringify(graph)
    for (const forbidden of ['aggregateRating', 'review', 'priceRange']) {
      expect(json).not.toContain(`"${forbidden}"`)
    }
  })

  it('offers services without attaching a price to them', () => {
    const [service] = nodesOfType(graph, 'ProfessionalService')
    const catalog = (service as { hasOfferCatalog?: { itemListElement?: unknown[] } } | undefined)
      ?.hasOfferCatalog
    const offers = catalog?.itemListElement ?? []
    expect(offers.length).toBeGreaterThan(0)

    for (const offer of offers) {
      const keys = allKeys(offer)
      expect(keys.has('price')).toBe(false)
      expect(keys.has('priceSpecification')).toBe(false)
      expect(keys.has('lowPrice')).toBe(false)
    }
  })

  it('makes no unverifiable superlative claim', () => {
    const json = JSON.stringify(graph).toLowerCase()
    for (const claim of ['best in', 'world-class', 'number one', '#1', 'award-winning', 'leading provider']) {
      expect(json).not.toContain(claim)
    }
  })
})

describe('buildGraph across locales', () => {
  it('points the two routes at their own URLs', () => {
    const en = buildGraph('en')['@graph'].find((n) => n['@type'] === 'WebPage') as { url: string }
    const vi = buildGraph('vi')['@graph'].find((n) => n['@type'] === 'WebPage') as { url: string }
    expect(en.url).toBe('https://canhta.com')
    expect(vi.url).toBe('https://canhta.com/vi')
  })

  it('keeps one stable Person identity shared by both routes', () => {
    const idOf = (locale: Locale) =>
      (buildGraph(locale)['@graph'].find((n) => n['@type'] === 'Person') as { '@id': string })['@id']
    expect(idOf('en')).toBe(idOf('vi'))
  })

  it('translates the prose it carries', () => {
    const descOf = (locale: Locale) =>
      (buildGraph(locale)['@graph'].find((n) => n['@type'] === 'Person') as { description: string })
        .description
    expect(descOf('vi')).not.toBe(descOf('en'))
  })

  it('exposes the contact address without the mailto: scheme', () => {
    const person = buildGraph('en')['@graph'].find((n) => n['@type'] === 'Person') as {
      email?: string
      sameAs?: string[]
    }
    expect(person.email).toBe('hello@canhta.com')
    // The email link belongs in `email`, not in the profile list.
    for (const url of person.sameAs ?? []) expect(url).not.toMatch(/^mailto:/)
  })
})
