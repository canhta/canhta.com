import { test, expect, type Page } from '@playwright/test'

/**
 * The highest-value spec in the suite.
 *
 * This site has shipped a blank-content regression three separate times, always
 * the same shape: a reveal whose *resting* state is the hidden one. Server HTML
 * paints, then either a keyframe's `from` sticks, or an IntersectionObserver
 * never fires, or hydration flips a Motion element back to `initial` — and the
 * page renders as empty paper. Every one of those failures reproduces with
 * JavaScript switched off, which is why that is the environment here.
 *
 * The rule the whole site is held to: content is present at frame zero, and
 * motion may only animate *away from* a hidden state, never into one.
 */

const SECTION_HEADINGS = {
  en: [
    'From problem to running',
    'What I have built',
    'Where I can help',
    'Ways to work together',
    'Before you write to me',
  ],
  vi: [
    'Từ vấn đề đến chạy thật',
    'Tôi đã xây gì',
    'Tôi giúp được gì',
    'Cách hợp tác',
    'Trước khi bạn nhắn cho tôi',
  ],
} as const

const FIG1_LABEL = {
  en: /^From problem to running\./,
  vi: /^Từ vấn đề đến chạy thật\./,
} as const

/** `inset(0px 100%)` is the `wipe` keyframe's `from`. Seeing it at rest means
 *  the animation never ran and the text is clipped to nothing. */
function assertNotClipped(clipPath: string, opacity: string, what: string) {
  expect(clipPath, `${what} is clipped away (clip-path: ${clipPath})`).not.toMatch(
    /inset\(\s*0px\s+100%/,
  )
  expect(opacity, `${what} is transparent`).not.toBe('0')
}

async function paintedState(page: Page, selector: string) {
  return page.locator(selector).evaluateAll((els) =>
    els.map((el) => {
      const s = getComputedStyle(el)
      const r = el.getBoundingClientRect()
      return {
        text: (el.textContent ?? '').trim(),
        clipPath: s.clipPath,
        opacity: s.opacity,
        visibility: s.visibility,
        display: s.display,
        width: r.width,
        height: r.height,
      }
    }),
  )
}

for (const [locale, path] of [
  ['en', '/'],
  ['vi', '/vi'],
] as const) {
  test(`[${locale}] renders fully with JavaScript disabled`, async ({ browser }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      // 1440 keeps FIG. 1's drawing above the `lg` breakpoint, so the SVG this
      // test is about is the thing actually on screen.
      viewport: { width: 1440, height: 900 },
    })
    const page = await context.newPage()

    try {
      await page.goto(path)

      /**
       * Let the CSS intro finish before measuring.
       *
       * "Fail-visible" is a claim about the RESTING state: if an observer never
       * fires, if hydration dies, if JS is off, the content must still be on
       * screen. It is not a claim that nothing may animate — the hook carries a
       * deliberate 420ms `clip-path` wipe, and CSS animations run with JS
       * disabled, so sampling at t=0 caught that intro mid-flight and read it as
       * a permanently clipped heading.
       *
       * Waiting on the animations themselves rather than a fixed timeout keeps
       * this honest: an animation that never completes still fails the test,
       * which is the bug class this file exists to catch.
       */
      await page.evaluate(
        () =>
          Promise.all(
            document
              .getAnimations()
              .map((a) => a.finished.catch(() => undefined)),
          ) as Promise<unknown>,
      )

      // ---- The hook ----------------------------------------------------
      const h1 = page.locator('h1')
      await expect(h1).toHaveCount(1)
      await expect(h1).toBeVisible()
      const [hook] = await paintedState(page, 'h1')
      assertNotClipped(hook!.clipPath, hook!.opacity, 'h1')
      expect(hook!.text.length, 'h1 rendered empty').toBeGreaterThan(0)
      expect(hook!.width, 'h1 has no painted width').toBeGreaterThan(0)

      // ---- Every section heading ---------------------------------------
      const headings = page.locator('h2')
      await expect(headings).toHaveCount(SECTION_HEADINGS[locale].length)

      const painted = await paintedState(page, 'h2')
      for (const [i, expected] of SECTION_HEADINGS[locale].entries()) {
        const h = painted[i]!
        expect(h.text, `section heading ${i + 1} text`).toBe(expected)
        assertNotClipped(h.clipPath, h.opacity, `h2 "${expected}"`)
        expect(h.visibility, `h2 "${expected}" visibility`).toBe('visible')
        expect(h.display, `h2 "${expected}" display`).not.toBe('none')
        expect(h.height, `h2 "${expected}" has no painted height`).toBeGreaterThan(0)
      }
      for (const [i] of SECTION_HEADINGS[locale].entries()) {
        await expect(headings.nth(i)).toBeVisible()
      }

      // ---- FIG. 1 is drawn, not half-plotted ---------------------------
      const svg = page.getByRole('img', { name: FIG1_LABEL[locale] })
      await expect(svg).toBeVisible()

      const ink = await svg.evaluate((el) =>
        Array.from(el.querySelectorAll('path, rect, line')).map((node) => {
          const s = getComputedStyle(node)
          return {
            tag: node.tagName,
            d: node.getAttribute('d')?.slice(0, 40) ?? node.getAttribute('x') ?? '',
            dashOffset: s.strokeDashoffset,
            opacity: s.opacity,
          }
        }),
      )

      expect(ink.length, 'FIG. 1 drew no strokes at all').toBeGreaterThan(8)
      for (const stroke of ink) {
        // A stroke parked at a non-zero dash offset is a plotter animation that
        // never got its start signal: the line exists but no ink is on paper.
        expect(
          parseFloat(stroke.dashOffset) || 0,
          `FIG. 1 ${stroke.tag} "${stroke.d}" is undrawn (stroke-dashoffset: ${stroke.dashOffset})`,
        ).toBe(0)
      }

      // The two groups that animate opacity must rest at their visible state.
      const groupOpacities = await svg.evaluate((el) =>
        Array.from(el.querySelectorAll('g')).map((g) => getComputedStyle(g).opacity),
      )
      expect(groupOpacities.every((o) => o === '1'), 'a FIG. 1 group rests invisible').toBe(true)

      // ---- Nothing else on the sheet resting at zero -------------------
      const invisible = await page.evaluate(() =>
        Array.from(document.querySelectorAll('main *'))
          .filter((el) => {
            const s = getComputedStyle(el)
            if (s.display === 'none' || s.visibility === 'hidden') return false // deliberate
            if (el.closest('[aria-hidden="true"]')) return false // decoration
            return s.opacity === '0' || /inset\(\s*0px\s+100%/.test(s.clipPath)
          })
          .slice(0, 10)
          .map((el) => `${el.tagName}.${(el.className || '').toString().slice(0, 60)}`),
      )
      expect(invisible, 'content is resting in a hidden state without JS').toEqual([])
    } finally {
      await context.close()
    }
  })
}
