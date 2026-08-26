'use client'

import dynamic from 'next/dynamic'
import { m, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import type { Locale } from '@/content/types'
import { t } from '@/lib/text'
import { PEN, PEN_V, duration, ease, penTime } from '@/lib/motion'
import {
  LINKS,
  LOOP_LABEL,
  LOOP_PATH,
  OUTPUTS,
  OUTPUT_PREVIEW,
  STAGES,
  VIEW,
  type Node,
} from './nodes'
import { SectionHead } from '@/components/motion/section-head'

const PixiSignals = dynamic(() => import('./pixi-signals'), { ssr: false })

/**
 * FIG. 1 — the signature moment.
 *
 * The palette says PLAN blue means designed-but-still-on-paper and LIVE red means
 * running for real. So the sequence draws the entire engagement in blue, and then
 * ignites: a front sweeps left to right and everything behind it becomes red. That
 * transition is the product, and it is the one thing on this page worth describing
 * to someone else.
 *
 * Timing is derived from pen travel, not chosen. A box perimeter is 588px, so it
 * takes 588/1400 = 420ms to draw. Nothing here is a round number for its own sake.
 */

/** Milliseconds from arming. Thirteen beats, ~5.2s, with the climax at 3.0s. */
const SCHEDULE: Record<number, number> = {
  1: 200, // box 1 draws
  2: 900, // box 2
  3: 1600, // box 3
  4: 2300, // box 4 — "It goes live"
  5: 3000, // IGNITION
  6: 3600, // outputs fan out, in red
  7: 4500, // the improvement loop closes
  8: 5200, // rest
}

const IGNITE = 5
const DONE = 8

const STAGE_PERIMETER = 2 * (208 + 86)
const OUTPUT_PERIMETER = 2 * (214 + 62)

const COPY = {
  heading: { en: 'What building with me looks like', vi: 'Xây cùng tôi trông như thế nào' },
  sub: {
    en: 'Drawn in blue while it is still a plan. It turns red when it is running.',
    vi: 'Vẽ bằng xanh khi còn là kế hoạch. Chuyển đỏ khi đã chạy thật.',
  },
  replay: { en: 'Re-run', vi: 'Chạy lại' },
  hint: { en: 'Pick what you might end up with.', vi: 'Chọn thứ bạn có thể nhận được.' },
  outputsLead: { en: 'What it turns into', vi: 'Nó thành cái gì' },
} as const

export function SignatureSystem({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reduced = useReducedMotion()

  const [mounted, setMounted] = useState(false)
  const [phase, setPhase] = useState(0)
  const [runId, setRunId] = useState(0)
  const [selected, setSelected] = useState('agent')
  const [announced, setAnnounced] = useState('')

  useEffect(() => setMounted(true), [])

  // Before hydration and under reduced motion the finished state is what renders,
  // so the diagram is never blank and never blinks.
  const settled = !mounted || reduced
  const effectivePhase = settled ? DONE : phase
  const ignited = effectivePhase >= IGNITE
  const done = effectivePhase >= DONE

  useEffect(() => {
    if (reduced) {
      setPhase(DONE)
      return
    }
    if (!inView) return
    setPhase(0)
    const timers = Object.entries(SCHEDULE).map(([p, delay]) =>
      window.setTimeout(() => setPhase(Number(p)), delay),
    )
    return () => timers.forEach(window.clearTimeout)
  }, [inView, reduced, runId])

  const preview = OUTPUT_PREVIEW[selected]
  const drawn = (at: number) => effectivePhase >= at

  /** A stroke that is laid down by the pen rather than faded in. */
  const penStroke = (length: number, on: boolean, speed = PEN) => ({
    pathLength: 1,
    strokeDasharray: 1,
    initial: false as const,
    animate: { strokeDashoffset: on ? 0 : 1 },
    transition: { duration: settled ? 0 : penTime(length, speed), ease: ease.plot },
  })

  const stageBox = (n: Node, i: number, tone: 'plan' | 'live') => (
    <m.rect
      key={`${tone}-${n.id}`}
      x={n.x}
      y={n.y}
      width={n.w}
      height={n.h}
      rx={0}
      fill={tone === 'plan' ? 'var(--color-surface)' : 'none'}
      stroke={tone === 'plan' ? 'var(--color-plan)' : 'var(--color-live)'}
      strokeWidth={tone === 'plan' ? 1.25 : 1.75}
      {...penStroke(STAGE_PERIMETER, drawn(i + 1))}
    />
  )

  const tick = (n: Node, at: number, tone: 'plan' | 'live') => {
    if (!drawn(at)) return null
    const cxp = n.x + n.w - 22
    const cyp = n.y + 22
    return (
      <g key={`${tone}-tick-${n.id}`} aria-hidden="true">
        <circle
          cx={cxp}
          cy={cyp}
          r={8}
          fill="none"
          stroke={tone === 'plan' ? 'var(--color-plan)' : 'var(--color-live)'}
          strokeWidth={1.5}
        />
        <m.path
          d={`M ${cxp - 4} ${cyp} l 3 3 l 5 -6`}
          fill="none"
          stroke={tone === 'plan' ? 'var(--color-plan)' : 'var(--color-live)'}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          {...penStroke(14, true)}
        />
      </g>
    )
  }

  const stageLinks = LINKS.filter((l) => !l.id.startsWith('live-'))
  const fanLinks = LINKS.filter((l) => l.id.startsWith('live-'))

  return (
    <section className="container-sheet py-20 md:py-24">
      <SectionHead fig="FIG. 1" title={t(COPY.heading, locale)} sub={t(COPY.sub, locale)} />

      <div
        ref={ref}
        className="relative mt-8 overflow-hidden rounded-none border border-rule-strong bg-surface"
      >
        <div className="relative w-full" style={{ aspectRatio: `${VIEW.w} / ${VIEW.h}` }}>
          {!reduced && ignited ? <PixiSignals activePhase={effectivePhase} /> : null}

          <svg
            viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label={`${t(COPY.heading, locale)}. ${STAGES.map((s) => t(s.label, locale)).join('. ')}. ${t(LOOP_LABEL, locale)}.`}
          >
            <defs>
              {/* The ignition front. Everything inside this rect is running. */}
              <clipPath id="fig1-ignition">
                <m.rect
                  x={0}
                  y={0}
                  height={VIEW.h}
                  initial={false}
                  animate={{ width: ignited ? VIEW.w : 0 }}
                  transition={{ duration: settled ? 0 : VIEW.w / PEN_V, ease: 'linear' }}
                />
              </clipPath>
              <linearGradient id="fig1-front" x1="0" x2="1">
                <stop offset="0" stopColor="var(--color-live)" stopOpacity="0" />
                <stop offset="0.7" stopColor="var(--color-live)" stopOpacity="0.28" />
                <stop offset="1" stopColor="var(--color-live)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* ---- Act I: the plan, drawn in blue ---- */}
            <g aria-hidden="true">
              {stageLinks.map((l, i) => (
                <m.path
                  key={l.id}
                  d={l.d}
                  fill="none"
                  stroke="var(--color-plan)"
                  strokeWidth={1.25}
                  {...penStroke(232, drawn(i + 2))}
                />
              ))}
              {STAGES.map((n, i) => stageBox(n, i, 'plan'))}
              {STAGES.map((n, i) => tick(n, i + 1, 'plan'))}
            </g>

            {/* Labels sit above the line work and never change colour — the ink is
                the same ink whether the thing is planned or running. */}
            <g>
              {[...STAGES, ...OUTPUTS].map((n) => {
                const visible = STAGES.includes(n)
                  ? drawn(STAGES.indexOf(n) + 1)
                  : drawn(6)
                return (
                  <m.g
                    key={`label-${n.id}`}
                    initial={false}
                    animate={{ opacity: visible ? 1 : 0 }}
                    transition={{ duration: settled ? 0 : duration.stamp, ease: ease.stamp }}
                  >
                    <text
                      x={n.x + 18}
                      y={n.detail ? n.y + 36 : n.y + n.h / 2 + 5}
                      className="fill-ink"
                      style={{ fontSize: n.detail ? 15 : 14, fontWeight: 500 }}
                    >
                      {t(n.label, locale)}
                    </text>
                    {n.detail ? (
                      <text
                        x={n.x + 18}
                        y={n.y + 60}
                        className="fill-graphite"
                        style={{ fontSize: 13 }}
                      >
                        {t(n.detail, locale)}
                      </text>
                    ) : null}
                  </m.g>
                )
              })}
              <text
                x={40}
                y={248}
                className="fill-graphite font-mono"
                style={{ fontSize: 12, letterSpacing: '0.08em' }}
              >
                {t(COPY.outputsLead, locale).toUpperCase()}
              </text>
            </g>

            {/* ---- Act II & III: everything the front has passed is running ---- */}
            <g aria-hidden="true" clipPath="url(#fig1-ignition)">
              {stageLinks.map((l, i) => (
                <path
                  key={`live-${l.id}`}
                  d={l.d}
                  fill="none"
                  stroke="var(--color-live)"
                  strokeWidth={1.75}
                  opacity={drawn(i + 2) ? 1 : 0}
                />
              ))}
              {STAGES.map((n, i) => stageBox(n, i, 'live'))}
              {STAGES.map((n, i) => tick(n, i + 1, 'live'))}

              {/* The fan-out is a consequence of ignition, so it only ever exists
                  in red — it is never part of the plan. */}
              {fanLinks.map((l) => (
                <m.path
                  key={l.id}
                  d={l.d}
                  fill="none"
                  stroke="var(--color-live)"
                  strokeWidth={1.5}
                  opacity={0.55}
                  {...penStroke(420, drawn(6), PEN_V)}
                />
              ))}
              {OUTPUTS.map((o) => (
                <m.rect
                  key={`out-${o.id}`}
                  x={o.x}
                  y={o.y}
                  width={o.w}
                  height={o.h}
                  rx={0}
                  fill="none"
                  stroke={selected === o.id ? 'var(--color-live)' : 'var(--color-ink)'}
                  strokeWidth={selected === o.id ? 2 : 1.25}
                  {...penStroke(OUTPUT_PERIMETER, drawn(6))}
                />
              ))}
              <m.path
                d={LOOP_PATH}
                fill="none"
                stroke="var(--color-live)"
                strokeWidth={1.5}
                strokeDasharray="4 5"
                initial={false}
                animate={{ opacity: drawn(7) ? 0.7 : 0 }}
                transition={{ duration: settled ? 0 : 0.27, ease: ease.plot }}
              />
            </g>

            <m.text
              x={(STAGES[2] as Node).x + 104}
              y={64}
              textAnchor="middle"
              className="fill-graphite"
              style={{ fontSize: 13 }}
              initial={false}
              animate={{ opacity: drawn(7) ? 1 : 0 }}
              transition={{ duration: settled ? 0 : duration.stamp, ease: ease.stamp }}
            >
              {t(LOOP_LABEL, locale)}
            </m.text>

            {/* The front itself — a travelling band, not a fade. */}
            {!settled && phase >= IGNITE && phase < 6 ? (
              <m.rect
                aria-hidden="true"
                y={0}
                width={280}
                height={VIEW.h}
                fill="url(#fig1-front)"
                initial={{ x: -280 }}
                animate={{ x: VIEW.w }}
                transition={{ duration: (VIEW.w + 280) / PEN_V, ease: 'linear' }}
              />
            ) : null}
          </svg>

          {/* Real, focusable controls over the drawing — the SVG is a picture,
              these are the interface. */}
          <div className="absolute inset-0">
            {OUTPUTS.map((o) => (
              <button
                key={o.id}
                type="button"
                onMouseEnter={() => setSelected(o.id)}
                onFocus={() => {
                  setSelected(o.id)
                  setAnnounced(t(OUTPUT_PREVIEW[o.id] ?? o.label, locale))
                }}
                onClick={() => {
                  setSelected(o.id)
                  setAnnounced(t(OUTPUT_PREVIEW[o.id] ?? o.label, locale))
                }}
                aria-pressed={selected === o.id}
                className="absolute rounded-none"
                style={{
                  left: `${(o.x / VIEW.w) * 100}%`,
                  top: `${(o.y / VIEW.h) * 100}%`,
                  width: `${(o.w / VIEW.w) * 100}%`,
                  height: `${(o.h / VIEW.h) * 100}%`,
                }}
              >
                <span className="sr-only">{t(o.label, locale)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex min-h-[68px] flex-wrap items-center justify-between gap-4 border-t border-rule-strong px-5 py-4">
          <p className="max-w-[58ch] text-[14px] text-graphite">
            {preview ? t(preview, locale) : t(COPY.hint, locale)}
          </p>
          <span className="sr-only" aria-live="polite">
            {announced}
          </span>
          {/* Rendered from first paint and revealed in place — mounting it later
              would shift the panel five seconds in. */}
          <button
            type="button"
            onClick={() => setRunId((n) => n + 1)}
            aria-hidden={done && !reduced ? undefined : true}
            tabIndex={done && !reduced ? undefined : -1}
            className={`h-9 shrink-0 rounded-none border border-rule-strong px-4 font-mono text-[12px] tracking-[0.1em] uppercase transition-[opacity,color,border-color] duration-150 ${
              done && !reduced
                ? 'text-graphite opacity-100 hover:border-ink hover:text-ink'
                : 'pointer-events-none text-graphite opacity-0'
            }`}
          >
            {t(COPY.replay, locale)}
          </button>
        </div>
      </div>
    </section>
  )
}
