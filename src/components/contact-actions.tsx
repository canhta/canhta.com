import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { mailContact } from '@/lib/contact'
import { MailTile, WhatsAppTile, ZaloTile } from './icons'

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
  const mail = mailContact(locale)

  return (
    <div className="rows" data-no-bar>
      <a href={mail.href} className="row-link" data-primary="true">
        <span className="row-main">
          <MailTile size={48} tone="auto" />
          <span>{messages.contact.email}</span>
        </span>
        <small translate="no">{mail.address}</small>
      </a>

      {zalo ? (
        <a href={zalo.url} target="_blank" rel="noreferrer noopener" className="row-link">
          <span className="row-main">
            <ZaloTile size={48} />
            <span>
              {messages.contact.chatOn} <span translate="no">Zalo</span>
            </span>
          </span>
          <span className="sr-only">{messages.common.newTab}</span>
        </a>
      ) : null}

      {whatsapp ? (
        <a href={whatsapp.url} target="_blank" rel="noreferrer noopener" className="row-link">
          <span className="row-main">
            <WhatsAppTile size={48} />
            <span>
              {messages.contact.chatOn} <span translate="no">WhatsApp</span>
            </span>
          </span>
          <span className="sr-only">{messages.common.newTab}</span>
        </a>
      ) : null}
    </div>
  )
}
