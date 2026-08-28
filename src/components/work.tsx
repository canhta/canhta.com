import { builds } from '@/content'
import type { Build, Locale } from '@/content/types'
import { t } from '@/lib/text'
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
 * - Splitting three projects into "the good one" and "the others" tells a
 *   visitor which two you are not proud of.
 *
 * Three projects fit as three equal entries, and the shape scales the way a
 * written list scales: the tenth entry costs the same as the second, and nothing
 * has to be demoted to a row to make room. The status word does the ranking that
 * the split used to do, honestly — one is shipped, two are being built, and it
 * says so.
 */
const COPY = {
  kicker: { en: 'Work', vi: 'Sản phẩm' },
  heading: { en: 'What I have built', vi: 'Tôi đã xây gì' },
  problem: { en: 'The problem', vi: 'Vấn đề' },
  built: { en: 'What I built', vi: 'Đã xây gì' },
  result: { en: 'Where it stands', vi: 'Hiện tại ra sao' },
  subOne: {
    en: 'One project. The ones with links are public; the rest are still being built.',
    vi: 'Một dự án. Cái nào có liên kết là đã công khai, còn lại vẫn đang xây.',
  },
  subMany: {
    en: 'projects. The ones with links are public; the rest are still being built.',
    vi: 'dự án. Cái nào có liên kết là đã công khai, còn lại vẫn đang xây.',
  },
} as const

/**
 * Digits go through `Intl.NumberFormat` so a locale that groups them differently
 * gets its own grouping, and the sentence is chosen with `Intl.PluralRules`
 * rather than an `=== 1` check, which is only ever right for English.
 */
function summary(n: number, locale: Locale): string {
  const tag = locale === 'vi' ? 'vi-VN' : 'en-US'
  if (new Intl.PluralRules(tag).select(n) === 'one') return t(COPY.subOne, locale)
  return `${new Intl.NumberFormat(tag).format(n)} ${t(COPY.subMany, locale)}`
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
  return (
    <article className="grid gap-x-10 gap-y-6 border-t border-line py-9 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="flex items-baseline gap-3">
          <span className="label tnum">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="subtitle" translate="no">
            {build.name}
          </h3>
        </div>

        <p className="mt-3 max-w-[40ch] text-[15px] text-muted">{t(build.tagline, locale)}</p>

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
        <Fact label={t(COPY.problem, locale)}>{t(build.problem, locale)}</Fact>
        <Fact label={t(COPY.built, locale)}>{t(build.built, locale)}</Fact>
        <Fact label={t(COPY.result, locale)}>{t(build.result, locale)}</Fact>
      </dl>
    </article>
  )
}

export async function Work({ locale }: { locale: Locale }) {
  if (builds.length === 0) return null

  // Fetched once at build; fails soft to an empty map.
  const stars = await fetchStars(builds)

  return (
    <section className="shell band-1">
      <SectionHeading
        kicker={t(COPY.kicker, locale)}
        title={t(COPY.heading, locale)}
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
