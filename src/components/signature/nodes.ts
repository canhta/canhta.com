import type { LocalizedText } from '@/content/types'

/**
 * How working together actually goes — written for someone who does not build
 * software. No agent loops, no architecture vocabulary. Four steps and a loop,
 * because that is genuinely what the engagement is.
 *
 * One shared coordinate space (1000 x 440) for the SVG layer and the Pixi layer,
 * so particles land exactly on the connectors the visitor can see.
 */
export const VIEW = { w: 1000, h: 440 } as const

export interface Node {
  id: string
  x: number
  y: number
  w: number
  h: number
  label: LocalizedText
  /** Plain-language detail, shown under the label. */
  detail?: LocalizedText
  /** Sequence position. */
  phase: number
}

const STAGE_W = 208
const STAGE_H = 86
const STAGE_Y = 118
const STAGE_X = [40, 272, 504, 736]

export const STAGES: Node[] = [
  {
    id: 'problem',
    x: STAGE_X[0] as number,
    y: STAGE_Y,
    w: STAGE_W,
    h: STAGE_H,
    label: { en: 'You bring a problem', vi: 'Bạn kể vấn đề' },
    detail: { en: 'Messy is fine.', vi: 'Lộn xộn cũng được.' },
    phase: 1,
  },
  {
    id: 'agree',
    x: STAGE_X[1] as number,
    y: STAGE_Y,
    w: STAGE_W,
    h: STAGE_H,
    label: { en: 'We agree what to build', vi: 'Chốt việc cần làm' },
    detail: { en: 'Small and specific.', vi: 'Nhỏ và cụ thể.' },
    phase: 2,
  },
  {
    id: 'build',
    x: STAGE_X[2] as number,
    y: STAGE_Y,
    w: STAGE_W,
    h: STAGE_H,
    label: { en: 'I build, you check', vi: 'Tôi xây, bạn duyệt' },
    detail: { en: 'You see it as it grows.', vi: 'Bạn xem từng phần một.' },
    phase: 3,
  },
  {
    id: 'live',
    x: STAGE_X[3] as number,
    y: STAGE_Y,
    w: STAGE_W,
    h: STAGE_H,
    label: { en: 'It goes live', vi: 'Đưa vào chạy thật' },
    detail: { en: 'Real users, real work.', vi: 'Người thật, việc thật.' },
    phase: 4,
  },
]

export const LOOP_LABEL: LocalizedText = {
  en: 'then we keep improving it',
  vi: 'rồi tiếp tục cải tiến',
}

const OUT_W = 214
const OUT_H = 62
const OUT_Y = 322
const OUT_X = [40, 272, 504, 736]

export const OUTPUTS: Node[] = [
  { id: 'agent', x: OUT_X[0] as number, y: OUT_Y, w: OUT_W, h: OUT_H, label: { en: 'Work that runs itself', vi: 'Việc tự nó chạy' }, phase: 5 },
  { id: 'mobile', x: OUT_X[1] as number, y: OUT_Y, w: OUT_W, h: OUT_H, label: { en: 'A phone app', vi: 'App điện thoại' }, phase: 5 },
  { id: 'web', x: OUT_X[2] as number, y: OUT_Y, w: OUT_W, h: OUT_H, label: { en: 'A web product', vi: 'Sản phẩm web' }, phase: 5 },
  { id: 'saas', x: OUT_X[3] as number, y: OUT_Y, w: OUT_W, h: OUT_H, label: { en: 'A paid product', vi: 'Sản phẩm thu phí' }, phase: 5 },
]

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

export interface Curve {
  x1: number
  y1: number
  cx1: number
  cy1: number
  cx2: number
  cy2: number
  x2: number
  y2: number
}

export interface Link {
  id: string
  d: string
  curve: Curve
  phase: number
}

/** Sample a cubic bezier into a polyline the particle layer can walk. */
export function samplePath(c: Curve, steps = 48): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const u = 1 - t
    const a = u * u * u
    const b = 3 * u * u * t
    const d = 3 * u * t * t
    const e = t * t * t
    pts.push({
      x: a * c.x1 + b * c.cx1 + d * c.cx2 + e * c.x2,
      y: a * c.y1 + b * c.cy1 + d * c.cy2 + e * c.y2,
    })
  }
  return pts
}

function curveTo(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  bend: 'h' | 'v',
): Curve {
  if (bend === 'h') {
    const dx = (x2 - x1) * 0.5
    return { x1, y1, cx1: x1 + dx, cy1: y1, cx2: x2 - dx, cy2: y2, x2, y2 }
  }
  const dy = (y2 - y1) * 0.55
  return { x1, y1, cx1: x1, cy1: y1 + dy, cx2: x2, cy2: y2 - dy, x2, y2 }
}

function toLink(id: string, curve: Curve, phase: number): Link {
  return {
    id,
    curve,
    d: `M ${curve.x1} ${curve.y1} C ${curve.cx1} ${curve.cy1}, ${curve.cx2} ${curve.cy2}, ${curve.x2} ${curve.y2}`,
    phase,
  }
}

const LIVE = STAGES[3] as Node

export const LINKS: Link[] = [
  // Step to step, left to right.
  ...STAGES.slice(0, -1).map((s, i) => {
    const next = STAGES[i + 1] as Node
    return toLink(
      `${s.id}-${next.id}`,
      curveTo(s.x + s.w, cy(s), next.x, cy(next), 'h'),
      next.phase,
    )
  }),
  // Going live fans out into whatever the thing turned out to be.
  ...OUTPUTS.map((o) =>
    toLink(`live-${o.id}`, curveTo(cx(LIVE), LIVE.y + LIVE.h, cx(o), o.y, 'v'), 5),
  ),
]

/** The improvement loop, drawn above the row so it reads as a return. */
export const LOOP_PATH = `M ${cx(LIVE)} ${LIVE.y} C ${cx(LIVE)} ${LIVE.y - 62}, ${cx(STAGES[2] as Node)} ${LIVE.y - 62}, ${cx(STAGES[2] as Node)} ${LIVE.y}`

export const LAST_PHASE = 8
