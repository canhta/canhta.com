import { describe, expect, it } from 'vitest'
import {
  CONNECTORS,
  DEFAULT_STOP,
  LOOP,
  OUTPUTS,
  STAGES,
  STOPS,
  TICKS,
  anyStageLive,
  isLive,
} from '@/components/signature/nodes'

const stopAt = (index: number): number => {
  const stop = STOPS[index]
  if (stop === undefined) throw new Error(`no stop ${index}`)
  return stop
}

const liveStages = (threshold: number) => STAGES.filter((s) => isLive(s.x, threshold))

describe('the section line', () => {
  it('has one rest position per gap in the stage row, plus one past the end', () => {
    expect(STOPS).toHaveLength(STAGES.length)
    expect([...STOPS]).toEqual([...STOPS].sort((a, b) => a - b))
  })

  it('turns one more stage to paper at each stop', () => {
    // Drag right and the work moves back onto paper, one stage at a time.
    expect(liveStages(stopAt(0))).toHaveLength(3)
    expect(liveStages(stopAt(1))).toHaveLength(2)
    expect(liveStages(stopAt(2))).toHaveLength(1)
    expect(liveStages(stopAt(3))).toHaveLength(0)
  })

  it('leaves exactly one stage live at the default stop', () => {
    const live = liveStages(stopAt(DEFAULT_STOP))
    expect(live).toHaveLength(1)
    // The drawing as it rests: three stages on paper, "It goes live" running.
    expect(live[0]?.id).toBe('live')
  })

  it('leaves nothing live at the last stop', () => {
    const last = stopAt(STOPS.length - 1)
    expect(liveStages(last)).toHaveLength(0)
    expect(anyStageLive(last)).toBe(false)
  })

  it('keeps the products on the sheet only while something is live', () => {
    // The argument the drawing makes: drag the line all the way right and the
    // outputs disappear, because nothing has gone live to produce them.
    expect(anyStageLive(stopAt(0))).toBe(true)
    expect(anyStageLive(stopAt(1))).toBe(true)
    expect(anyStageLive(stopAt(DEFAULT_STOP))).toBe(true)
    expect(anyStageLive(stopAt(3))).toBe(false)
  })

  it('is monotonic: dragging right never turns something live again', () => {
    for (const stage of STAGES) {
      let previous = true
      for (let i = 0; i < STOPS.length; i += 1) {
        const current = isLive(stage.x, stopAt(i))
        expect(Number(current)).toBeLessThanOrEqual(Number(previous))
        previous = current
      }
    }
  })
})

describe('isLive', () => {
  it('treats only strictly-right-of-the-line as live', () => {
    expect(isLive(101, 100)).toBe(true)
    expect(isLive(100, 100)).toBe(false)
    expect(isLive(99, 100)).toBe(false)
  })
})

describe('the drawing itself', () => {
  it('draws one connector between each pair of stages', () => {
    expect(CONNECTORS).toHaveLength(STAGES.length - 1)
  })

  it('draws one tick per output', () => {
    expect(TICKS).toHaveLength(OUTPUTS.length)
    expect(OUTPUTS).toHaveLength(4)
  })

  it('gives the improvement loop an arrowhead, so it reads as a direction', () => {
    // Two `M` commands: the curve, then the head. A loop with no head is a
    // decoration.
    expect(LOOP.d.match(/M /g)).toHaveLength(2)
  })

  it('gives every node a distinct id', () => {
    const ids = [...STAGES, ...OUTPUTS].map((n) => n.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
