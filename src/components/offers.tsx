import { Link } from '@/i18n/navigation'
import { getSiteContent } from '@/content'
import type { Locale, Offer } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { InView } from './in-view'

/**
 * The services as a bento: cells of different sizes and grounds, each with a
 * small picture of what it does. The groups are not equal in weight (business
 * systems is the core), so they are not equal cards. The pictures are drawn in
 * CSS, hidden from screen readers, and play once when they scroll into view.
 *
 * `home` shows the name and the examples and makes each cell one link to its
 * place on the services page. `page` shows the full sentence and carries the
 * anchor ids the home links land on.
 */

type Ground = 'night' | 'lime' | 'white' | 'wash'

const GROUND: Record<string, Ground> = {
  systems: 'night',
  ai: 'lime',
  data: 'white',
  web: 'wash',
  iot: 'night',
  team: 'white',
}

function Visual({ id, approve }: { id: string; approve: string }) {
  switch (id) {
    case 'systems':
      return (
        <InView className="mv mv-lg">
          <div className="mv-flow">
            {[0, 1, 2, 3, 4].map((row) => (
              <div key={row} className="mv-flow-row">
                <span className="mv-bubble" />
                <span className="mv-dash" />
                <span className="mv-trow">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            ))}
          </div>
        </InView>
      )
    case 'ai':
      return (
        <InView className="mv mv-lg">
          <div className="mv-agent">
            <div className="mv-agent-head">
              <span className="mv-avatar" />
              <span className="mv-agent-lines">
                <span className="mv-line" />
                <span className="mv-line" style={{ width: '62%' }} />
              </span>
            </div>
            <div className="mv-agent-foot">
              <span className="mv-approve">{approve}</span>
              <span className="mv-check" />
            </div>
            <svg className="mv-cursor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 3l14 8-6.2 1.6L9.6 19 5 3Z" fill="#fff" stroke="#131517" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
          </div>
        </InView>
      )
    case 'data':
      return (
        <InView className="mv">
          <div className="mv-bars">
            {[38, 52, 44, 70, 62, 94].map((h, i) => (
              <i key={i} style={{ '--h': `${h}%`, '--i': i } as React.CSSProperties} />
            ))}
          </div>
        </InView>
      )
    case 'web':
      return (
        <InView className="mv">
          <div className="mv-browser">
            <span className="mv-browser-bar" />
            <span className="mv-browser-hero" />
            <span className="mv-line" />
            <span className="mv-line" />
            <span className="mv-phone">
              <i />
            </span>
          </div>
        </InView>
      )
    case 'iot':
      return (
        <InView className="mv">
          <div className="mv-sensor">
            {[0, 1, 2].map((i) => (
              <span key={i} className="mv-ring" style={{ '--i': i } as React.CSSProperties} />
            ))}
            <span className="mv-node" />
          </div>
        </InView>
      )
    default:
      return (
        <InView className="mv">
          <div className="mv-blocks">
            <i />
            <i />
          </div>
        </InView>
      )
  }
}

function Cell({
  offer,
  mode,
  approve,
  Heading,
}: {
  offer: Offer
  mode: 'home' | 'page'
  approve: string
  Heading: 'h2' | 'h3'
}) {
  const big = offer.id === 'systems' || offer.id === 'ai'
  const ground = GROUND[offer.id] ?? 'white'
  const nameClass = big ? 'title max-w-[18ch]' : 'subtitle text-[1.3rem] max-w-[20ch]'

  const body = (
    <div className="cell-body">
      <Heading className={nameClass}>
        {mode === 'home' ? (
          <Link href={{ pathname: '/services', hash: offer.id }} className="cell-link">
            {offer.name}
          </Link>
        ) : (
          offer.name
        )}
      </Heading>
      {mode === 'page' ? <p className="cell-muted mt-3 text-[16px] leading-relaxed">{offer.detail}</p> : null}
      {offer.examples.length > 0 ? (
        <p className={`mt-3 leading-snug font-bold ${mode === 'home' ? 'cell-muted text-[15px]' : 'text-[16px]'}`}>
          {offer.examples.join(', ')}
        </p>
      ) : mode === 'home' ? (
        <p className="cell-muted mt-3 text-[15px] leading-snug">{offer.detail}</p>
      ) : null}
    </div>
  )

  return (
    <article
      id={mode === 'page' ? offer.id : undefined}
      data-cell={offer.id}
      data-ground={ground}
      className="cell"
    >
      <Visual id={offer.id} approve={approve} />
      {body}
    </article>
  )
}

export function OfferBento({ locale, mode }: { locale: Locale; mode: 'home' | 'page' }) {
  const { offers } = getSiteContent(locale)
  const approve = getMessages(locale).home.approve
  return (
    <div className="bento">
      {offers.map((offer) => (
        <Cell key={offer.id} offer={offer} mode={mode} approve={approve} Heading={mode === 'home' ? 'h3' : 'h2'} />
      ))}
    </div>
  )
}

/** Home: the services band. Heading, the bento, and the one rule that makes the promise checkable. */
export function OfferCards({ locale }: { locale: Locale }) {
  const messages = getMessages(locale)
  const copy = messages.home

  return (
    <section aria-labelledby="offers-title" className="band sheet ground-tint">
      <div className="shell">
        <div className="reveal flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <h2 id="offers-title" className="headline max-w-[14ch]">
            {copy.servicesHeading}
          </h2>
          <Link href="/services" className="btn-primary">
            {copy.servicesAll}
          </Link>
        </div>
        <div className="mt-10 sm:mt-14">
          <OfferBento locale={locale} mode="home" />
        </div>
        <p className="mt-12 max-w-[34ch] text-[clamp(1.25rem,2.2vw,1.75rem)] leading-snug font-bold tracking-tight">
          {messages.process.rule}
        </p>
      </div>
    </section>
  )
}

/** Services page: the whole range, with the full sentence and the anchors. */
export function OfferList({ locale }: { locale: Locale }) {
  return (
    <section className="band sheet ground-tint" aria-label={getMessages(locale).home.servicesHeading}>
      <div className="shell">
        <OfferBento locale={locale} mode="page" />
      </div>
    </section>
  )
}
