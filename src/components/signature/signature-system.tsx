'use client'

import dynamic from 'next/dynamic'
import { m, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import type { Locale } from '@/content/types'
import { t } from '@/lib/text'
import { duration, ease } from '@/lib/motion'
import {
  LAST_PHASE,
  LINKS,
  LOOP_LABEL,
  LOOP_PATH,
  OUTPUTS,
  OUTPUT_PREVIEW,
  STAGES,
  VIEW,
  cx,
  type Node,
} from './nodes'

const PixiSignals = dynamic(() => import('./pixi-signals'), { ssr: false })

/** Milliseconds from arming to each phase. Total run ≈ 8s, then it rests. */
const SCHEDULE: Record<number, number> = {
  1: 200,
  2: 1500,
  3: 2800,
  4: 4100,
  5: 5400,
  6: 7000,
}

const COPY = {
  heading: { en: 'How we work together', vi: 'Chúng ta làm việc với nhau thế nào' },
  sub: {
    en: 'Four steps. You are in every one of them.',
    vi: 'Bốn bước. Bước nào cũng có bạn.',
  },
  replay: { en: 'Replay', vi: 'Chạy lại' },
  hint: {
    en: 'Pick what you might end up with.',
    vi: 'Chọn thứ bạn có thể nhận được.',
  },
  outputsLead: { en: 'What it turns into', vi: 'Nó thành cái gì' },
} as const

export function SignatureSystem({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reduced = useReducedMotion()

  const [phase, setPhase] = useState(0)
  const [runId, setRunId] = useState(0)
  const [selected, setSelected] = useState('agent')

  const done = phase >= LAST_PHASE

  useEffect(() => {
    // Reduced motion gets the finished state immediately — the whole message,
    // none of the cinema.
    if (reduced) {
      setPhase(LAST_PHASE)
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

  const renderBox = (n: Node, opts: { isOutput?: boolean } = {}) => {
    const on = phase >= n.phase
    const isSelected = opts.isOutput === true && selected === n.id
    return (
      <m.g
        key={n.id}
        initial={false}
        animate={{ opacity: on ? 1 : 0.7 }}
        transition={{ duration: duration.state, ease: ease.out }}
      >
        <rect
          x={n.x}
          y={n.y}
          width={n.w}
          height={n.h}
          rx={3}
          className={
            isSelected ? 'fill-paper stroke-live' : on ? 'fill-paper stroke-ink' : 'fill-surface stroke-rule'
          }
          strokeWidth={isSelected ? 2 : on ? 1.5 : 1.25}
        />
        <text
          x={n.x + 18}
          y={n.detail ? n.y + 36 : n.y + n.h / 2 + 5}
          className="fill-ink"
          style={{ fontSize: n.detail ? 15 : 14, fontWeight: 500 }}
        >
          {t(n.label, locale)}
        </text>
        {n.detail ? (
          <text x={n.x + 18} y={n.y + 60} className="fill-graphite" style={{ fontSize: 13 }}>
            {t(n.detail, locale)}
          </text>
        ) : null}
        {on ? (
          <m.g
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: duration.feedback, ease: ease.out }}
          >
            <circle cx={n.x + n.w - 22} cy={n.y + 22} r={8} className="fill-live" />
            <path
              d={`M ${n.x + n.w - 26} ${n.y + 22} l 3 3 l 5 -6`}
              fill="none"
              stroke="white"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </m.g>
        ) : null}
      </m.g>
    )
  }

  return (
    <section className="container-sheet py-20 md:py-28">
      <div className="flex items-baseline gap-4 border-b border-ink pb-3">
        <span className="fig-label shrink-0">FIG. 1</span>
        <h2 className="text-[clamp(1.4rem,2.6vw,1.85rem)] font-extrabold tracking-[-0.03em]">
          {t(COPY.heading, locale)}
        </h2>
      </div>
      <p className="mt-4 max-w-[48ch] text-[16px] text-graphite">{t(COPY.sub, locale)}</p>

      <div
        ref={ref}
        className="relative mt-8 overflow-hidden rounded-xs border border-rule-strong bg-surface"
      >
        {/* Dimensions reserved by aspect-ratio: the panel never shifts layout. */}
        <div className="relative w-full" style={{ aspectRatio: `${VIEW.w} / ${VIEW.h}` }}>
          {!reduced && phase > 0 ? <PixiSignals activePhase={phase} /> : null}

          <svg
            viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label={`${t(COPY.heading, locale)}. ${STAGES.map((s) => t(s.label, locale)).join('. ')}. ${t(LOOP_LABEL, locale)}.`}
          >
            <g aria-hidden="true">
              {LINKS.map((l) => (
                <g key={l.id}>
                  {/* Base connector: always present, so the resting frame reads as
                      a process rather than as boxes floating in space. */}
                  <path d={l.d} fill="none" strokeWidth={1.25} className="stroke-plan" opacity={0.42} />
                  {/* Activation overlay. Motion cannot interpolate CSS variables, so
                      the colour change is a second path fading in. */}
                  <m.path
                    d={l.d}
                    fill="none"
                    strokeWidth={1.75}
                    className="stroke-live"
                    initial={false}
                    animate={{ opacity: phase >= l.phase ? (l.id.startsWith('live-') ? 0.5 : 0.85) : 0 }}
                    transition={{ duration: reduced ? 0 : duration.state, ease: ease.out }}
                  />
                </g>
              ))}

              {/* The improvement loop: shipping is not the end of the engagement. */}
              <path
                d={LOOP_PATH}
                fill="none"
                strokeWidth={1.5}
                strokeDasharray="4 5"
                className="stroke-plan"
                opacity={0.5}
              />
              <text
                x={(cx(STAGES[2] as Node) + cx(STAGES[3] as Node)) / 2}
                y={64}
                textAnchor="middle"
                className="fill-graphite"
                style={{ fontSize: 13 }}
              >
                {t(LOOP_LABEL, locale)}
              </text>

              <text x={40} y={248} className="fill-graphite font-mono" style={{ fontSize: 12, letterSpacing: '0.08em' }}>
                {t(COPY.outputsLead, locale).toUpperCase()}
              </text>
            </g>

            {STAGES.map((s) => renderBox(s))}
            {OUTPUTS.map((o) => renderBox(o, { isOutput: true }))}
          </svg>

          {/* Real, focusable controls over the drawing — the SVG is a picture,
              these are the interface. */}
          <div className="absolute inset-0">
            {OUTPUTS.map((o) => (
              <button
                key={o.id}
                type="button"
                onMouseEnter={() => setSelected(o.id)}
                onFocus={() => setSelected(o.id)}
                onClick={() => setSelected(o.id)}
                aria-pressed={selected === o.id}
                className="absolute rounded-xl"
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

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-rule-strong px-5 py-4">
          <p className="max-w-[58ch] text-[14px] text-graphite" aria-live="polite">
            {preview ? t(preview, locale) : t(COPY.hint, locale)}
          </p>
          {done && !reduced ? (
            <button
              type="button"
              onClick={() => setRunId((n) => n + 1)}
              className="h-9 shrink-0 rounded-xs border border-rule-strong px-4 font-mono text-[12px] tracking-[0.1em] uppercase text-graphite transition-colors duration-150 hover:border-ink hover:text-ink"
            >
              {t(COPY.replay, locale)}
            </button>
          ) : null}
        </div>
      </div>
    </section>
  )
}
