import Image from 'next/image'
import { builds, featuredBuilds } from '@/content'
import type { Build, Locale } from '@/content/types'
import { t } from '@/lib/text'
import { statusLabel, statusTone } from '@/lib/status'
import { kindLabel, linkLabel } from '@/lib/build-meta'
import { SectionHead } from '@/components/motion/section-head'
import { ProofStamp } from '@/components/proof-stamp'

/**
 * Detail drawings plus a schedule — the way a real drawing sheet handles a set
 * that will not fit as full views.
 *
 * Stacking every product vertically costs a viewport each and scales badly: at
 * ten products the page becomes an endless scroll and each one gets *less*
 * attention, not more. So two get a full detail, and every product — however
 * many there are — appears in the schedule table below at a fixed cost of one
 * row each.
 */

const COPY = {
  heading: { en: 'What I have built', vi: 'Tôi đã xây gì' },
  sub: {
    en: 'One shown in full. Everything else is in the schedule.',
    vi: 'Một cái xem chi tiết. Phần còn lại nằm trong bảng kê.',
  },
  problem: { en: 'The problem', vi: 'Vấn đề' },
  built: { en: 'What I built', vi: 'Đã xây gì' },
  result: { en: 'What happened', vi: 'Kết quả' },
  open: { en: 'Open', vi: 'Mở' },
  schedule: { en: 'Schedule', vi: 'Bảng kê' },
  colRef: { en: 'Ref', vi: 'Mã' },
  colName: { en: 'Name', vi: 'Tên' },
  colKind: { en: 'Kind', vi: 'Loại' },
  colYear: { en: 'Year', vi: 'Năm' },
  colStatus: { en: 'Status', vi: 'Trạng thái' },
  colResult: { en: 'Result', vi: 'Kết quả' },
  caption: {
    en: 'Every product, one row each: reference, name, kind, result, year and status.',
    vi: 'Mỗi sản phẩm một dòng: mã, tên, loại, kết quả, năm và trạng thái.',
  },
  itemOne: { en: 'item', vi: 'mục' },
  itemMany: { en: 'items', vi: 'mục' },
} as const

/**
 * The count was previously `${n} ITEM(S)` in English on both routes. Digits go
 * through `Intl.NumberFormat` so a locale that groups them differently gets its
 * own grouping, and the noun goes through `Intl.PluralRules` rather than an
 * `=== 1` check, which is only ever right for English.
 */
function itemCount(n: number, locale: Locale): string {
  const tag = locale === 'vi' ? 'vi-VN' : 'en-US'
  const digits = new Intl.NumberFormat(tag).format(n)
  const plural = new Intl.PluralRules(tag).select(n)
  return `${digits} ${t(plural === 'one' ? COPY.itemOne : COPY.itemMany, locale)}`
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-rule py-3">
      <dt className="annot">{label.toUpperCase()}</dt>
      <dd className="mt-1 text-[15px] leading-snug">{value}</dd>
    </div>
  )
}

