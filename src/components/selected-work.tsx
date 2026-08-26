import Image from 'next/image'
import { builds, featuredBuilds } from '@/content'
import type { Build, Locale } from '@/content/types'
import { t } from '@/lib/text'
import { statusLabel, statusTone } from '@/lib/status'
import { kindLabel, linkLabel } from '@/lib/build-meta'
import { SectionHead } from '@/components/motion/section-head'
import { RevealList } from '@/components/motion/primitives'

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
    en: 'Two shown in full. Everything else is in the schedule.',
    vi: 'Hai cái xem chi tiết. Phần còn lại nằm trong bảng kê.',
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
} as const

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
        <h3 className="mt-3 text-[26px] font-extrabold tracking-[-0.03em]">{build.name}</h3>
        <p className="mt-2 max-w-[38ch] text-[16px] leading-snug text-graphite">
          {t(build.tagline, locale)}
        </p>

        {build.proof ? (
          <p className="mt-6 flex items-baseline gap-3">
            <span className="font-mono text-[44px] leading-none font-medium text-live">
              {build.proof.value}
            </span>
            <span className="annot">{t(build.proof.label, locale).toUpperCase()}</span>
          </p>
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
                  className="inline-flex h-11 items-center gap-2 border border-rule px-3 font-mono text-[12px] tracking-[0.1em] uppercase transition-colors duration-150 hover:border-ink"
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

  const details = featuredBuilds.length > 0 ? featuredBuilds : builds.slice(0, 2)

  return (
    <section className="container-sheet py-20 md:py-24">
      <SectionHead fig="FIG. 2" title={t(COPY.heading, locale)} sub={t(COPY.sub, locale)} />

      <RevealList className="mt-12 space-y-16" stagger={0.09}>
        {details.map((build, i) => (
          <Detail key={build.slug} build={build} index={i} locale={locale} />
        ))}
      </RevealList>

      {/* One row per product, whatever the count. This is the part that scales. */}
      <div className="mt-20">
        <div className="flex items-baseline gap-4 border-b border-ink pb-3">
          <span className="fig-label shrink-0">{t(COPY.schedule, locale).toUpperCase()}</span>
          <span className="annot">
            {builds.length} {builds.length === 1 ? 'ITEM' : 'ITEMS'}
          </span>
        </div>

        <table className="w-full border-collapse text-left">
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
            {builds.map((build, i) => (
              <tr key={build.slug} className="group border-b border-rule">
                <td className="annot py-3 pr-4 align-top">
                  {String(i + 1).padStart(2, '0')}
                </td>
                <td className="py-3 pr-4 align-top text-[15px] font-semibold tracking-tight">
                  {build.links[0] ? (
                    <a
                      href={build.links[0].url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="underline decoration-rule-strong underline-offset-4 transition-colors duration-150 hover:decoration-ink"
                    >
                      {build.name} <span aria-hidden="true">↗</span>
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
                <td className="hidden py-3 pr-4 align-top text-[14px] text-graphite sm:table-cell">
                  {kindLabel(build.kind, locale)}
                </td>
                <td className="hidden max-w-[36ch] py-3 pr-4 align-top text-[14px] text-graphite md:table-cell">
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
    </section>
  )
}
