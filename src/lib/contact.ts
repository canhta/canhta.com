import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'

/**
 * Our email address and a `mailto:` link whose subject and body are written in
 * the visitor's language. One builder for every place that links to our email,
 * so none of them opens a blank message.
 */
/**
 * Our phone number as a `tel:` link and a readable number: local format for
 * Vietnamese readers, international for English readers.
 */
export function phoneContact(locale: Locale) {
  const { social } = getSiteContent(locale)
  const link = social.find((s) => s.network === 'phone')?.url ?? 'tel:+84825252599'
  const digits = link.replace('tel:+84', '')
  const groups = `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
  return { href: link, display: locale === 'vi' ? `0${groups}` : `+84 ${groups}` }
}

/** The WhatsApp link, opening a chat that already says hello in the visitor's language. */
export function whatsappContact(locale: Locale) {
  const { social } = getSiteContent(locale)
  const url = social.find((s) => s.network === 'whatsapp')?.url
  if (!url) return null
  return { href: `${url}?text=${encodeURIComponent(getMessages(locale).contact.chatText)}` }
}

export function mailContact(locale: Locale) {
  const { social } = getSiteContent(locale)
  const { contact } = getMessages(locale)
  const link = social.find((s) => s.network === 'email')?.url ?? 'mailto:hello@canhta.com'
  return {
    address: link.replace('mailto:', ''),
    // RFC 6068: a line break in a mailto body is CRLF (%0D%0A), not a bare %0A.
    href: `${link}?subject=${encodeURIComponent(contact.mailSubject)}&body=${encodeURIComponent(contact.mailBody.replace(/\r?\n/g, '\r\n'))}`,
  }
}
