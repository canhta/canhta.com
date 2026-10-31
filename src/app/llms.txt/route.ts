import { getSiteContent } from '@/content'
import { getMessages } from '@/i18n/messages'
import { PAGE_PATH, pageUrl } from '@/lib/metadata'

/**
 * /llms.txt — the emerging convention (llmstxt.org) for handing a language model
 * a clean, structured summary instead of making it parse a marketing page.
 *
 * Generated from `src/content` rather than hand-written, because a hand-written
 * one goes stale the first time a product ships and nobody remembers this file
 * exists.
 *
 * It served a stub while the content was placeholder. That came out with the
 * robots.txt block, for consistency: a site that is open to crawlers has no
 * reason to withhold the one file that tells them what it is.
 */
export const dynamic = 'force-static'

const PAGE_KEYS = Object.keys(PAGE_PATH) as (keyof typeof PAGE_PATH)[]

/** The four pages of one language, named in that language. */
const pages = (locale: 'en' | 'vi') =>
  PAGE_KEYS.map((key) => `- [${getMessages(locale).nav[key]}](${pageUrl(locale, key)})`)

export function GET() {
  const l = 'en' as const
  const { builds, faq, offers, profile, social } = getSiteContent(l)
  const messages = getMessages(l)
  const email = social.find((s) => s.network === 'email')?.url.replace('mailto:', '')
  // Email, Zalo and WhatsApp stay together and come first; profiles follow.
  const chat = ['phone', 'zalo', 'whatsapp']
  const links = [
    ...chat.flatMap((n) => social.filter((s) => s.network === n)),
    ...social.filter((s) => s.network !== 'email' && !chat.includes(s.network)),
  ]

  /**
   * `null` means "omit this line"; `''` means "a real blank line". They used to
   * both be `''` and a single filter removed both, which stripped every blank
   * line in the file — markdown needs them, so the whole document collapsed into
   * one paragraph with no headings separated from their content.
   */
  const NETWORK: Record<string, string> = { github: 'GitHub', x: 'X', linkedin: 'LinkedIn', phone: 'Phone', zalo: 'Zalo', whatsapp: 'WhatsApp' }

  /** A tagline with no terminal punctuation runs straight into the next sentence. */
  const sentence = (x: string) => (/[.!?]$/.test(x.trim()) ? x.trim() : `${x.trim()}.`)

  const lines: (string | null)[] = [
    `# ${profile.name}`,
    '',
    `> ${profile.supporting}`,
    '',
    `Based in ${profile.location}. Works in English and Vietnamese.`,
    profile.available ? `Currently ${profile.availabilityLabel.toLowerCase()}.` : null,
    '',
    '## Pages',
    '',
    ...pages('en'),
    '',
    '## Tiếng Việt',
    '',
    ...pages('vi'),
    '',
    `## ${messages.metadata.offerCatalog}`,
    '',
    ...offers.map((o) => `- **${o.name}**: ${sentence(o.detail)}`),
    '',
    `## ${messages.services.processHeading}`,
    '',
    ...messages.process.steps.map((s, i) => `${i + 1}. ${s.label}. ${s.detail}`),
    '',
    '## Some of our products and public projects',
    '',
    ...builds.map((b) => {
      const url = b.links[0]?.url
      const head = url ? `- [${b.name}](${url})` : `- ${b.name}`
      return `${head}: ${sentence(b.tagline)} ${sentence(b.summary)} ${sentence(b.availability)}`
    }),
    '',
    '## Questions people ask first',
    '',
    ...faq.flatMap((f) => [`### ${f.question}`, '', f.answer, '']),
    '## Contact',
    '',
    messages.contact.body,
    '',
    email ? `- Email: ${email}` : null,
    ...links.map((s) => `- ${NETWORK[s.network] ?? s.network}: ${s.network === 'phone' ? s.url.replace('tel:', '') : s.url}`),
    '',
  ]

  return new Response(lines.filter((x) => x !== null).join('\n') + '\n', {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}
