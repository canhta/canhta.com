import type { MetadataRoute } from 'next'

/**
 * AI crawlers are named explicitly rather than left to `*`.
 *
 * Several of them read a bare `User-agent: *` as ambiguous, and a few operators
 * have shipped defaults that skip sites which never mention them. Naming them is
 * the difference between being available as a source and being invisible to the
 * tools people now ask for recommendations.
 *
 * This used to serve a blanket `Disallow: /` while the content was placeholder,
 * on the reasoning that letting a crawler ingest invented product names puts
 * fabrications into someone else's index attributed to this domain. Canh
 * overruled it: the site should be indexable now. That is his domain and his
 * call, and the consequence is stated plainly in the README.
 *
 * The human-facing signal stays — the fixture banner is on every page — and the
 * build guard is untouched.
 */
const AI_CRAWLERS = [
  'GPTBot', // OpenAI, training
  'OAI-SearchBot', // OpenAI, ChatGPT search results
  'ChatGPT-User', // OpenAI, user-initiated fetch
  'ClaudeBot', // Anthropic
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended', // Gemini grounding
  'Applebot-Extended',
  'Bingbot',
  'DuckAssistBot',
  'cohere-ai',
  'Meta-ExternalAgent',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_CRAWLERS, allow: '/' },
    ],
    sitemap: 'https://canhta.com/sitemap.xml',
    host: 'https://canhta.com',
  }
}
