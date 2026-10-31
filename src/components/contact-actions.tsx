import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { ZaloWordmark } from './icons'

/**
 * The ways to reach us, as three big tappable rows: email, Zalo and WhatsApp.
 * They are different doors to the same inbox. The rows take their colours from
 * the band they sit in (dark rows on lime or a light band, light rows on a dark band;
 * see `.row-link` in globals.css). The email subject and body are written in the
 * visitor's language.
 */
export function ContactActions({ locale }: { locale: Locale }) {
  const { social } = getSiteContent(locale)
  const messages = getMessages(locale)
  const zalo = social.find((item) => item.network === 'zalo')
  const whatsapp = social.find((item) => item.network === 'whatsapp')
  const address = social.find((item) => item.network === 'email')?.url ?? 'mailto:hello@canhta.com'
  const mailto = `${address}?subject=${encodeURIComponent(messages.contact.mailSubject)}&body=${encodeURIComponent(messages.contact.mailBody)}`

  return (
    <div className="rows">
      <a href={mailto} className="row-link" data-primary="true">
        <span>{messages.contact.email}</span>
        <small translate="no">{address.replace('mailto:', '')}</small>
      </a>

      {zalo ? (
        <a href={zalo.url} target="_blank" rel="noreferrer noopener" className="row-link">
          <span>{messages.contact.chatOn}</span>
          <ZaloWordmark height={22} width={60} />
          <span className="sr-only">Zalo, {messages.common.newTab}</span>
        </a>
      ) : null}

      {whatsapp ? (
        <a href={whatsapp.url} target="_blank" rel="noreferrer noopener" className="row-link">
          <span>{messages.contact.chatOn}</span>
          <span translate="no">WhatsApp</span>
          <span className="sr-only">{messages.common.newTab}</span>
        </a>
      ) : null}
    </div>
  )
}
