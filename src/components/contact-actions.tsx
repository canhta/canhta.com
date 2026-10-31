import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { mailContact, phoneContact, whatsappContact } from '@/lib/contact'
import { MailTile, PhoneTile, WhatsAppTile, ZaloTile } from './icons'

/**
 * The ways to reach us, as big tappable rows: phone call, email, Zalo and WhatsApp.
 * They are different doors to the same inbox. The rows take their colours from
 * the band they sit in (dark rows on lime or a light band, light rows on a dark band;
 * see `.row-link` in globals.css). The email subject and body are written in the
 * visitor's language.
 */
export function ContactActions({ locale }: { locale: Locale }) {
  const { social } = getSiteContent(locale)
  const messages = getMessages(locale)
  const zalo = social.find((item) => item.network === 'zalo')
  const whatsapp = whatsappContact(locale)
  const mail = mailContact(locale)
  const phone = phoneContact(locale)

  return (
    <div className="rows" data-no-bar>
      <a href={phone.href} className="row-link" data-cursor="open" data-primary="true">
        <span className="row-main">
          <PhoneTile size={48} tone="auto" />
          <span>{messages.contact.call}</span>
        </span>
        <small translate="no">{phone.display}</small>
      </a>

      <a href={mail.href} className="row-link" data-cursor="open">
        <span className="row-main">
          <MailTile size={48} tone="auto" />
          <span>{messages.contact.email}</span>
        </span>
        <small translate="no">{mail.address}</small>
      </a>

      {zalo ? (
        <a href={zalo.url} target="_blank" rel="noreferrer noopener" className="row-link" data-cursor="open">
          <span className="row-main">
            <ZaloTile size={48} />
            <span>
              {messages.contact.chatOn} <span translate="no">Zalo</span>
            </span>
          </span>
        </a>
      ) : null}

      {whatsapp ? (
        <a href={whatsapp.href} target="_blank" rel="noreferrer noopener" className="row-link" data-cursor="open">
          <span className="row-main">
            <WhatsAppTile size={48} />
            <span>
              {messages.contact.chatOn} <span translate="no">WhatsApp</span>
            </span>
          </span>
        </a>
      ) : null}
    </div>
  )
}
