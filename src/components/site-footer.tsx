import { Link } from '@/i18n/navigation'
import { Logo } from './logo'
import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { getPages } from '@/lib/pages'
import { GitHubIcon, LinkedInIcon, XIcon } from './icons'
import { LangSwitch } from './lang-switch'

/**
 * The colophon, on the night ground: the pages, and where to check we are
 * real. Every way to reach us (call, email, Zalo, WhatsApp) lives once, in the
 * closing band or on the contact page, not again here. The bottom bar
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
  const elsewhere = ELSEWHERE.flatMap((e) => {
    const link = social.find((s) => s.network === e.network)
    return link ? [{ ...e, url: link.url }] : []
  })
  const year = new Date().getFullYear()

  return (
    <footer data-no-bar className="sheet ground-night on-night pt-[calc(var(--space)*0.6)] pb-6 sm:pt-[calc(var(--space)*0.8)] sm:pb-8">
      <div className="shell">
        <div className="grid grid-cols-2 gap-6 sm:gap-10">
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

        <div className="mt-6 flex items-center justify-between gap-4 sm:mt-10">
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
