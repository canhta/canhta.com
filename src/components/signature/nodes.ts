import type { LocalizedText } from '@/content/types'

/**
 * FIG. 1 — how working together actually goes, written for someone who does not
 * build software.
 *
 * Two things changed here, and both were corrections rather than polish.
 *
 * 1. THE THRESHOLD. The palette promises that blue means designed-but-still-on-
 *    paper and red means running for real. The old sequence drew everything blue
 *    and then turned *all of it* red, which said that "you bring a problem" is
 *    a live production system. Nonsense — and because the resting state is what
 *    a visitor actually looks at, the two-colour system was invisible 95% of the
 *    time. Now the pen simply changes ink at the point where the work goes live:
 *    the first three stages stay blue forever, everything from "It goes live"
 *    onward is red forever. The legend in the hero finally pays off.
 *
 * 2. THE FAN-OUT. It began as four beziers crossing each other, which no
 *    draughtsman would draw. The first fix — an orthogonal distribution bus —
 *    removed the crossings but the bus, its drops and the boxes below closed into
 *    a row of cells, so it read as a table. The second fix removes the boxes: the
 *    outputs hang off a single leader as a callout list, which is how a drawing
 *    has always named the parts of a thing. It also breaks the repetition of four
 *    rectangles followed by four more rectangles.
 */
export const VIEW = { w: 1000, h: 360 } as const

export type Tone = 'plan' | 'live'

export interface Node {
  id: string
  x: number
  y: number
  w: number
  h: number
  label: LocalizedText
  /** Plain-language detail, shown under the label. */
  detail?: LocalizedText
}

const COL_W = 208
const COL_X = [40, 272, 504, 736]
const STAGE_H = 86
const STAGE_Y = 118
const STAGE_BOTTOM = STAGE_Y + STAGE_H

export const STAGES: Node[] = [
  {
    id: 'problem',
    x: COL_X[0] as number,
    y: STAGE_Y,
    w: COL_W,
    h: STAGE_H,
    label: { en: 'You bring a problem', vi: 'Bạn kể vấn đề' },
    // Was "Messy is fine." — reassuring in intent, but it names the visitor's
    // problem as the mess. This says the same thing about not needing to speak
    // engineer, without the judgement.
    detail: { en: 'In your own words.', vi: 'Bằng lời của bạn.' },
  },
  {
    id: 'agree',
    x: COL_X[1] as number,
    y: STAGE_Y,
    w: COL_W,
    h: STAGE_H,
    label: { en: 'We agree what to build', vi: 'Chốt việc cần làm' },
    detail: { en: 'Small and specific.', vi: 'Nhỏ và cụ thể.' },
  },
  {
    id: 'build',
    x: COL_X[2] as number,
    y: STAGE_Y,
    w: COL_W,
    h: STAGE_H,
    label: { en: 'I build, you check', vi: 'Tôi xây, bạn duyệt' },
    detail: { en: 'You see it as it grows.', vi: 'Bạn xem từng phần một.' },
  },
  {
    id: 'live',
    x: COL_X[3] as number,
    y: STAGE_Y,
    w: COL_W,
    h: STAGE_H,
    label: { en: 'It goes live', vi: 'Đưa vào chạy thật' },
    detail: { en: 'Real users, real work.', vi: 'Người thật, việc thật.' },
  },
]

export const LOOP_LABEL: LocalizedText = {
  en: 'then we keep improving it',
  vi: 'rồi tiếp tục cải tiến',
}

export const OUTPUTS_LABEL: LocalizedText = {
  en: 'what it turns into',
  vi: 'nó thành cái gì',
}

/**
 * The outputs are a callout list, not boxes. `y`/`h` describe the hit area that
 * spans the leader tick and its label, so the pointer target matches what reads
 * as one item.
 */
const OUT_Y = 256
const OUT_H = 74

export const OUTPUTS: Node[] = [
  {
    id: 'agent',
    x: COL_X[0] as number,
    y: OUT_Y,
    w: COL_W,
    h: OUT_H,
    label: { en: 'Work that runs itself', vi: 'Việc tự nó chạy' },
  },
  {
    id: 'mobile',
    x: COL_X[1] as number,
    y: OUT_Y,
    w: COL_W,
    h: OUT_H,
    label: { en: 'A phone app', vi: 'App điện thoại' },
  },
  {
    id: 'web',
    x: COL_X[2] as number,
    y: OUT_Y,
    w: COL_W,
    h: OUT_H,
    label: { en: 'A web product', vi: 'Sản phẩm web' },
  },
  {
    id: 'saas',
    x: COL_X[3] as number,
    y: OUT_Y,
    w: COL_W,
    h: OUT_H,
    label: { en: 'A paid product', vi: 'Sản phẩm thu phí' },
  },
]

/** Where each callout's tick ends and its label sits. */
export const TICK_BOTTOM = 284
export const OUT_LABEL_BASELINE = 306

