import { test, expect, type Locator, type Page } from '@playwright/test'

/**
 * FIG. 1's section line — the page's only real interaction, and therefore the
 * only place where a silent regression costs the site its argument.
 *
 * Geometry mirrored from `src/components/signature/nodes.ts`. It is duplicated
 * rather than imported so that a change to the drawing's numbers has to be
 * acknowledged here: if a stop moves and this file still says 724, the drag test
 * fails and someone reads the diff. Importing would let the test silently agree
 * with whatever the source now claims.
 */
const VIEW_W = 1000
const STOPS = [260, 492, 724, 976]
const DEFAULT_STOP = 2
const LAST_STOP = STOPS.length - 1
/** Stage boxes live at these x's; only those right of the line run for real. */
const STAGE_X = [40, 272, 504, 736]

const FIG1 = {
  en: {
    svg: /^From problem to running\./,
    thumb: 'Where it goes live',
    callout: 'WHAT IT TURNS INTO',
    stops: [
      /^Live as soon as we agree/,
      /^Live while I am still building/,
      /^Live when it is built/,
      /^Nothing goes live/,
    ],
  },
  vi: {
    svg: /^Từ vấn đề đến chạy thật\./,
    thumb: 'Chỗ nó bắt đầu chạy thật',
    callout: 'NÓ THÀNH CÁI GÌ',
    stops: [
      /^Chạy thật ngay khi chốt xong/,
      /^Chạy thật khi tôi còn đang xây/,
      /^Chạy thật khi xây xong/,
      /^Không có gì chạy thật/,
    ],
  },
} as const

/**
 * The drawing and the phone control are both in the DOM at every width; one is
 * `display:none` per breakpoint. Playwright's role engine only sees the one in
 * the accessibility tree, which is exactly the one a visitor can reach — so
 * `getByRole('slider')` resolving to a single node is itself an assertion worth
 * making, not an accident to work around.
 */
function visibleSlider(page: Page): Locator {
  return page.getByRole('slider')
}

/**
 * `noUncheckedIndexedAccess` is on. A missing entry here is a bug in this file's
 * own copy table, not a runtime possibility, so it throws instead of widening
 * every assertion to accept `undefined`.
 */
function stopText(stops: readonly RegExp[], i: number): RegExp {
  const value = stops[i]
  if (!value) throw new Error(`no expected aria-valuetext recorded for stop ${i}`)
  return value
}

/** Resolve a design token to the rgb() string a computed style will report. */
async function token(page: Page, name: string): Promise<string> {
  return page.evaluate((n) => {
    const probe = document.createElement('span')
    probe.style.color = `var(${n})`
    document.body.append(probe)
    const rgb = getComputedStyle(probe).color
    probe.remove()
    return rgb
  }, name)
}