function Detail({ build, index, locale }: { build: Build; index: number; locale: Locale }) {
  return (
    <article className="grid gap-8 border-t border-ink pt-6 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-5">
        <div className="flex items-baseline justify-between gap-4">
          <span className="fig-label">
            DETAIL {String(index + 1).padStart(2, '0')} / {build.slug}
          </span>
          <span className={`annot uppercase ${statusTone(build.status)}`}>
            {statusLabel(build.status, locale)}
          </span>
        </div>
        <h3 className="mt-3 text-[20px] font-extrabold tracking-[-0.03em]" translate="no">
          {build.name}
        </h3>
        <p className="mt-2 max-w-[38ch] text-[15px] leading-snug text-graphite">
          {t(build.tagline, locale)}
        </p>

        {/* `ease.stamp` used to be spent on 11px figure references, where a
            110ms attack and a 0.8px blur are imperceptible. This is the only
            place on the page where "running for real" appears at a size a person
            can actually see, so the stamp belongs here — once, on the one detail.
            `tnum` is already set, so nothing reflows. */}
        {build.proof ? (
          <ProofStamp value={build.proof.value} label={t(build.proof.label, locale)} />
        ) : null}

        <dl className="mt-6">
          <Row label={t(COPY.problem, locale)} value={t(build.problem, locale)} />
          <Row label={t(COPY.built, locale)} value={t(build.built, locale)} />
          <Row label={t(COPY.result, locale)} value={t(build.result, locale)} />
        </dl>

        {build.links.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {build.links.map((link) => (
              <li key={link.kind}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-11 items-center gap-2 border border-rule px-3 font-mono text-[11px] tracking-[0.1em] uppercase transition-colors duration-150 hover:border-ink"
                >
                  {linkLabel(link.kind, locale)} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="lg:col-span-7">
        <Image
          src={build.cover}
          alt={`${build.name} interface`}
          width={1200}
          height={750}
          className="w-full rounded-none border border-rule-strong"
        />
      </div>
    </article>
  )
}

export function SelectedWork({ locale }: { locale: Locale }) {
  if (builds.length === 0) return null

  /**
   * One full detail, not two. Two is a false plural — it is not a portfolio, and
   * the second detail is always the weaker one. One drawing plus the register is
   * the honest structure for a handful of products, and it is what this section
   * already claims to be.
   */
  const details = (featuredBuilds.length > 0 ? featuredBuilds : builds).slice(0, 1)

  /**
   * The schedule lists what is NOT shown in full. It used to iterate every build,
   * so each featured product's `result` string rendered twice on the page — once
   * in its detail and again three hundred pixels below in the table.
   */
  const detailSlugs = new Set(details.map((b) => b.slug))
  const scheduled = builds.filter((b) => !detailSlugs.has(b.slug))

  return (
    <section className="container-sheet figure-primary">
      <SectionHead fig="FIG. 2" title={t(COPY.heading, locale)} sub={t(COPY.sub, locale)} />

      <div className="mt-12">
        {details.map((build, i) => (
          <Detail key={build.slug} build={build} index={i} locale={locale} />
        ))}
      </div>

      {/* One row per product, whatever the count. This is the part that scales. */}
      <div className="mt-20">
        <div className="flex items-baseline gap-4 border-b border-ink pb-3">
          <span className="fig-label shrink-0">{t(COPY.schedule, locale).toUpperCase()}</span>
          <span className="annot uppercase">{itemCount(scheduled.length, locale)}</span>
        </div>

        {/* The table is the one element on the sheet that legitimately outgrows a
            360px viewport, so it scrolls inside its own box rather than making the
            whole document scroll sideways. */}
        <div
          role="region"
          aria-label={t(COPY.schedule, locale)}
          tabIndex={0}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[520px] border-collapse text-left">
            <caption className="sr-only">{t(COPY.caption, locale)}</caption>
            <thead>
              <tr className="border-b border-rule">
              <th scope="col" className="annot py-2 pr-4 font-normal">
                {t(COPY.colRef, locale).toUpperCase()}
              </th>
              <th scope="col" className="annot py-2 pr-4 font-normal">
                {t(COPY.colName, locale).toUpperCase()}
              </th>
              <th scope="col" className="annot hidden py-2 pr-4 font-normal sm:table-cell">
                {t(COPY.colKind, locale).toUpperCase()}
              </th>
              <th scope="col" className="annot hidden py-2 pr-4 font-normal md:table-cell">
                {t(COPY.colResult, locale).toUpperCase()}
              </th>
              <th scope="col" className="annot py-2 pr-4 font-normal">
                {t(COPY.colYear, locale).toUpperCase()}
              </th>
              <th scope="col" className="annot py-2 text-right font-normal">
                {t(COPY.colStatus, locale).toUpperCase()}
              </th>
            </tr>
          </thead>
          <tbody>
            {scheduled.map((build, i) => (
              <tr key={build.slug} className="group border-b border-rule">
                <td className="annot py-3 pr-4 align-top">
                  {String(i + 1 + details.length).padStart(2, '0')}
                </td>
                <td className="py-3 pr-4 align-top text-[15px] tracking-tight break-words">
                  {build.links[0] ? (
                    <a
                      href={build.links[0].url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="underline decoration-rule-strong underline-offset-4 transition-colors duration-150 hover:decoration-ink"
                    >
                      <span translate="no">{build.name}</span>{' '}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    build.name
                  )}
                  {build.links.length > 1 ? (
                    <span className="annot ml-2 normal-case">
                      +{build.links.length - 1}
                    </span>
                  ) : null}
                </td>
                <td className="hidden py-3 pr-4 align-top text-[15px] text-graphite sm:table-cell">
                  {kindLabel(build.kind, locale)}
                </td>
                <td className="hidden max-w-[36ch] py-3 pr-4 align-top text-[15px] text-graphite md:table-cell">
                  {t(build.result, locale)}
                </td>
                <td className="annot py-3 pr-4 align-top">{build.year}</td>
                <td
                  className={`annot py-3 text-right align-top uppercase ${statusTone(build.status)}`}
                >
                  {statusLabel(build.status, locale)}
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
