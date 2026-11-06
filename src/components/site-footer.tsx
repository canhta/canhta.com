import { Link } from '@/i18n/navigation'
import { Logo } from './logo'
import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { mailContact } from '@/lib/contact'
import { getPages } from '@/lib/pages'
import { GitHubIcon, LinkedInIcon, XIcon } from './icons'
import { LangSwitch } from './lang-switch'

/**
 * The colophon, on the night ground. The email address is the headline action.
 * Under it, two columns: the pages, and where to check we are real. The call,
 * Zalo and WhatsApp rows live once, in the closing band or on the contact page,
 * not again here. The bottom bar
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
  const elsewhere = ELSEWHERE.flatMap((e) => {
    const link = social.find((s) => s.network === e.network)
    return link ? [{ ...e, url: link.url }] : []
  })
  const year = new Date().getFullYear()

  return (
    <footer data-no-bar className="sheet ground-night on-night pt-[calc(var(--space)*0.8)] pb-8">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-[14px] font-bold text-dim">{messages.footer.write}</p>
            <a
              href={mail.href}
              className="inline-block min-h-11 text-[clamp(1.5rem,0.6rem+2.6vw,3rem)] leading-[1.12] font-bold tracking-[-0.03em] break-all text-white underline decoration-accent decoration-[3px] underline-offset-[0.18em] transition-colors hover:decoration-white active:opacity-70 sm:break-normal"
              translate="no"
            >
              {mail.address}
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-white/25 pt-10 sm:grid-cols-2">
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
            <p className="text-[14px] font-bold text-dim">{messages.footer.elsewhere}</p>
            <ul className="mt-3 grid justify-items-start gap-0.5">
              {elsewhere.map(({ network, label, Icon, url }) => (
                <li key={network}>
                  <a href={url} target="_blank" rel="noreferrer noopener" className="foot-row">
                    <span className="foot-glyph">
                      <Icon width={20} height={20} />
                    </span>
                    <span className="foot-label" translate="no">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          <p className="flex items-center gap-3 text-[14px] text-dim">
            <Logo size={32} />
            <span>
              © {year} <span translate="no">{profile.name}</span>
            </span>
          </p>
          <LangSwitch locale={locale} label={messages.nav.language} pages={getPages()} tone="night" />
        </div>
      </div>
    </footer>
  )
}
