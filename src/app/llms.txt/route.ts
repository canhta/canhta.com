import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { firstSentence } from '@/lib/first-sentence'
import { MARKDOWN_PAGES } from '@/lib/markdown'
import { markdownUrl, pageUrl } from '@/lib/metadata'
import { SITE } from '@/lib/site'
import { phoneContact } from '@/lib/contact'

/**
 * /llms.txt: the llmstxt.org format (an H1, a blockquote, then H2 lists of links),
 * a short map of the site for a language model. The full text of every page is at
 * /llms-full.txt and each page has a Markdown copy; this file only points to them.
 *
 * Generated from `src/content` and the message catalogs, so it states exactly
 * what the pages state and goes stale only when they do. Google Search ignores
 * this file (its AI optimization guide says so); other assistants may read it.
 */
export const dynamic = 'force-static'

const sentence = (x: string) => (/[.!?]$/.test(x.trim()) ? x.trim() : `${x.trim()}.`)

const pageList = (locale: Locale) =>
  MARKDOWN_PAGES.map((key) => {
    const messages = getMessages(locale)
    return `- [${messages.nav[key]}](${pageUrl(locale, key)}): ${messages.metadata[key].description}`
  })

export function GET() {
  const en = getSiteContent('en')
  const { profile, offers, builds, social } = en
  const messages = getMessages('en')
  const url = (n: string) => social.find((s) => s.network === n)?.url
  const email = url('email')?.replace('mailto:', '')
  const phone = url('phone') ? phoneContact('en').display : undefined

  const lines: string[] = [
    `# ${profile.name}`,
    '',
    `> ${profile.supporting}`,
    '',
    `Based in ${profile.location}. Works in English and Vietnamese. ${profile.available ? `${profile.availabilityLabel}. ` : ''}${messages.contact.body}`,
    '',
    '## English pages',
    '',
    ...pageList('en'),
    '',
    '## Trang tiếng Việt',
    '',
    ...pageList('vi'),
    '',
    `## ${messages.metadata.offerCatalog}`,
    '',
    ...offers.map((o) => `- [${o.name}](${pageUrl('en', 'services')}#${o.id}): ${firstSentence(o.detail)}`),
    '',
    '## Some of our products',
    '',
    ...builds.map((b) => {
      const link = b.links[0]?.url
      return `- ${link ? `[${b.name}](${link})` : b.name}: ${sentence(b.tagline)} ${sentence(b.availability)}`
    }),
    '',
    '## Contact',
    '',
    ...(email ? [`- Email: ${email}`] : []),
    ...(phone ? [`- Phone: ${phone}`] : []),
    ...(url('zalo') ? [`- Zalo: ${url('zalo')}`] : []),
    ...(url('whatsapp') ? [`- WhatsApp: ${url('whatsapp')}`] : []),
    '',
    `## ${messages.llms.limitsHeading}`,
    '',
    ...messages.llms.limits.map((l) => `- ${l}`),
    '',
    '## Optional',
    '',
    `- [Full text of every page, English then Vietnamese](${SITE}/llms-full.txt)`,
    ...(['en', 'vi'] as const).flatMap((l) =>
      MARKDOWN_PAGES.map((key) => `- [${getMessages(l).nav[key]} as Markdown (${l})](${markdownUrl(l, key)})`),
    ),
    '',
  ]

  return new Response(lines.join('\n'), { headers: { 'content-type': 'text/plain; charset=utf-8' } })
}
