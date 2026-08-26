import type { MetadataRoute } from 'next'
import { CONTENT_IS_FIXTURE } from '@/content'

/**
 * AI crawlers are named explicitly rather than left to `*`.
 *
 * Several of them read a bare `User-agent: *` as ambiguous, and a few operators
 * have shipped defaults that skip sites which never mention them. Naming them is
 * the difference between being available as a source and being invisible to the
 * tools people now ask for recommendations.
 *
 * The fixture guard matters more here than anywhere else on the site: while the
 * content is placeholder, every product name and number is invented, and letting
 * a crawler ingest that would put fabrications into someone's index — and into
 * answers attributed to this domain. So fixtures mean a blanket disallow, not a
 * banner.
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
  if (CONTENT_IS_FIXTURE) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_CRAWLERS, allow: '/' },
    ],
    sitemap: 'https://canhta.com/sitemap.xml',
    host: 'https://canhta.com',
  }
}
