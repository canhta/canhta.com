import { builds, capabilities, faq, profile, services, social, CONTENT_IS_FIXTURE } from '@/content'
import { t } from '@/lib/text'
import { kindLabel } from '@/lib/build-meta'

/**
 * /llms.txt — the emerging convention (llmstxt.org) for handing a language model
 * a clean, structured summary instead of making it parse a marketing page.
 *
 * Generated from `src/content` rather than hand-written, because a hand-written
 * one goes stale the first time a product ships and nobody remembers this file
 * exists. Same guard as robots: while the content is placeholder, this serves
 * nothing rather than serving fabrications in the most quotable format there is.
 */
export const dynamic = 'force-static'

export function GET() {
  if (CONTENT_IS_FIXTURE) {
    return new Response('# Not available\n\nThis site is not ready to be indexed.\n', {
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    })
  }

  const l = 'en' as const
  const email = social.find((s) => s.network === 'email')?.url.replace('mailto:', '')
  const links = social.filter((s) => s.network !== 'email')

  /**
   * `null` means "omit this line"; `''` means "a real blank line". They used to
   * both be `''` and a single filter removed both, which stripped every blank
   * line in the file — markdown needs them, so the whole document collapsed into
   * one paragraph with no headings separated from their content.
   */
  const NETWORK: Record<string, string> = { github: 'GitHub', x: 'X', linkedin: 'LinkedIn' }

  /** A tagline with no terminal punctuation runs straight into the next sentence. */
  const sentence = (x: string) => (/[.!?]$/.test(x.trim()) ? x.trim() : `${x.trim()}.`)

  const lines: (string | null)[] = [
    `# ${profile.name}`,
    '',
    `> ${t(profile.supporting, l)}`,
    '',
    `Based in ${t(profile.location, l)}. Works in English and Vietnamese.`,
    profile.available ? `Currently ${t(profile.availabilityLabel, l).toLowerCase()}.` : null,
    '',
    '## What I build',
    '',
    ...capabilities.map(
      (c) => `- **${t(c.name, l)}** — ${sentence(t(c.canDeliver, l))} Best for: ${t(c.bestFor, l)}`,
    ),
    '',
    '## Ways to work together',
    '',
    ...services.map(
      (s) => `- **${t(s.name, l)}** — ${sentence(t(s.output, l))} Right when: ${t(s.suitedTo, l)}`,
    ),
    '',
    '## Shipped work',
    '',
    ...builds.map((b) => {
      const url = b.links[0]?.url
      const head = url ? `- [${b.name}](${url})` : `- ${b.name}`
      return `${head} — ${kindLabel(b.kind, l)}, ${b.year}. ${sentence(t(b.tagline, l))} ${sentence(t(b.result, l))}`
    }),
    '',
    '## Questions people ask first',
    '',
    ...faq.flatMap((f) => [`### ${t(f.question, l)}`, '', t(f.answer, l), '']),
    '## Contact',
    '',
    email ? `- Email: ${email}` : null,
    ...links.map((s) => `- ${NETWORK[s.network] ?? s.network}: ${s.url}`),
    '',
    '---',
    '',
    'This file is generated from the site content. Nothing in it is a claim that',
    'cannot be checked against a link above.',
    '',
  ]

  return new Response(lines.filter((x) => x !== null).join('\n') + '\n', {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}
