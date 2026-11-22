/** @vitest-environment node */
import { describe, expect, it } from 'vitest'
import sitemap from '@/app/sitemap'
import { getPageCopy } from '@/content/pages'
import { getSiteContent } from '@/content'
import { APP_PAGES, PAGE_PATH, pageUrl } from '@/lib/metadata'
import { buildGraph } from '@/lib/structured-data'

describe('about, privacy, terms and the app pages', () => {
  it('lists every page in both languages in the sitemap', () => {
    const urls = sitemap().map((e) => e.url)
    for (const page of Object.keys(PAGE_PATH) as (keyof typeof PAGE_PATH)[]) {
      expect(urls).toContain(pageUrl('en', page))
      expect(urls).toContain(pageUrl('vi', page))
    }
    expect(pageUrl('vi', 'privacy')).toBe('https://www.canhta.com/vi/quyen-rieng-tu')
    expect(pageUrl('vi', 'scori')).toBe('https://www.canhta.com/vi/san-pham/scori')
  })

  it('has an app page for each app marked with a detail page', () => {
    const detailed = getSiteContent('en').builds.filter((b) => b.detail).map((b) => b.slug)
    expect(detailed.toSorted()).toEqual([...APP_PAGES].toSorted())
  })

  it.each(['en', 'vi'] as const)('[%s] the privacy policy covers Google advertising cookies and how to opt out', (locale) => {
    const urls = getPageCopy(locale).privacy.sections.flatMap((s) => (s.links ?? []).map((l) => ('url' in l ? l.url : '')))
    expect(urls.some((u) => u.startsWith('https://www.google.com/settings/ads'))).toBe(true)
    expect(urls.some((u) => u.startsWith('https://policies.google.com/technologies/ads'))).toBe(true)
    expect(urls.some((u) => u.startsWith('https://www.aboutads.info'))).toBe(true)
    expect(getPageCopy(locale).privacy.sections.map((s) => s.id)).toContain('eea')
  })

  it.each(['en', 'vi'] as const)('[%s] app pages show no store badge, status line or price', (locale) => {
    for (const slug of APP_PAGES) {
      const text = JSON.stringify(getPageCopy(locale).apps[slug])
      expect(text).not.toMatch(/apps\.apple\.com|play\.google\.com|coming soon|sắp có|\$\d|\d\s?(?:usd|vnd|₫)/i)
    }
  })

  it('an app page names its app and sits under the products page in the breadcrumb', () => {
    const graph = buildGraph('en', 'scori')['@graph'] as Record<string, unknown>[]
    const crumb = graph.find((n) => n['@type'] === 'BreadcrumbList') as { itemListElement: { item: string }[] }
    expect(crumb.itemListElement.map((i) => i.item)).toEqual([
      pageUrl('en', 'home'),
      pageUrl('en', 'products'),
      pageUrl('en', 'scori'),
    ])
    const page = graph.find((n) => n['@type'] === 'WebPage') as { mainEntity?: { name: string } }
    expect(page.mainEntity?.name).toBe('Scori')
  })
})
