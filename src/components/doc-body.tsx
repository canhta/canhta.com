import type { DocLink, DocSection } from '@/content/pages'
import { Link } from '@/i18n/navigation'
import { PAGE_PATH } from '@/lib/metadata'

/**
 * One link from a long page: our own page (resolved to the reader's language)
 * or an outside address, which opens in a new tab. `mailto:` stays in place.
 */
export function DocLinkItem({ link }: { link: DocLink }) {
  const cls = 'link inline-flex min-h-11 items-center font-bold'
  if ('page' in link) {
    return (
      <Link href={PAGE_PATH[link.page]} className={cls}>
        {link.label}
      </Link>
    )
  }
  if (link.url.startsWith('mailto:')) {
    return (
      <a href={link.url} className={cls}>
        {link.label}
      </a>
    )
  }
  return (
    <a href={link.url} target="_blank" rel="noreferrer noopener" className={cls}>
      {link.label}
    </a>
  )
}

export function DocLinks({ links, className = '' }: { links: DocLink[]; className?: string }) {
  return (
    <ul data-no-bar className={`flex flex-wrap gap-x-6 gap-y-1 ${className}`}>
      {links.map((link) => (
        <li key={link.label}>
          <DocLinkItem link={link} />
        </li>
      ))}
    </ul>
  )
}

/**
 * The body of a long page (about, privacy, terms): each section a heading on
 * the left and its text on the right on a desktop, stacked on a phone. Text is
 * kept to a reading measure; no box has a fixed height.
 */
export function DocBody({ sections, updated }: { sections: DocSection[]; updated?: string }) {
  return (
    <section className="band sheet ground-tint">
      <div className="shell">
        {updated ? <p className="mb-10 text-[15px] font-bold text-muted">{updated}</p> : null}
        {sections.map((section) => (
          <article
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-title`}
            className="doc-section reveal grid gap-4 lg:grid-cols-12 lg:gap-12"
          >
            <h2 id={`${section.id}-title`} className="title lg:col-span-4">
              {section.heading}
            </h2>
            <div className="max-w-[64ch] text-[clamp(1rem,0.95rem+0.2vw,1.125rem)] leading-[1.65] lg:col-span-8">
              {section.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {section.items?.length ? (
                <ul className="mt-5 grid">
                  {section.items.map((item) => (
                    <li key={item} className="border-t border-black/15 py-3 font-bold last:border-b">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.links?.length ? <DocLinks links={section.links} className="mt-4" /> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
