import { describe, expect, it } from 'vitest'
import { PEN, penTime } from '@/lib/motion'

const FLOOR = 0.16
const CEIL = 1.1

describe('penTime', () => {
  it('clamps at the floor so a short stroke does not blink', () => {
    expect(penTime(0)).toBe(FLOOR)
    expect(penTime(1)).toBe(FLOOR)
    // The exact px at which the floor stops binding.
    expect(penTime(FLOOR * PEN)).toBeCloseTo(FLOOR, 10)
  })

  it('clamps at the ceiling so a full-bleed rule does not crawl', () => {
    expect(penTime(CEIL * PEN + 1)).toBe(CEIL)
    expect(penTime(100_000)).toBe(CEIL)
  })

  it('derives duration from distance between the clamps', () => {
    // The whole point of a pen speed: a 1060px rule must take longer than a
    // 200px one, or the animation is a fade in costume.
    expect(penTime(700)).toBeCloseTo(0.5, 10)
    expect(penTime(1060)).toBeGreaterThan(penTime(200))
  })

  it('is monotonic across the whole range', () => {
    let previous = -Infinity
    for (let px = 0; px <= 2000; px += 5) {
      const current = penTime(px)
      expect(current).toBeGreaterThanOrEqual(previous)
      expect(current).toBeGreaterThanOrEqual(FLOOR)
      expect(current).toBeLessThanOrEqual(CEIL)
      previous = current
    }
  })

  it('takes a slower speed as an argument and yields a longer time', () => {
    expect(penTime(700, PEN / 2)).toBeGreaterThan(penTime(700, PEN))
  })

  it('clamps a negative length rather than returning a negative duration', () => {
    expect(penTime(-500)).toBe(FLOOR)
  })
})
