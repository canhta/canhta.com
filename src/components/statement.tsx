import { profile } from '@/content'
import type { Locale } from '@/content/types'
import { t } from '@/lib/text'
import { ContactActions } from './contact-actions'

/**
 * The three-second answer to "who is this and should I write to them", and the
 * whole of it is server-rendered text at frame zero.
 *
 * WHAT THIS REPLACED. The hero used to be an eight/four split whose right column
 * was a stack of three product cards — and because no real screenshot exists,
 * all three rendered as hatched "drawing to follow" panels. Four hundred pixels
 * of the most valuable space on the site carried no information, and the layout
 * was built so that it could not carry any until screenshots existed.
 *
 * So the split is gone. One column, the sentences at the size they deserve, and
 * the proof moved to where a visitor goes looking for it — the work section,
 * where each product carries links they can click to check.
 *
 * THE FACT ROW. This was a six-column bordered table with four cells in it, so
 * the last third of every row was an open box with no bottom edge — visibly
 * broken at every width above 768px. Four facts do not need a table. They are a
 * wrapping row of label/value pairs, which cannot leave a hole no matter how
 * many facts there turn out to be.
 */
export function Statement({ locale }: { locale: Locale }) {
  return (
    <section className="shell pt-10 sm:pt-14">
      {profile.available ? (
        <p className="flex items-center gap-2 text-[13px] font-medium text-accent">
          <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-accent" />
          {t(profile.availabilityLabel, locale)}
        </p>
      ) : null}

      <h1 className="display mt-5 max-w-[17ch]">{t(profile.hook, locale)}</h1>

      <p className="lead mt-7 max-w-[46ch]">{t(profile.supporting, locale)}</p>

      <div className="mt-9">
        <ContactActions locale={locale} />
      </div>

      <dl className="mt-14 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-6">
        {profile.spec.map((row) => (
          <div key={row.label.en}>
            <dt className="label">{t(row.label, locale)}</dt>
            <dd className="mt-1 text-[15px] font-medium">{t(row.value, locale)}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