test.describe('FIG. 1 threshold control', () => {
  test('there is exactly one reachable slider per breakpoint', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('slider')).toHaveCount(1)
    // Both variants are always rendered; only one is ever exposed.
    await expect(page.locator('[role="slider"]')).toHaveCount(2)

    await page.setViewportSize({ width: 390, height: 844 })
    await expect(page.getByRole('slider')).toHaveCount(1)
    await expect(page.locator('[role="slider"]')).toHaveCount(2)
  })

  for (const [locale, path] of [
    ['en', '/'],
    ['vi', '/vi'],
  ] as const) {
    const copy = FIG1[locale]

    test(`[${locale}] keyboard walks the stops and reports each one`, async ({ page }) => {
      await page.goto(path)
      const slider = visibleSlider(page)

      await expect(slider).toHaveAttribute('aria-label', copy.thumb)
      await expect(slider).toHaveAttribute('aria-valuemin', '0')
      await expect(slider).toHaveAttribute('aria-valuemax', String(LAST_STOP))
      await expect(slider).toHaveAttribute('aria-valuenow', String(DEFAULT_STOP))
      await expect(slider).toHaveAttribute('aria-valuetext', stopText(copy.stops, DEFAULT_STOP))

      await slider.focus()
      await expect(slider).toBeFocused()

      // End / Home are the cheap way to prove the ends are reachable at all.
      await page.keyboard.press('End')
      await expect(slider).toHaveAttribute('aria-valuenow', String(LAST_STOP))
      await expect(slider).toHaveAttribute('aria-valuetext', stopText(copy.stops, LAST_STOP))

      await page.keyboard.press('Home')
      await expect(slider).toHaveAttribute('aria-valuenow', '0')
      await expect(slider).toHaveAttribute('aria-valuetext', stopText(copy.stops, 0))

      // ArrowLeft at stop 0 must clamp, not wrap: a section line has ends.
      await page.keyboard.press('ArrowLeft')
      await expect(slider).toHaveAttribute('aria-valuenow', '0')

      for (let i = 1; i <= LAST_STOP; i++) {
        await page.keyboard.press('ArrowRight')
        await expect(slider).toHaveAttribute('aria-valuenow', String(i))
        await expect(slider).toHaveAttribute('aria-valuetext', stopText(copy.stops, i))
      }

      // And clamps at the far end too.
      await page.keyboard.press('ArrowRight')
      await expect(slider).toHaveAttribute('aria-valuenow', String(LAST_STOP))

      await page.keyboard.press('ArrowLeft')
      await expect(slider).toHaveAttribute('aria-valuenow', String(LAST_STOP - 1))
    })

    test(`[${locale}] at the last stop the callout list disappears`, async ({ page }) => {
      await page.goto(path)
      const svg = page.getByRole('img', { name: copy.svg })
      const slider = visibleSlider(page)

      /**
       * The callout group has no role of its own — it is drawing, not content —
       * so it is found by the label it carries. `opacity` is read off the group
       * because that is the property the component animates; asserting on the
       * child text would report 1 no matter what the parent does.
       */
      const calloutOpacity = () =>
        svg.evaluate((el, label) => {
          const hit = Array.from(el.querySelectorAll('text')).find(
            (t) => t.textContent?.trim() === label,
          )
          const group = hit?.parentElement
          return group ? getComputedStyle(group).opacity : null
        }, copy.callout)

      await expect.poll(calloutOpacity).toBe('1')

      await slider.focus()
      await page.keyboard.press('End')
      await expect(slider).toHaveAttribute('aria-valuenow', String(LAST_STOP))

      // This is the argument the drawing makes: put the line all the way right —
      // nothing ever ships — and there is nothing to show for it.
      await expect.poll(calloutOpacity).toBe('0')

      await page.keyboard.press('Home')
      await expect.poll(calloutOpacity).toBe('1')
    })

    test(`[${locale}] at the default stop exactly one stage box is live`, async ({ page }) => {
      await page.goto(path)
      const svg = page.getByRole('img', { name: copy.svg })
      await expect(visibleSlider(page)).toHaveAttribute('aria-valuenow', String(DEFAULT_STOP))

      const live = await token(page, '--color-live')
      const plan = await token(page, '--color-plan')

      const strokes = () =>
        svg.evaluate(
          (el, xs) =>
            xs.map((x) => {
              const rect = el.querySelector(`rect[x="${x}"]`)
              return rect ? getComputedStyle(rect).stroke : 'MISSING'
            }),
          STAGE_X,
        )

      // Stop 2 sits between "I build, you check" and "It goes live": three
      // stages still on paper, one running.
      await expect.poll(strokes).toEqual([plan, plan, plan, live])
    })
  }

  test('a pointer drag lands on the nearest stop, not where the pointer stopped', async ({
    page,
  }) => {
    await page.goto('/')
    const svg = page.getByRole('img', { name: FIG1.en.svg })
    // The pointer surface is the track wrapping the drawing; the thumb only
    // takes focus. Reaching it through the svg keeps this off a CSS class.
    const track = svg.locator('xpath=..')
    const slider = visibleSlider(page)

    const dragTo = async (ratio: number) => {
      // FIG. 1 sits below the fold at 1440x900, and `page.mouse` works in
      // viewport coordinates — without this the pointer is dispatched off-window
      // and the drag silently does nothing.
      await track.scrollIntoViewIfNeeded()
      const box = await track.boundingBox()
      if (!box) throw new Error('FIG. 1 track has no box — is the drawing rendered?')
      const y = box.y + box.height / 2
      await page.mouse.move(box.x + box.width * 0.5, y)
      await page.mouse.down()
      await page.mouse.move(box.x + box.width * ratio, y, { steps: 8 })
      await page.mouse.up()
    }

    // Each ratio is deliberately *off* a stop, so passing means it snapped
    // rather than merely followed the pointer.
    for (const [ratio, expected] of [
      [0.46, 1],
      [0.2, 0],
      [0.78, 2],
      [0.99, 3],
    ] as const) {
      await dragTo(ratio)
      await expect(slider).toHaveAttribute('aria-valuenow', String(expected))
      // The reported position must agree with the stop the drag chose.
      await expect(slider).toHaveAttribute('aria-valuetext', stopText(FIG1.en.stops, expected))
    }

    // Sanity-check the geometry this test encodes: 0.46 of the track is x=460,
    // which is nearer STOPS[1]=492 than STOPS[0]=260.
    expect(Math.round(0.46 * VIEW_W)).toBe(460)
    expect(STOPS[DEFAULT_STOP]).toBe(724)
  })

  test('the phone control is operable by keyboard too', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    const slider = visibleSlider(page)

    // Proves we are on the stacked variant, not the drawing.
    await expect(page.getByRole('img', { name: FIG1.en.svg })).toBeHidden()

    await slider.focus()
    await page.keyboard.press('Home')
    await expect(slider).toHaveAttribute('aria-valuenow', '0')
    await page.keyboard.press('End')
    await expect(slider).toHaveAttribute('aria-valuenow', String(LAST_STOP))
    await expect(slider).toHaveAttribute('aria-valuetext', stopText(FIG1.en.stops, LAST_STOP))
  })
})
