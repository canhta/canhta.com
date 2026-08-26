/**
 * The single source of motion truth.
 *
 * The direction is a technical drawing, so the governing idea is a PEN SPEED,
 * not a set of durations. A machine that draws a 200px rule and a 1060px rule in
 * the same time is a fade wearing a costume — every drawn length derives its
 * duration from how far the pen has to travel.
 */

/**
 * Horizontal pen travel, px per second.
 *
 * There was a `PEN_V = 2600` here for "vertical carriage travel". It changed
 * zero pixels on the page: the only strokes ever flagged vertical were 28 units
 * long, and 28 / 2600 clamps to the same 0.16s floor as 28 / 1400. A constant
 * that cannot affect output is a comment pretending to be code.
 */
export const PEN = 1400

/** Seconds for the pen to cover `px`, clamped so nothing crawls or blinks. */
export function penTime(px: number, speed: number = PEN): number {
  return Math.min(1.1, Math.max(0.16, px / speed))
}

export const duration = {
  /** a mechanism engaging */
  state: 0.28,
  /** an annotation landing */
  stamp: 0.11,
} as const

export const ease = {
  /**
   * Trapezoidal velocity: brief ramp, long constant middle, hard stop.
   * This is what a pen does. Use for anything drawn.
   */
  plot: [0.12, 0.06, 0.88, 0.94],
  /** Solenoid attack into a dead stop. Use for annotations landing. */
  stamp: [0.2, 0, 0, 1],
  /** Symmetric. Use for a mechanism engaging — ignition, state changes. */
  mech: [0.83, 0, 0.17, 1],
  /** Soft product easing. Colour transitions on hover only, nothing else. */
  out: [0.22, 1, 0.36, 1],
  /**
   * Critically damped (ζ ≈ 1.04) — fast, and it does not overshoot.
   * The previous value was ζ = 0.92, which bounced.
   */
  spring: { type: 'spring', stiffness: 300, damping: 36, mass: 1 },
} as const
