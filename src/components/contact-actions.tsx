import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { ZaloWordmark } from './icons'

/**
 * The ways to reach us, in one place: email as the primary action, Zalo for
 * Vietnam and WhatsApp for everywhere else. They are different doors to the same
 * inbox, so email is styled as primary and the chat apps as secondary.
 */
export function ContactActions({
  locale,
  tone = 'light',
}: {
  locale: Locale
  tone?: 'light' | 'dark'
}) {
  const { social } = getSiteContent(locale)
  const messages = getMessages(locale)
  const zalo = social.find((item) => item.network === 'zalo')
  const whatsapp = social.find((item) => item.network === 'whatsapp')
  const address = social.find((item) => item.network === 'email')?.url ?? 'mailto:hello@canhta.com'
  // Subject and starting lines in the visitor's own language, so the email is
  // already half written in the words they would use.
  const mailto = `${address}?subject=${encodeURIComponent(messages.contact.mailSubject)}&body=${encodeURIComponent(messages.contact.mailBody)}`
  const secondary =
    tone === 'dark'
      ? 'btn-secondary !border-white/40 !bg-transparent !text-white hover:!border-white'
      : 'btn-secondary'

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a href={mailto} className={tone === 'dark' ? 'btn-accent' : 'btn-primary'}>
        {messages.contact.email}
      </a>

      {zalo ? (
        <a href={zalo.url} target="_blank" rel="noreferrer noopener" className={secondary}>
          {messages.contact.chatOn}
          <ZaloWordmark />
          <span className="sr-only">{messages.common.newTab}</span>
        </a>
      ) : null}

      {whatsapp ? (
        <a href={whatsapp.url} target="_blank" rel="noreferrer noopener" className={secondary}>
          {messages.contact.chatOn}
          <span translate="no">WhatsApp</span>
          <span className="sr-only">{messages.common.newTab}</span>
        </a>
      ) : null}
    </div>
  )
}