export const OUTPUT_PREVIEW: Record<string, LocalizedText> = {
  agent: {
    en: 'Work that used to eat your week now happens on its own, and asks you only when it matters.',
    vi: 'Việc từng ngốn cả tuần của bạn giờ tự chạy, chỉ hỏi bạn khi thật sự cần.',
  },
  mobile: {
    en: 'Something your customers open on their phone, on both app stores.',
    vi: 'Thứ khách của bạn mở trên điện thoại, có mặt trên cả hai kho ứng dụng.',
  },
  web: {
    en: 'The screen your team works in every day — fast, and easy to learn.',
    vi: 'Màn hình đội của bạn dùng mỗi ngày — nhanh, và dễ học.',
  },
  saas: {
    en: 'A focused product that takes payments from its first customer.',
    vi: 'Một sản phẩm gọn, thu tiền được ngay từ khách đầu tiên.',
  },
}

export const cx = (n: Node) => n.x + n.w / 2
export const cy = (n: Node) => n.y + n.h / 2

/**
 * Geometry only. Tone is NOT stored on a stroke any more — it is derived at
 * render time from which side of the section line the stroke sits on, so there
 * is exactly one source of truth for "is this running yet".
 */
export interface Stroke {
  id: string
  d: string
  /** The x used to decide which side of the line this stroke is on. */
  minX: number
}

/** A short connector with its arrowhead, drawn as one continuous stroke. */
function arrow(id: string, x1: number, x2: number, y: number): Stroke {
  const head = 6
  return {
    id,
    d: `M ${x1} ${y} L ${x2} ${y} M ${x2 - head} ${y - 4} L ${x2} ${y} L ${x2 - head} ${y + 4}`,
    // A connector belongs to the stage it points at.
    minX: x2,
  }
}

export const CONNECTORS: Stroke[] = STAGES.slice(0, -1).map((s, i) => {
  const next = STAGES[i + 1] as Node
  return arrow(`${s.id}-${next.id}`, s.x + s.w, next.x, cy(s))
})

/**
 * One leader: down from the last stage, then left along the sheet. Every output
 * is a tick off that leader with its name beside it. No second row of boxes, and
 * nothing encloses anything, so nothing reads as a table.
 */
const LEADER_Y = OUT_Y
const STEM_X = cx(STAGES[STAGES.length - 1] as Node)

export const LEADER: Stroke = {
  id: 'leader',
  d: `M ${STEM_X} ${STAGE_BOTTOM} L ${STEM_X} ${LEADER_Y} L ${COL_X[0]} ${LEADER_Y}`,
  minX: COL_X[0] as number,
}

export const TICKS: Stroke[] = OUTPUTS.map((o) => ({
  id: `tick-${o.id}`,
  d: `M ${o.x} ${LEADER_Y} L ${o.x} ${TICK_BOTTOM}`,
  minX: o.x,
}))

/** The improvement loop. It carries an arrowhead: a loop with no direction is a
 *  decoration. */
const LOOP_FROM = cx(STAGES[3] as Node)
const LOOP_TO = cx(STAGES[2] as Node)

export const LOOP: Stroke = {
  id: 'loop',
  d:
    `M ${LOOP_FROM} ${STAGE_Y} C ${LOOP_FROM} ${STAGE_Y - 62}, ${LOOP_TO} ${STAGE_Y - 62}, ${LOOP_TO} ${STAGE_Y}` +
    ` M ${LOOP_TO - 4} ${STAGE_Y - 7} L ${LOOP_TO} ${STAGE_Y} L ${LOOP_TO + 4} ${STAGE_Y - 7}`,
  minX: LOOP_TO,
}

export const OUTPUTS_LABEL_POS = { x: COL_X[0] as number, y: OUT_Y - 14 }
export const LOOP_LABEL_POS = { x: (LOOP_TO + LOOP_FROM) / 2, y: 46 }

/**
 * The four positions the section line can rest at: one in each gap between
 * stages, plus one past the right end of the row.
 *
 * RIGHT of the line is LIVE (red, running for real). LEFT is PLAN (blue, still
 * on paper). Stop 2 is the default and reproduces the drawing exactly as it was
 * before it became draggable — three stages on paper, "It goes live" running.
 *
 * Stop 3 puts everything on paper, and because the callout list only exists when
 * something is actually live, dragging the line all the way right makes the
 * products disappear. That is the argument this drawing is making.
 */
export const STOPS = [260, 492, 724, 976] as const
export const DEFAULT_STOP = 2

/** Live means the element sits to the right of the line. */
export const isLive = (minX: number, thresholdX: number) => minX > thresholdX

/** Anything downstream of the row exists only if at least one stage is live. */
export const anyStageLive = (thresholdX: number) =>
  isLive((STAGES[STAGES.length - 1] as Node).x, thresholdX)

export const THRESHOLD_TOP = 70
export const THRESHOLD_BOTTOM = 330
