import { getSiteContent } from '@/content'
import type { Build, Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { statusLabel, statusTone } from '@/lib/status'
import { kindLabel } from '@/lib/build-meta'
import { fetchStars, type Stars } from '@/lib/github'
import { SectionHeading, Fact } from './section'
import { BuildLinkButton } from './build-link'

/**
 * The proof, given equally to every project.
 *
 * WHAT THIS REPLACED. One product got a full "detail drawing" with a
 * seven-column image panel beside it; the rest were rows in a six-column
 * schedule table. Three problems, all structural:
 *
 * - No screenshot exists for any project, so the detail's image panel rendered
 *   as a 500px hatched placeholder — the largest object in the section carried
 *   nothing.
 * - The table was built to scale to thirty products and had two rows in it. A
 *   table with two rows is not a register, it is a layout apologising for
 *   content it does not have.
 * - Splitting four projects into "the good one" and "the others" tells a
 *   visitor which two you are not proud of.
 *
 * Four projects fit as four equal entries, and the shape scales the way a
 * written list scales: the tenth entry costs the same as the second, and nothing
 * has to be demoted to a row to make room. The status word does the ranking that
 * the split used to do, honestly — one is shipped, one is live, two are being
 * built, and it says so.
 */
/**
 * Digits go through `Intl.NumberFormat` so a locale that groups them differently
 * gets its own grouping, and the sentence is chosen with `Intl.PluralRules`
 * rather than an `=== 1` check, which is only ever right for English.
 */
function summary(n: number, locale: Locale): string {
  const tag = locale === 'vi' ? 'vi-VN' : 'en-US'
  const copy = getMessages(locale).work
  if (new Intl.PluralRules(tag).select(n) === 'one') return copy.summaryOne
  return copy.summaryMany.replace('{count}', new Intl.NumberFormat(tag).format(n))
}

function Entry({
  build,
  index,
  locale,
  stars,
}: {
  build: Build
  index: number
  locale: Locale
  stars: Stars
}) {
  const copy = getMessages(locale).work

  return (
    <article className="grid gap-x-10 gap-y-6 border-t border-line py-9 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="flex items-baseline gap-3">
          <span className="label tnum">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="subtitle" translate="no">
            {build.name}
          </h3>
        </div>

        <p className="mt-3 max-w-[40ch] text-[15px] text-muted">{build.tagline}</p>

        {/* Kind, year and status on one line. The status is the only coloured
            word in the entry, and it is a word — colour is never the only
            carrier of it. */}
        <p className="label mt-4 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>{kindLabel(build.kind, locale)}</span>
          {/* The separators are `text-muted`, not the hairline colour. A rule
              can be a hairline because its job is to be felt rather than read;
              a punctuation mark between three words has to be seen, and at
              1.9:1 it was not — axe declined to judge it, which was the tell. */}
          <span aria-hidden="true">·</span>
          <span className="tnum">{build.year}</span>
          <span aria-hidden="true">·</span>
          <span className={statusTone(build.status)}>{statusLabel(build.status, locale)}</span>
        </p>

        {build.links.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {build.links.map((link) => (
              <li key={link.kind}>
                <BuildLinkButton link={link} locale={locale} stars={stars} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <dl className="grid gap-6 text-[15px] leading-snug sm:grid-cols-3 lg:col-span-7 lg:gap-8">
        <Fact label={copy.problem}>{build.problem}</Fact>
        <Fact label={copy.built}>{build.built}</Fact>
        <Fact label={copy.result}>{build.result}</Fact>
      </dl>
    </article>
  )
}

export async function Work({ locale }: { locale: Locale }) {
  const { builds } = getSiteContent(locale)
  if (builds.length === 0) return null
  const copy = getMessages(locale).work

  // Fetched once at build; fails soft to an empty map.
  const stars = await fetchStars(builds)

  return (
    <section className="shell band-1">
      <SectionHeading
        kicker={copy.kicker}
        title={copy.heading}
        sub={summary(builds.length, locale)}
      />

      <div className="mt-10">
        {builds.map((build, i) => (
          <Entry key={build.slug} build={build} index={i} locale={locale} stars={stars} />
        ))}
      </div>
    </section>
  )
}
