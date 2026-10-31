import { hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import { MARKDOWN_PAGES, pageMarkdown, type MarkdownPage } from '@/lib/markdown'

/**
 * The Markdown copy of one page. It is reached only through the rewrites in
 * next.config.ts (`/services.md`, `/vi/dich-vu.md`, `/index.md`...), which are
 * the public addresses; the proxy skips `*.md`, and this path is not linked.
 */
export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => MARKDOWN_PAGES.map((page) => ({ locale, page })))
}

export async function GET(_: Request, ctx: { params: Promise<{ locale: string; page: string }> }) {
  const { locale, page } = await ctx.params
  if (!hasLocale(routing.locales, locale) || !MARKDOWN_PAGES.includes(page as MarkdownPage)) {
    return new Response(null, { status: 404 })
  }
  return new Response(pageMarkdown(locale, page as MarkdownPage), {
    headers: { 'content-type': 'text/markdown; charset=utf-8' },
  })
}
