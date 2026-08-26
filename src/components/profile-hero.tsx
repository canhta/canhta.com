import Image from 'next/image'
import { builds, profile } from '@/content'
import type { Locale } from '@/content/types'
import { t } from '@/lib/text'
import { HeroShader } from './hero-shader'
import { HeroEvidence } from './hero-evidence'
import { TitleBlock } from './title-block'

const COPY = {
  role: { en: 'Agentic product builder', vi: 'Người xây sản phẩm agentic' },
  leader: { en: 'Shipped, running now', vi: 'Đã ship, đang chạy' },
  keyLive: { en: 'Running', vi: 'Đang chạy' },
  keyPlan: { en: 'On paper', vi: 'Còn trên giấy' },
} as const

/**
 * The three-second hook, set as the head of a drawing sheet.
 *
 * Everything answering "who is this and what do they do" is server-rendered text
 * at frame zero. The sheet grid and paper shader sit behind it; nothing here waits
 * on an animation to become legible.
 */
export function ProfileHero({ locale }: { locale: Locale }) {
  return (
    <section className="relative isolate overflow-hidden">
      <HeroShader />
      <div aria-hidden="true" className="sheet absolute inset-0 opacity-60" />

      <div className="container-sheet relative pt-10 pb-14 md:pt-14">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            {/* Sheet header: who drew this. */}
            <div className="rise flex items-center gap-4 pb-3">
              <Image
                src={profile.avatar}
                alt={`${profile.name}, portrait`}
                width={44}
                height={44}
                priority
                className="h-11 w-11 shrink-0 rounded-full ring-1 ring-rule"
              />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[15px] font-medium tracking-[0.2em] uppercase">
                  {profile.name}
                </p>
                <p className="mt-1 font-mono text-[11px] tracking-[0.1em] text-graphite uppercase">
                  {t(COPY.role, locale).toUpperCase()}
                </p>
              </div>
              {profile.available ? (
                <p className="annot flex shrink-0 items-center gap-1.5 text-live">
                  <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-live" />
                  {t(profile.availabilityLabel, locale).toUpperCase()}
                </p>
              ) : null}
            </div>
            <div aria-hidden="true" className="draw draw-1 h-px bg-ink" />

            <h1 className="wipe mt-10 max-w-[19ch] text-[clamp(2.3rem,4.6vw,3.4rem)] leading-[1.02] font-extrabold tracking-[-0.035em]">
              {t(profile.hook, locale)}
            </h1>

            <p className="rise rise-2 mt-6 max-w-[44ch] text-[17px] leading-relaxed text-graphite">
              {t(profile.supporting, locale)}
            </p>

            <div className="rise rise-3 mt-10">
              <a
                href={profile.ctaHref}
                className="group inline-flex h-12 w-full items-center justify-between gap-6 rounded-none bg-ink px-5 text-paper transition-colors duration-150 hover:bg-live sm:w-auto"
              >
                <span className="font-mono text-[13px] tracking-[0.12em] uppercase">
                  {t(profile.ctaLabel, locale)}
                </span>
                <span aria-hidden="true" className="font-mono text-[13px]">
                  →
                </span>
              </a>
            </div>
          </div>

          <div className="rise rise-4 lg:col-span-4">
            {/* Leader line into the evidence, the way a drawing annotates a part. */}
            <div className="mb-3 flex items-center gap-3">
              <span aria-hidden="true" className="h-px flex-1 bg-rule-strong" />
              <span className="fig-label">{t(COPY.leader, locale)}</span>
            </div>
            <p className="mb-3 flex items-center gap-4">
              <span className="annot flex items-center gap-1.5">
                <span aria-hidden="true" className="inline-block h-2 w-2 bg-live" />
                {t(COPY.keyLive, locale).toUpperCase()}
              </span>
              <span className="annot flex items-center gap-1.5">
                <span aria-hidden="true" className="inline-block h-2 w-2 bg-plan" />
                {t(COPY.keyPlan, locale).toUpperCase()}
              </span>
            </p>
            <HeroEvidence builds={builds} locale={locale} />
          </div>
        </div>
      </div>

      <div className="container-sheet relative pb-16">
        <TitleBlock locale={locale} />
      </div>
    </section>
  )
}
