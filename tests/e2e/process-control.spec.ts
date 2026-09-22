import { test, expect, type Page } from '@playwright/test'

/**
 * The page's only real interaction, and therefore the only place where a silent
 * regression costs the site its argument.
 *
 * WHAT THIS SPEC USED TO COVER. A draughtsman's section line dragged across a
 * 1000x360 SVG, with a duplicated stop geometry table so a change to the
 * drawing's numbers had to be acknowledged here. The control needed a hand-built
 * `role="slider"`, hand-built `aria-valuetext`, a pointer-capture drag, a
 * snap-to-nearest-stop routine, and a completely separate horizontal strip for
 * screens under 1024px — where the SVG was hidden, so the spatial argument the
 * control exists to make simply did not exist on a phone.
 *
 * A radio group needs none of that, which is why the tests below are mostly
 * about behaviour rather than mechanism. The parts that are hard to get right —
 * arrow-key navigation, grouped announcement, one-selection invariance, 44px
 * targets — are the browser's, and the parts left to us are the ones that carry
 * the meaning.
 */

const COPY = {
  en: {
    path: '/',
    group: /it goes live/i,
    running: 'Running for real',
    planned: 'Still on paper',
    choices: [/as soon as we agree/i, /while i am building/i, /when it is built/i, /^never$/i],
    consequences: [
      /^Live as soon as we agree/,
      /^Live while I am still building/,
      /^Live when it is built/,
      /^Nothing goes live/,
    ],
  },
} as const

const DEFAULT_STOP = 2
const STEPS = 4

/**
 * `noUncheckedIndexedAccess` is on. A missing entry is a bug in this file's own
 * copy table, not a runtime possibility, so it throws rather than widening every
 * assertion to accept `undefined`.
 */
function at<T>(list: readonly T[], i: number, what: string): T {
  const value = list[i]
  if (value === undefined) throw new Error(`no ${what} recorded for stop ${i}`)
  return value
}

/** How many steps currently say, in words, that they are running for real. */
async function runningCount(page: Page, label: string): Promise<number> {
  return page.getByText(label, { exact: true }).count()
}

for (const locale of ['en'] as const) {
  const copy = COPY[locale]

  test(`[${locale}] presents one grouped set of four choices`, async ({ page }) => {
    await page.goto(copy.path)

    const group = page.getByRole('group', { name: copy.group })
    await expect(group).toHaveCount(1)

    const options = page.getByRole('radio')
    await expect(options).toHaveCount(4)
    for (const [i, name] of copy.choices.entries()) {
      await expect(page.getByRole('radio', { name: at(copy.choices, i, 'choice') })).toBeVisible()
      expect(name).toBeDefined()
    }

    // Exactly one selected, and it is the position Canh actually argues for.
    await expect(options.nth(DEFAULT_STOP)).toBeChecked()
    await expect(page.getByText(at(copy.consequences, DEFAULT_STOP, 'consequence'))).toBeVisible()
  })

  test(`[${locale}] each choice moves the line and says what it costs`, async ({ page }) => {
    await page.goto(copy.path)
    const options = page.getByRole('radio')

    for (let stop = 0; stop < 4; stop++) {
      await options.nth(stop).check()
      await expect(options.nth(stop)).toBeChecked()

      // Choosing stop `i` runs every step after it. The last choice — the line
      // pushed past the end — is the version where nothing ever ships, and the
      // panel has to show that honestly rather than quietly keeping one lit.
      expect(
        await runningCount(page, copy.running),
        `stop ${stop} marked the wrong number of steps as running`,
      ).toBe(STEPS - 1 - stop)

      await expect(page.getByText(at(copy.consequences, stop, 'consequence'))).toBeVisible()
    }
  })

  test(`[${locale}] arrow keys walk the choices, for free`, async ({ page }) => {
    await page.goto(copy.path)
    const options = page.getByRole('radio')

    await options.first().check()
    await expect(options.first()).toBeFocused()

    for (let stop = 1; stop < 4; stop++) {
      await page.keyboard.press('ArrowRight')
      await expect(options.nth(stop)).toBeChecked()
    }

    // A radio group wraps; that is the platform convention and it is correct
    // here, because the four choices are a cycle of options rather than a scale
    // with ends. (The old slider had to implement clamping by hand.)
    await page.keyboard.press('ArrowRight')
    await expect(options.first()).toBeChecked()
  })

  test(`[${locale}] never conveys the state by colour alone`, async ({ page }) => {
    await page.goto(copy.path)

    // Every step says which side of the line it is on, in words — the running
    // ones on screen, the planned ones to a screen reader.
    const said = (await runningCount(page, copy.running)) +
      (await page.getByText(copy.planned, { exact: true }).count())
    expect(said, 'a step communicates its state only with colour').toBe(STEPS)
  })
}

test('[en] the same control serves a phone, with no separate fallback', async ({ page }) => {
  // The regression this replaced: below 1024px the SVG was hidden and a second,
  // differently-shaped control took over, so the majority of visitors met a bare
  // slider attached to a vertical list for no visible reason.
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  const options = page.getByRole('radio')
  await expect(options).toHaveCount(4)
  for (let i = 0; i < 4; i++) await expect(options.nth(i)).toBeVisible()

  await expect(page.locator('ol li')).toHaveCount(4)

  // The whole widget is one DOM subtree, not two with one hidden per breakpoint.
  await expect(page.getByRole('group', { name: COPY.en.group })).toHaveCount(1)

  // Targets a thumb can actually hit.
  // The input itself is `sr-only`; the target a thumb hits is its label.
  for (const box of await page.getByRole('radio').evaluateAll((els) =>
    els.map((el) => {
      const target = (el as HTMLInputElement).labels?.[0] ?? el
      const r = target.getBoundingClientRect()
      return { w: r.width, h: r.height }
    }),
  )) {
    expect(box.h, 'a choice is under the 44px minimum target height').toBeGreaterThanOrEqual(44)
  }

  await options.first().check()
  await expect(options.first()).toBeChecked()
})
