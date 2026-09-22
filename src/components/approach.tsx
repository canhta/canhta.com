'use client'

import { useId, useState } from 'react'
import type { ApproachMessages } from '@/i18n/messages'
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

/**
 * Four positions for the line. Choosing option `i` makes every stage from index
 * `i + 1` onward run for real, which is why the last option — the line pushed
 * past the end — leaves nothing running at all. That option is on the list
 * deliberately: it is the version of the engagement where the work stays a plan,
 * and it is the one this whole page exists to argue against.
 */
const DEFAULT_STOP = 2

export function Approach({ copy }: { copy: ApproachMessages }) {
  const [stop, setStop] = useState(DEFAULT_STOP)
  const name = useId()

  const liveFrom = stop + 1
  const anythingLive = liveFrom < copy.stages.length

  return (
    <section className="shell band-2">
      <SectionHeading
        kicker={copy.kicker}
        title={copy.heading}
        sub={copy.sub}
      />

      <div className="mt-10 rounded-[2px] border border-line bg-raised">
        {/* One layout at every width: the steps wrap from a column into a row
            instead of being replaced by a different component. */}
        <ol className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {copy.stages.map((stage, i) => {
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
                  <span>{stage.label}</span>
                </p>
                <p className="mt-1.5 pl-6 text-[14px] leading-snug text-muted">
                  {stage.detail}
                </p>
                {/* State as text, not as colour alone. Visible for the running
                    steps because that is the thing being demonstrated; the
                    planned ones say so to a screen reader only, so the panel
                    does not repeat "still on paper" three times on screen. */}
                {live ? (
                  <p className="mt-3 pl-6 text-[13px] font-medium text-accent">
                    {copy.running}
                  </p>
                ) : (
                  <span className="sr-only">{copy.planned}</span>
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
            <legend className="label mb-3">{copy.lineName}</legend>
            {/* A real radio group: arrow-key navigation, grouped announcement and
                44px targets all come for free and are all correct. */}
            <div className="flex flex-wrap gap-2">
              {copy.stops.map((option, i) => {
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
                    {option.choice}
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
          {copy.stops[stop]?.consequence ?? copy.stops[DEFAULT_STOP]!.consequence}
          {anythingLive ? <span className="text-ink"> {copy.loop}</span> : null}
        </p>
      </div>
    </section>
  )
}
