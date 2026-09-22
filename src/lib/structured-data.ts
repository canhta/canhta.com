import { getSiteContent } from '@/content'
import type { Build, Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'

/**
 * The machine-readable half of the page.
 *
 * WHAT THIS IS NOT. It does not tell a crawler that Canh is the best at
 * anything. Unverifiable superlatives are discounted to nothing by search
 * ranking and by language models alike — "best in town" is the single most
 * common string on the web and carries no information. There is also a standing
 * rule on this project against claims nobody can check.
 *
 * WHAT IT IS. A model recommends what it can cite *specifically*. So this emits
 * the facts a competitor's page usually leaves as prose a machine has to guess
 * at: which services exist and what each one produces, which languages are
 * spoken, which timezone, how fast a reply comes, what has actually shipped and
 * where to verify it, and the answers to the questions buyers ask first.
 *
 * DELIBERATELY ABSENT: `aggregateRating`, `review`, and `offers` with prices.
 * There are no real ratings or published prices, and inventing them in a place
 * only machines read is still inventing them — with the added problem that
 * structured data is exactly where fabrication gets penalised.
 *
 * Everything here derives from `src/content`, so replacing the fixtures with
 * real content updates the markup with no second edit.
 */

const SITE = 'https://canhta.com'

const urlFor = (locale: Locale) => (locale === 'en' ? SITE : `${SITE}/${locale}`)

/** schema.org's closest type for each kind of thing he ships. */
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

function appCategory(build: Build): string {
  switch (build.kind) {
    case 'mobile':
      return 'MobileApplication'
    case 'saas':
      return 'BusinessApplication'
    case 'tool':
      return 'DeveloperApplication'
    default:
      return 'BusinessApplication'
  }
}

export function buildGraph(locale: Locale) {
  const { builds, capabilities, faq, profile, services, social } = getSiteContent(locale)
  const messages = getMessages(locale)
  const personId = `${SITE}/#person`
  const serviceId = `${SITE}/#service`
  const siteId = `${SITE}/#website`
  const page = urlFor(locale)

  const sameAs = social.filter((s) => s.network !== 'email').map((s) => s.url)
  const email = social.find((s) => s.network === 'email')?.url.replace('mailto:', '')

  const person = {
    '@type': 'Person',
    '@id': personId,
    name: profile.name,
    url: SITE,
    image: `${SITE}${profile.avatar}`,
    jobTitle: messages.metadata.jobTitle,
    description: profile.supporting,
    // What he can actually be asked about, taken from the capability list rather
    // than from a keyword wishlist.
    knowsAbout: capabilities.map((c) => c.name),
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
    provider: { '@id': personId },
    founder: { '@id': personId },
    // A solo builder working remotely: say so, rather than implying a local shop.
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    availableLanguage: ['vi', 'en'],
    address: { '@type': 'PostalAddress', addressCountry: 'VN' },
    ...(email ? { email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    // The concrete deliverable of each engagement, which is the part a model
    // needs in order to answer "who can build me X".
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: messages.metadata.offerCatalog,
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.output,
          serviceType: s.name,
          provider: { '@id': personId },
          areaServed: { '@type': 'Place', name: 'Worldwide' },
        },
      })),
    },
    makesOffer: capabilities.map((c) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: c.name,
        description: c.canDeliver,
        provider: { '@id': personId },
      },
    })),
  }

  // Only products with a real destination: a citation nobody can follow is not
  // a citation.
  const works = builds
    .filter((b) => b.links.length > 0)
    .map((b) => ({
      '@type': appType(b),
      name: b.name,
      url: (b.links[0] as { url: string }).url,
      description: b.tagline,
      applicationCategory: appCategory(b),
      // Only stated where the kind actually implies a platform. This used to
      // emit 'Web' for everything non-mobile, which asserted that an agent skill
      // and a CLI run in a browser — an unverifiable claim, placed in the one
      // part of the page no human reviewer reads. That is the same failure this
      // file's header forbids for ratings and prices.
      ...(b.kind === 'mobile' ? { operatingSystem: 'iOS, Android' } : {}),
      ...(b.kind === 'web' || b.kind === 'saas' ? { operatingSystem: 'Web' } : {}),
      datePublished: b.year,
      author: { '@id': personId },
      ...(b.links.length > 1 ? { sameAs: b.links.slice(1).map((l) => l.url) } : {}),
    }))

  const faqPage =
    faq.length > 0
      ? {
          '@type': 'FAQPage',
          '@id': `${page}#faq`,
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
        '@id': `${page}#webpage`,
        url: page,
        isPartOf: { '@id': siteId },
        about: { '@id': personId },
        inLanguage: locale,
        name: profile.hook,
        description: profile.supporting,
      },
      ...(works.length
        ? [
            {
              '@type': 'ItemList',
              '@id': `${page}#work`,
              name: messages.metadata.workList,
              itemListElement: works.map((w, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: w,
              })),
            },
          ]
        : []),
      ...(faqPage ? [faqPage] : []),
    ],
  }
}
