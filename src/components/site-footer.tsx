import { Link } from '@/i18n/navigation'
import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { mailContact } from '@/lib/contact'
import { GitHubIcon, LinkedInIcon, MailTile, WhatsAppTile, XIcon, ZaloTile } from './icons'
import { LangSwitch } from './lang-switch'

/**
 * The colophon, on the night ground. The email address is the headline action
 * with the one button beside it. Under it, three columns that share a baseline:
 * the pages, the three ways to chat (email, Zalo, WhatsApp, each a brand logo
 * tile with its visible label), and where to check we are real. The bottom bar
 * carries the copyright on the left and the language switch on the right.
 */
const ELSEWHERE = [
  { network: 'github', label: 'GitHub', Icon: GitHubIcon },
  { network: 'x', label: 'X', Icon: XIcon },
  { network: 'linkedin', label: 'LinkedIn', Icon: LinkedInIcon },
] as const

export function SiteFooter({ locale }: { locale: Locale }) {
  const { profile, social } = getSiteContent(locale)
  const messages = getMessages(locale)
  const mail = mailContact(locale)
  const zalo = social.find((s) => s.network === 'zalo')
  const whatsapp = social.find((s) => s.network === 'whatsapp')
  const elsewhere = ELSEWHERE.flatMap((e) => {
    const link = social.find((s) => s.network === e.network)
    return link ? [{ ...e, url: link.url }] : []
  })
  const year = new Date().getFullYear()
  const newTab = messages.common.newTab

  return (
    <footer data-no-bar className="sheet ground-night on-night pt-[calc(var(--space)*0.8)] pb-8">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-[14px] font-bold text-dim">{messages.footer.write}</p>
            <a
              href={mail.href}
              className="inline-block min-h-11 text-[clamp(1.75rem,5.6vw,4.75rem)] leading-[1.1] font-extrabold tracking-[-0.04em] break-all text-white underline decoration-accent decoration-[3px] underline-offset-[0.18em] transition-colors hover:decoration-white active:opacity-70 sm:break-normal"
              translate="no"
            >
              {mail.address}
            </a>
          </div>
          <Link href="/contact" className="btn-accent self-start lg:mb-2 lg:self-auto">
            {profile.headerCta}
          </Link>
        </div>

        <div className="mt-14 grid gap-10 border-t border-white/25 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          <nav aria-label={messages.footer.explore}>
            <p className="text-[14px] font-bold text-dim">{messages.footer.explore}</p>
            <ul className="mt-3 grid justify-items-start gap-0.5">
              {(
                [
                  ['/', messages.nav.home],
                  ['/services', messages.nav.services],
                  ['/products', messages.nav.products],
                  ['/contact', messages.nav.contact],
                ] as const
              ).map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="foot-row">
                    <span className="foot-label">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[14px] font-bold text-dim">{messages.contact.channels}</p>
            <ul className="mt-3 grid justify-items-start gap-0.5">
              <li>
                <a href={mail.href} className="foot-row">
                  <MailTile size={36} tone="light" />
                  <span className="foot-label">{messages.contact.email}</span>
                </a>
              </li>
              {zalo ? (
                <li>
                  <a href={zalo.url} target="_blank" rel="noreferrer noopener" className="foot-row">
                    <ZaloTile size={36} />
                    <span className="foot-label">
                      {messages.contact.chatOn} <span translate="no">Zalo</span>
                    </span>
                    <span className="sr-only">({newTab})</span>
                  </a>
                </li>
              ) : null}
              {whatsapp ? (
                <li>
                  <a href={whatsapp.url} target="_blank" rel="noreferrer noopener" className="foot-row">
                    <WhatsAppTile size={36} />
                    <span className="foot-label">
                      {messages.contact.chatOn} <span translate="no">WhatsApp</span>
                    </span>
                    <span className="sr-only">({newTab})</span>
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <div>
            <p className="text-[14px] font-bold text-dim">{messages.footer.elsewhere}</p>
            <ul className="mt-3 grid justify-items-start gap-0.5">
              {elsewhere.map(({ network, label, Icon, url }) => (
                <li key={network}>
                  <a href={url} target="_blank" rel="noreferrer noopener" className="foot-row">
                    <span className="foot-glyph">
                      <Icon width={20} height={20} />
                    </span>
                    <span className="foot-label" translate="no">{label}</span>
                    <span className="sr-only">({newTab})</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          <p className="text-[14px] text-dim">
            © {year} <span translate="no">{profile.name}</span>
          </p>
          <LangSwitch locale={locale} label={messages.nav.language} tone="night" />
        </div>
      </div>
    </footer>
  )
}
