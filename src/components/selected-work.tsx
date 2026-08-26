import Image from 'next/image'
import { builds } from '@/content'
import type { Build, Locale } from '@/content/types'
import { t } from '@/lib/text'
import { statusLabel, statusTone } from '@/lib/status'
import { SectionHead } from '@/components/motion/section-head'
import { RevealList } from '@/components/motion/primitives'

const COPY = {
  heading: { en: 'What I have built', vi: 'Tôi đã xây gì' },
  sub: {
    en: 'Few, because each one was taken all the way.',
    vi: 'Ít, vì cái nào cũng làm đến nơi.',
  },
  problem: { en: 'The problem', vi: 'Vấn đề' },
  built: { en: 'What I built', vi: 'Đã xây gì' },
  result: { en: 'What happened', vi: 'Kết quả' },
  open: { en: 'Open', vi: 'Mở' },
} as const

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-rule py-3">
      <dt className="annot">{label.toUpperCase()}</dt>
      <dd className="mt-1 text-[15px] leading-snug">{value}</dd>
    </div>
  )
}

function Story({ build, index, locale }: { build: Build; index: number; locale: Locale }) {
  return (
    <article className="grid gap-8 border-t border-ink pt-6 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-5">
        <div className="flex items-baseline justify-between gap-4">
          <span className="fig-label">
            {String(index + 1).padStart(2, '0')} / {build.slug}
          </span>
          <span className={`annot uppercase ${statusTone(build.status)}`}>
            {statusLabel(build.status, locale)}
          </span>
        </div>
        <h3 className="mt-3 text-[26px] font-extrabold tracking-[-0.03em]">{build.name}</h3>
        <p className="mt-2 max-w-[38ch] text-[16px] leading-snug text-graphite">
          {t(build.tagline, locale)}
        </p>

        <dl className="mt-6">
          <Row label={t(COPY.problem, locale)} value={t(build.problem, locale)} />
          <Row label={t(COPY.built, locale)} value={t(build.built, locale)} />
          <Row label={t(COPY.result, locale)} value={t(build.result, locale)} />
        </dl>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          {build.proof ? (
            <p className="flex items-baseline gap-2">
              <span className="font-mono text-[22px] font-medium text-live">
                {build.proof.value}
              </span>
              <span className="annot">{t(build.proof.label, locale).toUpperCase()}</span>
            </p>
          ) : null}
          {build.url ? (
            <a
              href={build.url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-11 items-center gap-2 font-mono text-[12px] tracking-[0.1em] uppercase underline decoration-rule-strong underline-offset-4 transition-colors duration-150 hover:decoration-ink"
            >
              {t(COPY.open, locale)} {build.name} <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      </div>

      <div className="lg:col-span-7">
        <Image
          src={build.cover}
          alt={`${build.name} interface`}
          width={1200}
          height={750}
          className="w-full rounded-xs border border-rule-strong"
        />
      </div>
    </article>
  )
}

export function SelectedWork({ locale }: { locale: Locale }) {
  if (builds.length === 0) return null

  return (
    <section className="container-sheet py-20 md:py-24">
      <SectionHead fig="FIG. 2" title={t(COPY.heading, locale)} sub={t(COPY.sub, locale)} />

      <RevealList className="mt-12 space-y-16" itemClassName="" stagger={0.09}>
        {builds.map((build, i) => (
          <Story key={build.slug} build={build} index={i} locale={locale} />
        ))}
      </RevealList>
    </section>
  )
}
