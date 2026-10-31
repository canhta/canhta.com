import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { SectionHeading } from './section'

/**
 * Home: business systems (the core of the work) shown large, the other
 * capabilities as a plain list. The groups are not equal in weight, so they are
 * not equal cards. Each tile lands on its own group on the services page.
 */
export function OfferCards({ locale }: { locale: Locale }) {
  const { offers } = getSiteContent(locale)
  const messages = getMessages(locale)
  const copy = messages.home
  const [lead, ...rest] = offers
  if (!lead) return null

  return (
    <section aria-labelledby="offers-title" className="shell band-1 reveal">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading id="offers-title" title={copy.servicesHeading} />
        <Link href="/services" className="btn-secondary">
          {copy.servicesAll}
        </Link>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-10">
        <Link
          href={{ pathname: '/services', hash: lead.id }}
          className="card lg:col-span-6 lg:p-9"
          style={{ background: 'var(--color-tint)', borderColor: 'transparent' }}
        >
          <Image
            src="/art/service-process.svg"
            alt=""
            width={480}
            height={360}
            className="mb-6 h-auto w-full max-w-[420px]"
          />
          <h3 className="title max-w-[18ch]">{lead.name}</h3>
          <p className="mt-3 text-[17px] leading-relaxed">{lead.detail}</p>
          <p className="mt-4 text-[15px] font-bold">{lead.examples.join(', ')}</p>
        </Link>

        <ul className="lg:col-span-6">
          {rest.map((offer) => (
            <li key={offer.id} className="border-t-2 border-ink py-5">
              <Link href={{ pathname: '/services', hash: offer.id }} className="block hover:text-brand">
                <h3 className="subtitle">{offer.name}</h3>
                {offer.examples.length > 0 ? (
                  <p className="mt-1 text-[15px] leading-snug text-muted">{offer.examples.join(', ')}</p>
                ) : (
                  <p className="mt-1 text-[15px] leading-snug text-muted">{offer.detail}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-10 max-w-[48ch] text-[20px] leading-snug font-bold">{messages.process.rule}</p>
    </section>
  )
}

/**
 * Services page: the whole range, grouped. A buyer scanning for "ERP", "CRM" or
 * "chatbot" finds the word, with a plain sentence about what it means.
 */
export function OfferList({ locale }: { locale: Locale }) {
  const { offers } = getSiteContent(locale)
  const [lead, ...rest] = offers

  return (
    <div className="shell band-2">
      {lead ? (
        <section
          id={lead.id}
          className="reveal grid items-center gap-6 border-t-2 border-ink py-8 lg:grid-cols-12 lg:gap-12"
        >
          <Image
            src="/art/service-process.svg"
            alt=""
            width={480}
            height={360}
            className="h-auto w-full max-w-[420px] lg:col-span-5"
          />
          <div className="lg:col-span-7">
            <h2 className="title max-w-[22ch]">{lead.name}</h2>
            <p className="mt-4 max-w-[52ch] text-[18px] leading-relaxed">{lead.detail}</p>
            <p className="mt-4 text-[17px] font-bold">{lead.examples.join(', ')}</p>
          </div>
        </section>
      ) : null}

      <div className="grid gap-x-12 md:grid-cols-2">
        {rest.map((offer) => (
          <section key={offer.id} id={offer.id} className="reveal border-t-2 border-ink py-8">
            <h2 className="subtitle text-[1.35rem]">{offer.name}</h2>
            <p className="mt-3 max-w-[46ch] text-[16px] leading-relaxed">{offer.detail}</p>
            {offer.examples.length > 0 ? (
              <p className="mt-3 text-[16px] font-bold">{offer.examples.join(', ')}</p>
            ) : null}
          </section>
        ))}
      </div>
    </div>
  )
}
