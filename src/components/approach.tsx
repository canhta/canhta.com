'use client'

import { useId, useState } from 'react'
import type { Locale, LocalizedText } from '@/content/types'
import { t } from '@/lib/text'
import { SectionHeading } from './section'

/**
 * The one interaction on the site, and the one claim worth arguing about: where
 * you put the line between "planned" and "running" is most of the difference
 * between one builder and another.
 *
 * WHAT THIS REPLACED. A 1000x360 SVG the visitor dragged a draughtsman's section
 * line across. It was a good idea with one fatal property: below 1024px the SVG
 * was hidden entirely and replaced by a vertical list plus a *horizontal* slider
 * strip underneath it. The whole point is spatial — right of the line is
 * running, left of it is on paper — and on a phone, where most visitors are, the
 * steps ran down the screen while the control ran across it. The metaphor did
 * not survive the breakpoint, so the majority of visitors met a bare slider
 * attached to a list for no visible reason.
 *
 * WHAT IT IS NOW. The same argument, as a native radio group. Four choices for
 * where the line goes; the steps past it are marked running. Radios cost nothing
 * to make accessible — arrow keys, screen-reader announcement and touch targets
 * are all free and correct — and one layout serves every width, so the phone
 * gets the real thing rather than a fallback.
 *
 * The interaction survives; the fragile mechanism does not.
 */

interface Stage {
  id: string
  label: LocalizedText
  detail: LocalizedText
}

/**
 * Written for someone who does not build software. "In your own words" rather
 * than "messy is fine" — the second one names the visitor's problem as the mess,
 * and the reader is the person who built that process.
 */
const STAGES: Stage[] = [
  {
    id: 'problem',
    label: { en: 'You bring a problem', vi: 'Bạn kể vấn đề' },
    detail: { en: 'In your own words.', vi: 'Bằng lời của bạn.' },
  },
  {
    id: 'agree',
    label: { en: 'We agree what to build', vi: 'Chốt việc cần làm' },
    detail: { en: 'Small and specific.', vi: 'Nhỏ và cụ thể.' },
  },
  {
    id: 'build',
    label: { en: 'I build, you check', vi: 'Tôi xây, bạn duyệt' },
    detail: { en: 'You see it as it grows.', vi: 'Bạn xem từng phần một.' },
  },
  {
    id: 'live',
    label: { en: 'It goes live', vi: 'Đưa vào chạy thật' },
    detail: { en: 'Real users, real work.', vi: 'Người thật, việc thật.' },
  },
]

/**
 * Four positions for the line. Choosing option `i` makes every stage from index
 * `i + 1` onward run for real, which is why the last option — the line pushed
 * past the end — leaves nothing running at all. That option is on the list
 * deliberately: it is the version of the engagement where the work stays a plan,
 * and it is the one this whole page exists to argue against.
 */
const STOPS: { id: string; choice: LocalizedText; consequence: LocalizedText }[] = [
  {
    id: 'agree',
    choice: { en: 'As soon as we agree', vi: 'Ngay khi chốt xong' },
    consequence: {
      en: 'Live as soon as we agree what to build. Everything after that is improvement on a running thing.',
      vi: 'Chạy thật ngay khi chốt xong việc cần làm. Sau đó chỉ là cải tiến trên thứ đang chạy.',
    },
  },
  {
    id: 'building',
    choice: { en: 'While I am building', vi: 'Khi tôi đang xây' },
    consequence: {
      en: 'Live while I am still building it. You see it work before it is finished.',
      vi: 'Chạy thật khi tôi còn đang xây. Bạn thấy nó hoạt động trước khi nó xong.',
    },
  },
  {
    id: 'built',
    choice: { en: 'When it is built', vi: 'Khi xây xong' },
    consequence: {
      en: 'Live when it is built. This is where I put the line.',
      vi: 'Chạy thật khi xây xong. Đây là chỗ tôi đặt đường này.',
    },
  },
  {
    id: 'never',
    choice: { en: 'Never', vi: 'Không bao giờ' },
    consequence: {
      en: 'Nothing goes live. This is the version where the work stays a plan — and nothing comes out of it.',
      vi: 'Không có gì chạy thật. Đây là kịch bản mọi thứ dừng lại ở kế hoạch — và không ra được gì.',
    },
  },
]

const DEFAULT_STOP = 2

const COPY = {
  kicker: { en: 'Process', vi: 'Cách làm' },
  heading: { en: 'From problem to running', vi: 'Từ vấn đề đến chạy thật' },
  sub: {
    en: 'Most of the risk in a build is how long it stays a plan. Move the line and see what changes.',
    vi: 'Rủi ro lớn nhất của một dự án là nó nằm trên giấy quá lâu. Đổi vị trí đường này để thấy khác biệt.',
  },
  lineName: { en: 'It goes live', vi: 'Nó chạy thật' },
  running: { en: 'Running for real', vi: 'Đang chạy thật' },
  planned: { en: 'Still on paper', vi: 'Còn trên giấy' },
  loop: { en: 'then we keep improving it', vi: 'rồi tiếp tục cải tiến' },
} as const

