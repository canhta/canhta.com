import { getSiteContent } from '@/content'
import type { Build, Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { pageUrl } from '@/lib/metadata'

/**
 * The machine-readable half of each page.
 *
 * It does not tell a crawler that we are the best at anything: unverifiable
 * superlatives are discounted to nothing by search and by language models, and
 * this project has a standing rule against claims nobody can check. It states
 * what exists: which services, what each produces, which apps and where to
 * verify them, and the answers to the questions buyers ask first.
 *
 * DELIBERATELY ABSENT: `aggregateRating`, `review`, and `offers` with prices.
 * There are no real ratings or published prices, and inventing them in a place
 * only machines read is still inventing them.
 *
 * Every page carries the same entities (person, service, site) so each can be
 * understood alone, then adds its own: services get the FAQ, apps get the list
 * of applications, every inner page gets a breadcrumb.
 */

const SITE = 'https://canhta.com'

export type GraphPage = 'home' | 'services' | 'products' | 'contact'

function appType(build: Build): string {
  switch (build.kind) {
    case 'mobile':
      return 'MobileApplication'
    case 'web':
    case 'saas':
      return 'WebApplication'
    default:
      return 'SoftwareApplication'
  }
}

export function buildGraph(locale: Locale, page: GraphPage = 'home') {
  const { builds, faq, offers, profile, social } = getSiteContent(locale)
  const messages = getMessages(locale)
  const personId = `${SITE}/#person`
  const serviceId = `${SITE}/#service`
  const siteId = `${SITE}/#website`
  const url = pageUrl(locale, page)
  const meta = messages.metadata[page]

  // Profiles a person can open to check we exist. A chat number is not one, so
  // neither Zalo nor WhatsApp is listed.
  const sameAs = social
    .filter((s) => s.network !== 'email' && s.network !== 'whatsapp' && s.network !== 'zalo')
    .map((s) => s.url)
  const email = social.find((s) => s.network === 'email')?.url.replace('mailto:', '')

  const person = {
    '@type': 'Person',
    '@id': personId,
    name: profile.name,
    url: SITE,
    image: `${SITE}${profile.avatar}`,
    jobTitle: messages.metadata.jobTitle,
    description: profile.supporting,
    knowsAbout: offers.map((o) => o.name),
    knowsLanguage: [
      { '@type': 'Language', name: 'Vietnamese', alternateName: 'vi' },
      { '@type': 'Language', name: 'English', alternateName: 'en' },
    ],
    address: { '@type': 'PostalAddress', addressCountry: 'VN' },
    ...(email ? { email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  }

  const professionalService = {
    '@type': 'ProfessionalService',
    '@id': serviceId,
    name: profile.name,
    url: SITE,
    image: `${SITE}${profile.avatar}`,
    description: profile.supporting,
    founder: { '@id': personId },
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    address: { '@type': 'PostalAddress', addressCountry: 'VN' },
    ...(email ? { email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: messages.metadata.offerCatalog,
      itemListElement: offers.map((o) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: o.name,
          description: o.detail,
          serviceType: o.name,
          provider: { '@id': personId },
          areaServed: { '@type': 'Place', name: 'Worldwide' },
        },
      })),
    },
  }

  const apps = builds
    .filter((b) => b.links.length > 0)
    .map((b) => ({
      '@type': appType(b),
      name: b.name,
      url: (b.links[0] as { url: string }).url,
      description: `${b.tagline} ${b.summary}`,
      applicationCategory: b.appCategory,
      // The platform is a fact on the build, not inferred from its kind: Remoti is
      // iPhone only, Scori is iOS and Android, a skill runs on neither.
      ...(b.os ? { operatingSystem: b.os } : {}),
      ...(b.kind === 'web' || b.kind === 'saas' ? { operatingSystem: 'Web' } : {}),
      // Only a product that is out has a publication date.
      ...(b.status === 'live' || b.status === 'shipped' ? { datePublished: b.year } : {}),
      author: { '@id': personId },
      ...(b.links.length > 1 ? { sameAs: b.links.slice(1).map((l) => l.url) } : {}),
    }))

  const breadcrumb =
    page === 'home'
      ? null
      : {
          '@type': 'BreadcrumbList',
          '@id': `${url}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: messages.nav.home, item: pageUrl(locale, 'home') },
            { '@type': 'ListItem', position: 2, name: messages.nav[page], item: url },
          ],
        }

  const faqPage =
    page === 'services' && faq.length > 0
      ? {
          '@type': 'FAQPage',
          '@id': `${url}#faq`,
          mainEntity: faq.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }
      : null

  return {
    '@context': 'https://schema.org',
    '@graph': [
      person,
      professionalService,
      {
        '@type': 'WebSite',
        '@id': siteId,
        url: SITE,
        name: profile.name,
        inLanguage: locale,
        publisher: { '@id': personId },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        isPartOf: { '@id': siteId },
        about: { '@id': personId },
        inLanguage: locale,
        name: meta.title,
        description: meta.description,
        ...(breadcrumb ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
      },
      ...(breadcrumb ? [breadcrumb] : []),
      ...(page === 'products' && apps.length
        ? [
            {
              '@type': 'ItemList',
              '@id': `${url}#apps`,
              name: messages.metadata.workList,
              itemListElement: apps.map((a, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: a,
              })),
            },
          ]
        : []),
      ...(faqPage ? [faqPage] : []),
    ],
  }
}

