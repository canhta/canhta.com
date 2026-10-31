import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'

/**
 * Our email address and a `mailto:` link whose subject and body are written in
 * the visitor's language. One builder for every place that links to our email,
 * so none of them opens a blank message.
 */
/** Our phone number as a `tel:` link and a readable number. */
export function phoneContact(locale: Locale) {
  const { social } = getSiteContent(locale)
  const link = social.find((s) => s.network === 'phone')?.url ?? 'tel:+84825252599'
  const digits = link.replace('tel:+84', '')
  return { href: link, display: `0${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}` }
}

export function mailContact(locale: Locale) {
  const { social } = getSiteContent(locale)
  const { contact } = getMessages(locale)
  const link = social.find((s) => s.network === 'email')?.url ?? 'mailto:hello@canhta.com'
  return {
    address: link.replace('mailto:', ''),
    href: `${link}?subject=${encodeURIComponent(contact.mailSubject)}&body=${encodeURIComponent(contact.mailBody)}`,
  }
}