export function Approach({ locale }: { locale: Locale }) {
  const [stop, setStop] = useState(DEFAULT_STOP)
  const name = useId()

  const liveFrom = stop + 1
  const anythingLive = liveFrom < STAGES.length

  return (
    <section className="shell band-2">
      <SectionHeading
        kicker={t(COPY.kicker, locale)}
        title={t(COPY.heading, locale)}
        sub={t(COPY.sub, locale)}
      />

      <div className="mt-10 rounded-[2px] border border-line bg-raised">
        {/* One layout at every width: the steps wrap from a column into a row
            instead of being replaced by a different component. */}
        <ol className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((stage, i) => {
            const live = i >= liveFrom
            return (
              <li key={stage.id} className="bg-raised p-5 lg:p-6">
                <span
                  aria-hidden="true"
                  className={`block h-0.5 w-8 transition-colors duration-200 ${
                    live ? 'bg-accent' : 'bg-line-strong'
                  }`}
                />
                <p className="mt-4 flex items-baseline gap-2 text-[15px] leading-snug font-medium">
                  <span className="label tnum shrink-0">{i + 1}</span>
                  <span>{t(stage.label, locale)}</span>
                </p>
                <p className="mt-1.5 pl-6 text-[14px] leading-snug text-muted">
                  {t(stage.detail, locale)}
                </p>
                {/* State as text, not as colour alone. Visible for the running
                    steps because that is the thing being demonstrated; the
                    planned ones say so to a screen reader only, so the panel
                    does not repeat "still on paper" three times on screen. */}
                {live ? (
                  <p className="mt-3 pl-6 text-[13px] font-medium text-accent">
                    {t(COPY.running, locale)}
                  </p>
                ) : (
                  <span className="sr-only">{t(COPY.planned, locale)}</span>
                )}
              </li>
            )
          })}
        </ol>

        {/* The border and the padding live on the wrapper, not on the
            `fieldset`.

            A `legend` is laid out against its fieldset's block-start BORDER
            edge, not its content edge — so with the border and `p-5` on the
            fieldset itself, the label rendered sitting on the rule with the
            panel's padding underneath it rather than above. Measured: legend
            top and fieldset top both at the same y.

            `min-w-0` is load-bearing too: a `fieldset` defaults to `min-width:
            min-content`, so without it the flex row inside refuses to shrink to
            the panel and the four options collapse into a stacked column pinned
            to the right edge. */}
        <div className="border-t border-line p-5 lg:p-6">
          <fieldset className="min-w-0">
            <legend className="label mb-3">{t(COPY.lineName, locale)}</legend>
            {/* A real radio group: arrow-key navigation, grouped announcement and
                44px targets all come for free and are all correct. */}
            <div className="flex flex-wrap gap-2">
              {STOPS.map((option, i) => {
                const selected = stop === i
                return (
                  /**
                   * The input fills its label rather than being parked off-screen
                   * with `sr-only`. A 1px clipped input is not clickable — the
                   * pointer lands on the label's own box, and anything driving the
                   * page programmatically (a test, an extension, a screen reader's
                   * click) finds the control it is aiming at covered by a div. It
                   * is transparent and stretched instead, so the visible chip and
                   * the hit target are the same rectangle.
                   */
                  <label
                    key={option.id}
                    className={`relative inline-flex min-h-11 cursor-pointer items-center rounded-[2px] border px-4 text-[14px] font-medium transition-colors duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-accent ${
                      selected
                        ? 'border-ink bg-ink text-bg'
                        : 'border-line-strong text-muted hover:border-ink hover:text-ink'
                    }`}
                  >
                    <input
                      type="radio"
                      name={name}
                      className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
                      checked={selected}
                      onChange={() => setStop(i)}
                    />
                    {t(option.choice, locale)}
                  </label>
                )
              })}
            </div>
          </fieldset>
        </div>

        {/* `aria-live` so a keyboard or screen-reader user hears the consequence
            of the choice they just made — the change is the whole payload of
            this control, and it happens 200px away from it. */}
        <p
          aria-live="polite"
          className="min-h-[76px] border-t border-line p-5 text-[15px] leading-relaxed text-muted lg:p-6"
        >
          {t(STOPS[stop]?.consequence ?? STOPS[DEFAULT_STOP]!.consequence, locale)}
          {anythingLive ? (
            <span className="text-ink"> — {t(COPY.loop, locale)}.</span>
          ) : null}
        </p>
      </div>
    </section>
  )
}
