import { getSiteContent } from '@/content'
import { MARKDOWN_PAGES, pageMarkdown } from '@/lib/markdown'
import { SITE } from '@/lib/site'

/**
 * /llms-full.txt: the text of all four pages in both languages in one file, so a
 * reader that wants everything makes one request. Same pages, same words as the
 * site, from the same source as the Markdown copy of each page.
 */
export const dynamic = 'force-static'

export function GET() {
  const { profile } = getSiteContent('en')
  const parts = (['en', 'vi'] as const).flatMap((locale) => MARKDOWN_PAGES.map((page) => pageMarkdown(locale, page)))
  const body = [`# ${profile.name}: full text`, '', `> ${SITE}. English pages first, then Vietnamese.`, '', parts.join('\n---\n\n')].join('\n')

  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } })
}
