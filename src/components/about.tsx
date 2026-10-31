import type { CSSProperties } from 'react'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'

/**
 * Who is behind the page, in the one sentence we can stand behind and no names
 * or numbers we cannot show. It is set large on its own white band, and its
 * words fill in from grey to ink as the band scrolls past. The text is
 * readable at every moment (the grey is 4.0:1 on white and the type is large
 * bold), and without scroll-driven animation it is simply ink.
 */
export function About({ locale }: { locale: Locale }) {
  const copy = getMessages(locale).about
  const words = copy.proof.split(' ')

  return (
    <section aria-labelledby="about-title" className="band sheet ground-white">
      <div className="shell grid gap-6 lg:grid-cols-12 lg:gap-14">
        <h2 id="about-title" className="subtitle lg:col-span-3">
          {copy.heading}
        </h2>
        <p className="statement max-w-[26ch] text-[clamp(1.75rem,4.2vw,3.5rem)] leading-[1.15] font-extrabold tracking-[-0.035em] lg:col-span-9">
          {words.map((word, i) => (
            <span key={i} className="w" style={{ '--s': `${((i / words.length) * 40).toFixed(1)}%` } as CSSProperties}>
              {word}
              {i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
