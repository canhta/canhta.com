import { getSiteContent } from '@/content'
import type { Build, Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { firstSentence } from '@/lib/first-sentence'
import { PAGE_PATH, markdownUrl, pageUrl } from '@/lib/metadata'
import { routing } from '@/i18n/routing'

/**
 * The same pages as plain Markdown, for readers that are not browsers (llmstxt.org
 * suggests a `.md` copy of each page). Every line is built from the same messages
 * and content the HTML pages read, so the two cannot drift, and nothing is added
 * that a visitor could not see on the page.
 */
export type MarkdownPage = keyof typeof PAGE_PATH
export const MARKDOWN_PAGES = Object.keys(PAGE_PATH) as MarkdownPage[]

const LANGUAGE: Record<Locale, string> = { en: 'English', vi: 'Tiếng Việt' }

const sentence = (x: string) => (/[.!?]$/.test(x.trim()) ? x.trim() : `${x.trim()}.`)

function contactLines(locale: Locale): string[] {
  const { social } = getSiteContent(locale)
  const messages = getMessages(locale)
  const url = (n: string) => social.find((s) => s.network === n)?.url
  const email = url('email')?.replace('mailto:', '')
  const phone = url('phone')?.replace('tel:', '')
  return [
    email ? `- ${messages.contact.email}: ${email}` : null,
    phone ? `- ${messages.contact.call}: ${phone}` : null,
    url('zalo') ? `- Zalo: ${url('zalo')}` : null,
    url('whatsapp') ? `- WhatsApp: ${url('whatsapp')}` : null,
  ].filter((x): x is string => x !== null)
}

function buildLines(build: Build, locale: Locale, level: string): string[] {
  const links = build.links.map((l) => `[${getMessages(locale).buildMeta.links[l.kind]}](${l.url})`).join(' · ')
  return [
    `${level} ${build.name}`,
    '',
    `${sentence(build.tagline)} ${sentence(build.summary)} ${sentence(build.availability)}`,
    '',
    links,
    '',
  ]
}

function offerLines(locale: Locale, level: string, full: boolean): string[] {
  return getSiteContent(locale).offers.flatMap((o) =>
    full
      ? [
          `${level} ${o.name}`,
          '',
          o.detail,
          '',
          ...(o.examples.length ? [o.examples.join(', '), ''] : []),
        ]
      : [`- **${o.name}**: ${firstSentence(o.detail)}`],
  )
}

function closingLines(locale: Locale): string[] {
  const { closing } = getMessages(locale)
  return ['## ' + closing.heading, '', closing.body, '', ...contactLines(locale), '']
}

/** What we state and what we leave out, so an answer built from this page stays inside it. */
function limitsLines(locale: Locale): string[] {
  const { llms } = getMessages(locale)
  return ['## ' + llms.limitsHeading, '', ...llms.limits.map((l) => `- ${l}`), '']
}

export function pageMarkdown(locale: Locale, page: MarkdownPage): string {
  const { profile, builds, faq } = getSiteContent(locale)
  const messages = getMessages(locale)
  const url = pageUrl(locale, page)
  const head = (title: string, intro: string): string[] => [
    `# ${title}`,
    '',
    `> ${intro}`,
    '',
    `<${url}>`,
    '',
  ]

  let body: string[]
  switch (page) {
    case 'home': {
      const home = messages.home
      body = [
        ...head(profile.hook, profile.supporting),
        home.scope.join(', ') + '.',
        '',
        `## ${home.servicesHeading}`,
        '',
        ...offerLines(locale, '###', false),
        '',
        `## ${home.questionsHeading}`,
        '',
        ...faq
          .filter((f) => ['pricing', 'wrong', 'ownership'].includes(f.id))
          .flatMap((f) => [`### ${f.question}`, '', firstSentence(f.answer), '']),
        `## ${home.appsHeading}`,
        '',
        ...builds.filter((b) => b.shots?.length).flatMap((b) => buildLines(b, locale, '###')),
        `## ${messages.about.heading}`,
        '',
        messages.about.proof,
        '',
        ...closingLines(locale),
      ]
      break
    }
    case 'services':
      body = [
        ...head(messages.services.h1, messages.services.intro),
        ...offerLines(locale, '##', true),
        `## ${messages.services.processHeading}`,
        '',
        ...messages.process.steps.map((s, i) => `${i + 1}. ${s.label}. ${s.detail}`),
        '',
        messages.process.rule,
        '',
        `## ${messages.services.faqHeading}`,
        '',
        ...faq.flatMap((f) => [`### ${f.question}`, '', f.answer, '']),
        ...closingLines(locale),
      ]
      break
    case 'products':
      body = [
        ...head(messages.apps.h1, messages.apps.intro),
        ...builds.filter((b) => b.shots?.length).flatMap((b) => buildLines(b, locale, '##')),
        `## ${messages.apps.publicHeading}`,
        '',
        ...builds.filter((b) => !b.shots?.length).flatMap((b) => buildLines(b, locale, '###')),
        ...closingLines(locale),
      ]
      break
    case 'contact':
      body = [
        ...head(messages.contact.h1, messages.contact.body),
        `## ${messages.contact.channels}`,
        '',
        ...contactLines(locale),
        '',
        `## ${messages.contact.helpHeading}`,
        '',
        ...messages.contact.help.map((h) => `- ${h}`),
        '',
        `## ${messages.contact.nextHeading}`,
        '',
        messages.contact.next,
        '',
      ]
      break
  }

  // The same page in the other language, as the HTML head's hreflang says.
  const others = routing.locales
    .filter((l) => l !== locale)
    .map((l) => `[${LANGUAGE[l as Locale]}](${markdownUrl(l as Locale, page)})`)
  return [...body, ...(page === 'home' || page === 'services' ? limitsLines(locale) : []), others.join(' · '), '']
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
}
