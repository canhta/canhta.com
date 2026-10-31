import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { mailContact, phoneContact } from '@/lib/contact'
import { ContactBarView, type BarItem } from './contact-bar-view'

/**
 * Phones only (hidden from 768px up by CSS): the ways to reach us, one
 * tap away on every page. The email link is the same localized `mailto:` the
 * footer and the contact page use.
 */
export function ContactBar({ locale }: { locale: Locale }) {
  const { social } = getSiteContent(locale)
  const messages = getMessages(locale)
  const mail = mailContact(locale)
  const phone = phoneContact(locale)
  const zalo = social.find((s) => s.network === 'zalo')
  const whatsapp = social.find((s) => s.network === 'whatsapp')
  const note = `(${messages.common.newTab})`

  const items: BarItem[] = [
    { key: 'phone', label: messages.contact.callShort, href: phone.href, external: false },
    { key: 'email', label: 'Email', href: mail.href, external: false },
    ...(zalo ? [{ key: 'zalo', label: 'Zalo', href: zalo.url, external: true, note }] : []),
    ...(whatsapp ? [{ key: 'whatsapp', label: 'WhatsApp', href: whatsapp.url, external: true, note }] : []),
  ]

  return <ContactBarView label={messages.contact.barLabel} items={items} />
}
