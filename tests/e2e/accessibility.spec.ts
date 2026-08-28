import { test, expect, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

/**
 * `axe-core` is a transitive dependency and pnpm does not hoist it, so its types
 * are not importable from here. Only the shape this file reads is declared.
 */
interface AxeNode {
  target: unknown[]
  html: string
  failureSummary?: string
}
interface AxeViolation {
  id: string
  impact?: string | null
  help: string
  helpUrl: string
  nodes: AxeNode[]
}

/**
 * WCAG 2.0/2.1 A and AA across both locales at the two widths the layout is
 * actually designed for.
 *
 * This spec used to fail on purpose: two real colour-contrast defects were live
 * on the page, the rule was not excluded and the offending nodes were not
 * allow-listed, because an a11y suite whose baseline encodes today's defects
 * stops being a gate and becomes a record of them. The palette that produced
 * them is gone — every foreground in the current system was chosen against the
 * ground it actually sits on — so this is green, and it is a gate again.
 */

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']

const VIEWPORTS = [
  { name: 'desktop 1440x900', width: 1440, height: 900 },
  { name: 'phone 390x844', width: 390, height: 844 },
] as const

const LOCALES = [
  { locale: 'en', path: '/' },
  { locale: 'vi', path: '/vi' },
] as const

/** axe's own summary, flattened into something readable in a CI log. */
function report(violations: AxeViolation[]): string {
  if (violations.length === 0) return 'no violations'
  return violations
    .map((v) => {
      const nodes = v.nodes
        .map(
          (n) =>
            `      target: ${JSON.stringify(n.target)}\n` +
            `      html:   ${n.html}\n` +
            `      why:    ${(n.failureSummary ?? '').replace(/\n/g, '\n              ')}`,
        )
        .join('\n\n')
      return `  [${v.impact ?? 'n/a'}] ${v.id} — ${v.help}\n  ${v.helpUrl}\n${nodes}`
    })
    .join('\n\n')
}

/** One readable line per offending node, for the assertion's diff. */
function summarise(violations: AxeViolation[]): string[] {
  return violations.flatMap((v) => v.nodes.map((n) => `${v.id} → ${n.target.join(' ')}`))
}

async function scan(page: Page) {
  return new AxeBuilder({ page }).withTags(TAGS).analyze()
}

for (const viewport of VIEWPORTS) {
  for (const { locale, path } of LOCALES) {
    test(`[${locale}] no WCAG A/AA violations at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      await page.goto(path)
      // Fonts and the hero image shift computed colours and box geometry, both
      // of which axe measures. Scanning mid-load produces findings that are
      // about the load, not about the page.
      await page.waitForLoadState('networkidle')
      await expect(page.locator('h1')).toBeVisible()

      const results = await scan(page)
      const violations = results.violations as unknown as AxeViolation[]

      /**
       * Asserted as a flat list of `rule → selector` strings rather than on the
       * raw axe objects: `toEqual([])` against those prints several hundred
       * lines of tags and check metadata, which buries the two lines that say
       * what is wrong. The full axe explanation is in the message below.
       */
      expect(
        summarise(violations),
        `axe found ${violations.length} violation(s) on ${path} at ${viewport.name}:\n\n${report(violations)}\n`,
      ).toEqual([])
    })
  }
}

/**
 * The process control is the one stateful widget on the page, so it gets its own
 * pass with the line in every position: a control that is only accessible in its
 * default state is not an accessible control.
 */
test('[en] the process control stays accessible at every choice', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  const options = page.getByRole('radio')

  for (let stop = 0; stop < 4; stop++) {
    await options.nth(stop).check()
    await expect(options.nth(stop)).toBeChecked()

    /**
     * Let the 200ms colour transition finish before axe samples.
     *
     * Without this the scan catches the previously-selected chip halfway
     * between ink and paper and reports a 2.33:1 foreground that exists for a
     * fifth of a second and is nobody's resting state. A transient frame of a
     * transition is not a WCAG failure; asserting on one produces a test that
     * fails for a reason no visitor can experience.
     */
    await page.waitForFunction(() =>
      document.getAnimations().every((a) => a.playState !== 'running'),
    )

    const results = await new AxeBuilder({ page })
      .withTags(TAGS)
      // Scoped to the panel so a regression in the widget itself is not lost
      // among anything happening elsewhere on the page.
      .include('fieldset')
      .analyze()
    const violations = results.violations as unknown as AxeViolation[]
    expect(
      summarise(violations),
      `axe found violations inside the process control at choice ${stop}:\n\n${report(violations)}\n`,
    ).toEqual([])
  }
})

/**
 * A guard on the axe run itself. `incomplete` results are checks axe could not
 * decide, and an undecidable check is a coverage hole: the rule is not passing,
 * it is unmeasured.
 *
 * This used to be pinned to `['color-contrast']`, because `body {
 * background-image: … }` painted a hairline grid across the whole page and axe
 * cannot sample a gradient — so it declined to judge roughly 144 text nodes
 * rather than guessing. Every one of those was a contrast check nobody was
 * running.
 *
 * The grid is gone and every ground on the page is now a flat colour, so axe can
 * decide all of them. The assertion is the strong one: nothing undecidable.
 */
test('[en] every contrast check is machine-decidable', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  const results = await scan(page)
  const incomplete = results.incomplete as unknown as AxeViolation[]
  const byRule = incomplete.map((r) => `${r.id} (${r.nodes.length})`).sort()

  expect(
    byRule,
    'axe cannot decide a check — something is being drawn on a ground it cannot sample',
  ).toEqual([])
})
