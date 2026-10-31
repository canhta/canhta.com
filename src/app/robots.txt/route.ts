import { SITE } from '@/lib/site'

/**
 * /robots.txt, written as a route handler and not as `robots.ts` because the
 * metadata file cannot carry comments, and every group below is a decision the
 * owner may want to reverse. Sources: Google Search Central (robots.txt,
 * Google-Extended), OpenAI (developers.openai.com/api/docs/bots), Anthropic
 * (support.claude.com article 8896518), Perplexity (docs.perplexity.ai/guides/bots),
 * Apple (support.apple.com/119829).
 *
 * Everything on this site is public marketing copy and nothing in it is a
 * secret, so the default is open. The site exists to be found: by people on
 * Google, and by people who ask an assistant who can build a system for their
 * shop. Blocking a crawler that feeds an assistant removes us from those answers.
 *
 * Each crawler is named by purpose so a later change is a one-line move. The
 * groups are explicit because a named group replaces the `*` group for that bot,
 * and a reader should not have to guess what a bot is allowed to do.
 *
 * No `Crawl-delay` and no `Host`: Google's robots.txt documentation lists neither,
 * and a crawler that does not know a line ignores it.
 */
const GROUPS: { comment: string[]; agents: string[] }[] = [
  {
    comment: [
      'Search and answer engines. They put us in the results and answers people read, so they stay open.',
      'OAI-SearchBot: ChatGPT search. Claude-SearchBot: Claude search. PerplexityBot: Perplexity search.',
      'Bingbot also feeds Copilot. DuckAssistBot: DuckDuckGo answers.',
    ],
    agents: ['OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot', 'Bingbot', 'DuckAssistBot'],
  },
  {
    comment: [
      'Fetches made because a person asked an assistant about a page. Open, so an assistant can read us when asked.',
      "ChatGPT-User and Perplexity-User may ignore robots.txt: the visit is the user's own request.",
    ],
    agents: ['ChatGPT-User', 'Claude-User', 'Perplexity-User'],
  },
  {
    comment: [
      'Model training and grounding. Open on purpose: the pages hold nothing private or paid, and a model that has',
      'read what we do can describe us correctly. To opt out of training later, change Allow to Disallow here.',
      'Google-Extended and Applebot-Extended only control AI use. Neither affects Google Search or Apple search.',
      'CCBot is Common Crawl, whose data many models use.',
    ],
    agents: ['GPTBot', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended', 'Meta-ExternalAgent', 'CCBot', 'cohere-ai'],
  },
]

export const dynamic = 'force-static'

export function GET() {
  const body = [
    '# Everything is open to every crawler. The groups below say why, so a change is a deliberate one.',
    '',
    'User-agent: *',
    'Allow: /',
    ...GROUPS.flatMap(({ comment, agents }) => [
      '',
      ...comment.map((line) => `# ${line}`),
      ...agents.map((agent) => `User-agent: ${agent}`),
      'Allow: /',
    ]),
    '',
    `Sitemap: ${SITE}/sitemap.xml`,
    '',
  ].join('\n')

  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } })
}
