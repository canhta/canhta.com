/** @vitest-environment node */
import { describe, expect, it } from 'vitest'
import { GET as page } from '@/app/md/[locale]/[page]/route'
import { GET as llms } from '@/app/llms.txt/route'
import { GET as llmsFull } from '@/app/llms-full.txt/route'
import { GET as robots } from '@/app/robots.txt/route'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { MARKDOWN_PAGES, pageMarkdown } from '@/lib/markdown'
import { markdownUrl } from '@/lib/metadata'

const LOCALES: Locale[] = ['en', 'vi']

describe('Markdown copies of the pages', () => {
  it.each(LOCALES)('[%s] each page starts with one H1, names the way to reach us and states no price', (locale) => {
    for (const page of MARKDOWN_PAGES) {
      const md = pageMarkdown(locale, page)
      expect(md.match(/^# /gm)).toHaveLength(1)
      expect(md).toContain('hello@canhta.com')
      expect(md).not.toMatch(/\d\s?(?:usd|vnd|đ|\$|₫)|(?:usd|\$|₫)\s?\d/i)
    }
  })

  it('names the HTML page as canonical in a Link header', async () => {
    const res = await page(new Request('https://www.canhta.com/vi/dich-vu.md'), {
      params: Promise.resolve({ locale: 'vi', page: 'services' }),
    })
    expect(res.headers.get('link')).toBe('<https://www.canhta.com/vi/dich-vu>; rel="canonical"')
    expect(res.headers.get('content-type')).toContain('text/markdown')
  })

  it('gives each page its own address, with the two homes at index.md', () => {
    expect(markdownUrl('en', 'home')).toBe('https://www.canhta.com/index.md')
    expect(markdownUrl('vi', 'home')).toBe('https://www.canhta.com/vi/index.md')
    expect(markdownUrl('vi', 'services')).toBe('https://www.canhta.com/vi/dich-vu.md')
  })
})

describe('machine-readable files', () => {
  it('llms.txt follows the llmstxt.org shape and links every page in both languages', async () => {
    const text = await llms().text()
    expect(text).toMatch(/^# .+\n\n> .+/)
    for (const locale of LOCALES) {
      for (const page of MARKDOWN_PAGES) expect(text).toContain(`[${getMessages(locale).nav[page]}](`)
    }
    expect(text).toContain('/llms-full.txt')
  })

  it('llms-full.txt carries all eight pages', async () => {
    const text = await llmsFull().text()
    for (const locale of LOCALES) for (const page of MARKDOWN_PAGES) expect(text).toContain(pageMarkdown(locale, page))
  })

  it('robots.txt allows everyone, names the sitemap and sets no crawl delay', async () => {
    const text = await robots().text()
    expect(text).toMatch(/User-agent: \*\nAllow: \//)
    expect(text).not.toMatch(/^Disallow: ./m)
    expect(text).toContain('Sitemap: https://www.canhta.com/sitemap.xml')
    expect(text).not.toMatch(/crawl-delay|^host:/im)
  })
})
