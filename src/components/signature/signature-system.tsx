'use client'

import { m, useReducedMotion } from 'motion/react'
import { useCallback, useRef, useState } from 'react'
import type { Locale } from '@/content/types'
import { t } from '@/lib/text'
import { PEN, duration, ease, penTime } from '@/lib/motion'
import {
  CONNECTORS,
  DEFAULT_STOP,
  LEADER,
  LOOP,
  LOOP_LABEL,
  LOOP_LABEL_POS,
  OUTPUTS,
  OUTPUTS_LABEL,
  OUTPUTS_LABEL_POS,
  OUT_LABEL_BASELINE,
  STAGES,
  STOPS,
  THRESHOLD_BOTTOM,
  THRESHOLD_TOP,
  TICKS,
  VIEW,
  anyStageLive,
  isLive,
  type Node,
  type Stroke,
} from './nodes'
import { SectionHead } from '@/components/motion/section-head'

/**
 * FIG. 1 — the signature moment, and the page's one interaction.
 *
 * WHAT THIS REPLACED. There was an eleven-beat, 3.9s plotter sequence here. Its
 * climax — the moment the ink changed from PLAN blue to LIVE red, which is the
 * page's entire idea — was a 36-unit arrow: 0.96% of the drawing's ink, 160ms
 * long, scheduled with the same 50ms lead-in as every routine beat. An
 * eleven-beat build-up to the quietest frame in the run. Worse, it fired at
 * t=1.92s while realistic time-to-fixation for a panel arriving from below the
 * fold is 1.5–3s, so whether anyone saw the climax at all was a coin flip.
 *
 * WHAT IT IS NOW. A draughtsman's section line the visitor drags. Right of the
 * line the work is running for real (red, heavier). Left of it, it is still on
 * paper (blue, lighter). The ink change stops being something you might have
 * missed at 1.92s and becomes something you caused.
 *
 * The claim it lets a visitor test is the one thing here worth arguing about:
 * where you put that line is the whole difference between one builder and
 * another. Drag it right — keep it on paper longer — and the callout list
 * disappears, because nothing shipped means nothing to show.
 *
 * Timing budget: 0.9s, down from 3.9s. And it no longer cares whether you were
 * looking at any particular instant.
 */

const COPY = {
  heading: { en: 'From problem to running', vi: 'Từ vấn đề đến chạy thật' },
  sub: {
    en: 'Drag the line. Right of it is running for real; left of it is still on paper.',
    vi: 'Kéo đường này. Bên phải là đang chạy thật, bên trái là còn trên giấy.',
  },
  drag: { en: 'Drag', vi: 'Kéo' },
  lineName: { en: 'Where it goes live', vi: 'Chỗ nó bắt đầu chạy thật' },
  stops: [
    {
      en: 'Live as soon as we agree what to build. Everything after that is improvement on a running thing.',
      vi: 'Chạy thật ngay khi chốt xong việc cần làm. Sau đó chỉ là cải tiến trên thứ đang chạy.',
    },
    {
      en: 'Live while I am still building it. You see it work before it is finished.',
      vi: 'Chạy thật khi tôi còn đang xây. Bạn thấy nó hoạt động trước khi nó xong.',
    },
    {
      en: 'Live when it is built. This is where I put the line.',
      vi: 'Chạy thật khi xây xong. Đây là chỗ tôi đặt đường này.',
    },
    {
      en: 'Nothing goes live. This is the version where the work stays a plan — and nothing comes out of it.',
      vi: 'Không có gì chạy thật. Đây là kịch bản mọi thứ dừng lại ở kế hoạch — và không ra được gì.',
    },
  ],
} as const

const ink = (live: boolean) => (live ? 'var(--color-live)' : 'var(--color-plan)')
const weight = (live: boolean) => (live ? 1.75 : 1.25)

