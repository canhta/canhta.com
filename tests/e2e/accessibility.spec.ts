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
 * NOTE ON THE CURRENT STATE OF THIS SPEC. It fails, and it is supposed to. Two
 * real colour-contrast defects are live on the page (see the failure output, and
 * the report handed over with this suite). The rule is not excluded and the
 * offending nodes are not allow-listed, because an a11y suite whose baseline
 * encodes today's defects stops being a gate and becomes a record of them. Fix
 * the source and this goes green with no edit here.
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
 * FIG. 1 is the one custom widget on the page, so it gets its own pass with the
 * line moved: a slider that is only accessible in its default position is not
 * an accessible slider.
 */
test('[en] FIG. 1 stays accessible at every stop', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  const slider = page.getByRole('slider')
  await slider.focus()
  await page.keyboard.press('Home')

  for (let stop = 0; stop < 4; stop++) {
    await expect(slider).toHaveAttribute('aria-valuenow', String(stop))
    const results = await new AxeBuilder({ page })
      .withTags(TAGS)
      // The two `figure-primary` sections — FIG. 1 and FIG. 2. Scoping keeps the
      // page-level defects out of this test so a regression in the widget itself
      // is not lost among them.
      .include('.figure-primary')
      .analyze()
    const violations = results.violations as unknown as AxeViolation[]
    expect(
      summarise(violations),
      `axe found violations inside FIG. 1 at stop ${stop}:\n\n${report(violations)}\n`,
    ).toEqual([])
    if (stop < 3) await page.keyboard.press('ArrowRight')
  }
})

/**
 * A guard on the axe run itself. `incomplete` results are checks axe could not
 * decide — on this page that is overwhelmingly colour-contrast against the
 * sheet's background-image grid, which axe cannot sample. They are not failures,
 * but a sudden change in how many there are means the page's colour model moved
 * somewhere a machine can no longer verify.
 */
test('[en] contrast remains machine-checkable', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  const results = await scan(page)
  const incomplete = results.incomplete as unknown as AxeViolation[]
  const byRule = incomplete.map((r) => `${r.id} (${r.nodes.length})`).sort()

  /**
   * Today the only undecidable rule is `color-contrast`, and the reason is
   * `body { background-image: … }` in globals.css — the sheet grid. axe cannot
   * sample a gradient, so it declines to judge roughly 144 text nodes rather
   * than guessing. That is a real coverage hole (see the handover notes), but it
   * is a *known* one.
   *
   * Asserting on the rule identity rather than the node count means a new kind
   * of uncheckable failure shows up here, while reflowing the page does not.
   */
  const rules = new Set(incomplete.map((r) => r.id))
  expect(
    [...rules].sort(),
    `axe became unable to decide a new rule. Full breakdown: ${byRule.join(', ')}`,
  ).toEqual(['color-contrast'])
})