export function SignatureSystem({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const [stop, setStop] = useState<number>(DEFAULT_STOP)
  const [dragX, setDragX] = useState<number | null>(null)

  // While dragging, the line is wherever the pointer is — a section line on a
  // drawing has no inertia, so this tracks 1:1 with no spring and no lag.
  const thresholdX = dragX ?? (STOPS[stop] as number)
  const dragging = dragX !== null
  const outputsLive = anyStageLive(thresholdX)

  /**
   * Recolour timing. During a drag the tone flips the instant the line sweeps
   * past a stroke — that IS the reveal, and easing it would feel like lag. On
   * release or a keypress the change travels outward from the line at pen
   * speed, so the ink change moves along the drawing instead of flipping.
   */
  const toneTransition = useCallback(
    (minX: number) => {
      if (dragging || reduced) return { duration: 0 }
      return {
        duration: duration.state,
        ease: ease.mech,
        delay: Math.max(0, penTime(Math.abs(minX - thresholdX), PEN) - 0.16),
      }
    },
    [dragging, reduced, thresholdX],
  )

  const xFromPointer = (clientX: number) => {
    const el = trackRef.current
    if (!el) return thresholdX
    const r = el.getBoundingClientRect()
    const ratio = (clientX - r.left) / r.width
    return Math.min(STOPS[STOPS.length - 1] as number, Math.max(STOPS[0] as number, ratio * VIEW.w))
  }

  const nearestStop = (x: number) => {
    let best = 0
    for (let i = 1; i < STOPS.length; i++) {
      if (Math.abs((STOPS[i] as number) - x) < Math.abs((STOPS[best] as number) - x)) best = i
    }
    return best
  }

  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragX(xFromPointer(e.clientX))
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragX === null) return
    setDragX(xFromPointer(e.clientX))
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragX === null) return
    setStop(nearestStop(dragX))
    setDragX(null)
    e.currentTarget.releasePointerCapture(e.pointerId)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const back = e.key === 'ArrowLeft' || e.key === 'ArrowDown'
    const fwd = e.key === 'ArrowRight' || e.key === 'ArrowUp'
    if (!back && !fwd && e.key !== 'Home' && e.key !== 'End') return
    e.preventDefault()
    if (e.key === 'Home') return setStop(0)
    if (e.key === 'End') return setStop(STOPS.length - 1)
    setStop((n) => Math.min(STOPS.length - 1, Math.max(0, n + (fwd ? 1 : -1))))
  }

  const statement = t(COPY.stops[stop] ?? COPY.stops[DEFAULT_STOP], locale)

  const box = (n: Node) => {
    const live = isLive(n.x, thresholdX)
    return (
      <m.rect
        key={`box-${n.id}`}
        x={n.x}
        y={n.y}
        width={n.w}
        height={n.h}
        fill="none"
        initial={false}
        animate={{ stroke: ink(live), strokeWidth: weight(live) }}
        transition={toneTransition(n.x)}
      />
    )
  }

  /**
   * `forceLive` is for everything downstream of the row — the leader, its ticks
   * and the improvement loop. Those are consequences of the work being live, not
   * positions on the timeline, so they take their tone from "is anything running
   * at all" rather than from their own x. Deriving them from x rendered the whole
   * fan-out blue while a stage above it was red.
   */
  const stroke = (s: Stroke, forceLive?: boolean) => {
    const live = forceLive ?? isLive(s.minX, thresholdX)
    return (
      <m.path
        key={s.id}
        d={s.d}
        fill="none"
        strokeLinecap="square"
        initial={false}
        animate={{ stroke: ink(live), strokeWidth: weight(live) }}
        transition={toneTransition(s.minX)}
      />
    )
  }

  /**
   * The pointer surface is the whole track; the focusable thing is the thumb.
   *
   * Both used to be the same element, so the focus ring — 2px of PLAN blue —
   * outlined the entire panel and read as "this whole drawing is still on
   * paper", fighting the exact semantic the control exists to demonstrate.
   */
  const trackProps = {
    onPointerDown,
    onPointerMove,
    onPointerUp,
  }

  const thumbProps = {
    role: 'slider' as const,
    tabIndex: 0,
    'aria-valuemin': 0,
    'aria-valuemax': STOPS.length - 1,
    'aria-valuenow': stop,
    'aria-valuetext': statement,
    'aria-label': t(COPY.lineName, locale),
    onKeyDown,
  }

  const snap = dragging || reduced
    ? { duration: 0 }
    : // ζ = 1.00 — a section line snaps to its stop, it does not bounce.
      ({ type: 'spring', stiffness: 900, damping: 60 } as const)

  return (
    <section className="container-sheet figure-primary">
      <SectionHead fig="FIG. 1" title={t(COPY.heading, locale)} sub={t(COPY.sub, locale)} />

      <div className="relative mt-8 rounded-none border border-rule-strong bg-surface">
        {/* ---- The drawing. Shown only where there is room to read it. ---- */}
        <div
          ref={trackRef}
          className="relative hidden w-full touch-pan-y select-none lg:block"
          style={{ aspectRatio: `${VIEW.w} / ${VIEW.h}`, cursor: 'ew-resize' }}
          {...trackProps}
        >
          <svg
            viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label={`${t(COPY.heading, locale)}. ${STAGES.map((s) => t(s.label, locale)).join('. ')}. ${t(LOOP_LABEL, locale)}.`}
          >
            <g aria-hidden="true">
              {CONNECTORS.map((c) => stroke(c))}
              {STAGES.map(box)}
              <m.g
                initial={false}
                animate={{ opacity: outputsLive ? 1 : 0 }}
                transition={{ duration: dragging || reduced ? 0 : duration.state, ease: ease.mech }}
              >
                {stroke(LEADER, true)}
                {TICKS.map((tk) => stroke(tk, true))}
              </m.g>
              {stroke(LOOP, outputsLive)}
            </g>

            {/* Labels are the same ink whether the thing is planned or running.
                What changes colour is the line work, because that is the drawing. */}
            <g>
              {STAGES.map((n) => (
                <g key={`label-${n.id}`}>
                  <text
                    x={n.x + 18}
                    y={n.detail ? n.y + 36 : n.y + n.h / 2 + 5}
                    className="fill-ink"
                    style={{ fontSize: 15, fontWeight: 500 }}
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
                </g>
              ))}

              <m.g
                initial={false}
                animate={{ opacity: outputsLive ? 1 : 0 }}
                transition={{ duration: dragging || reduced ? 0 : duration.state, ease: ease.mech }}
              >
                <text
                  x={OUTPUTS_LABEL_POS.x}
                  y={OUTPUTS_LABEL_POS.y}
                  className="fill-graphite font-mono"
                  style={{ fontSize: 11, letterSpacing: '0.08em' }}
                >
                  {t(OUTPUTS_LABEL, locale).toUpperCase()}
                </text>
                {OUTPUTS.map((o) => (
                  <text
                    key={`out-${o.id}`}
                    x={o.x + 14}
                    y={OUT_LABEL_BASELINE}
                    className="fill-ink"
                    style={{ fontSize: 15, fontWeight: 500 }}
                  >
                    {t(o.label, locale)}
                  </text>
                ))}
              </m.g>

              <text
                x={LOOP_LABEL_POS.x}
                y={LOOP_LABEL_POS.y}
                textAnchor="middle"
                className="fill-graphite"
                style={{ fontSize: 13 }}
              >
                {t(LOOP_LABEL, locale)}
              </text>
            </g>

            {/* ---- The section line itself ---- */}
            <m.g aria-hidden="true" initial={false} animate={{ x: thresholdX }} transition={snap}>
              <line
                x1={0}
                y1={THRESHOLD_TOP}
                x2={0}
                y2={THRESHOLD_BOTTOM}
                stroke="var(--color-ink)"
                strokeWidth={1.25}
                strokeDasharray="10 5 2 5"
              />
              <rect x={-1} y={THRESHOLD_TOP} width={2} height={12} fill="var(--color-ink)" />
              <rect
                x={-1}
                y={THRESHOLD_BOTTOM - 12}
                width={2}
                height={12}
                fill="var(--color-ink)"
              />
            </m.g>
          </svg>

          {/* The thumb. Focus lands here, beside the line, not on the panel. */}
          <m.div
            {...thumbProps}
            className="absolute z-10 -translate-x-1/2 cursor-ew-resize"
            style={{
              top: `${(THRESHOLD_TOP / VIEW.h) * 100}%`,
              height: `${((THRESHOLD_BOTTOM - THRESHOLD_TOP) / VIEW.h) * 100}%`,
              width: 28,
            }}
            initial={false}
            animate={{ left: `${(thresholdX / VIEW.w) * 100}%` }}
            transition={snap}
          >
            {/* Flips to the inside of the sheet near the right edge, where a
                label hung off the thumb would escape the panel. */}
            <span
              className={`fig-label absolute top-0 whitespace-nowrap ${
                thresholdX > VIEW.w * 0.72 ? 'right-full pr-2' : 'left-full pl-2'
              }`}
            >
              {t(COPY.drag, locale)}
            </span>
          </m.div>
        </div>

        {/* ---- The same drawing, stacked, for screens that cannot hold it. ---- */}
        <ol className="lg:hidden">
          {STAGES.map((n, i) => {
            const live = isLive(n.x, thresholdX)
            const nextLive = i < STAGES.length - 1 && isLive((STAGES[i + 1] as Node).x, thresholdX)
            return (
              <li key={n.id} className="flex gap-4 px-5 pt-4">
                <div className="flex flex-col items-center">
                  <m.span
                    aria-hidden="true"
                    className="mt-1.5 h-2.5 w-2.5 shrink-0"
                    initial={false}
                    animate={{ borderColor: ink(live), borderWidth: weight(live) }}
                    transition={toneTransition(n.x)}
                    style={{ borderStyle: 'solid' }}
                  />
                  {i < STAGES.length - 1 ? (
                    <m.span
                      aria-hidden="true"
                      className="mt-1 w-px flex-1"
                      initial={false}
                      animate={{ backgroundColor: ink(nextLive) }}
                      transition={toneTransition(n.x)}
                    />
                  ) : null}
                </div>
                <div className="min-w-0 pb-1">
                  <p className="text-[15px] leading-snug font-medium">{t(n.label, locale)}</p>
                  {n.detail ? (
                    <p className="mt-0.5 text-[15px] text-graphite">{t(n.detail, locale)}</p>
                  ) : null}
                </div>
              </li>
            )
          })}
        </ol>
        <p className="annot px-5 pt-2 pb-4 pl-14 lg:hidden">{t(LOOP_LABEL, locale)}</p>

        {/* The mobile control. Horizontal on both breakpoints on purpose:
            a vertical drag on a phone is the page scroll. `touch-pan-y` lets that
            scroll pass straight through while a horizontal drag moves the line. */}
        <div className="border-t border-rule-strong px-5 py-4 lg:hidden">
          <div className="flex items-center justify-between gap-4 pb-2">
            <span className="fig-label">{t(COPY.lineName, locale)}</span>
            <span className="annot">
              {stop + 1}/{STOPS.length}
            </span>
          </div>
          <div
            className="relative h-11 touch-pan-y select-none"
            style={{ cursor: 'ew-resize' }}
            {...trackProps}
          >
            <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-rule-strong" />
            {STOPS.map((sx, i) => (
              <span
                key={sx}
                aria-hidden="true"
                className={`absolute top-1/2 h-2 w-px -translate-y-1/2 ${
                  i === stop ? 'bg-ink' : 'bg-rule-strong'
                }`}
                style={{ left: `${(sx / VIEW.w) * 100}%` }}
              />
            ))}
            <m.div
              {...thumbProps}
              className="absolute top-0 bottom-0 flex w-11 -translate-x-1/2 items-center justify-center"
              initial={false}
              animate={{ left: `${(thresholdX / VIEW.w) * 100}%` }}
              transition={snap}
            >
              <span aria-hidden="true" className="h-7 w-0.5 bg-ink" />
            </m.div>
          </div>
        </div>

        <div className="flex min-h-[68px] items-center border-t border-rule-strong px-5 py-4">
          <p className="max-w-[62ch] text-[15px] text-graphite">
            {statement}
          </p>
        </div>
      </div>
    </section>
  )
}
