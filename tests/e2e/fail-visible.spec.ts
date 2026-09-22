import { test, expect, type Page } from '@playwright/test'

/**
 * The highest-value spec in the suite.
 *
 * This site has shipped a blank-content regression three separate times, always
 * the same shape: a reveal whose *resting* state is the hidden one. Server HTML
 * paints, then either a keyframe's `from` sticks, or an IntersectionObserver
 * never fires, or hydration flips an animated element back to `initial` — and
 * the page renders as empty paper. Every one of those failures reproduces with
 * JavaScript switched off, which is why that is the environment here.
 *
 * The rule the whole site is held to: content is present at frame zero, and
 * motion may only animate *away from* a hidden state, never into one.
 *
 * The current design removes the class of bug outright — there is no
 * reveal-on-scroll, no motion library and no intro animation anywhere — so this
 * spec is now a guard against reintroducing one rather than a check on
 * something delicate. It stays for exactly that reason.
 */

/** The steps of the process panel, which used to be an SVG that had to be drawn. */
const STEP_COUNT = 4

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
      viewport: { width: 1440, height: 900 },
    })
    const page = await context.newPage()

    try {
      await page.goto(path)

      /**
       * Wait on the animations themselves rather than a fixed timeout. There
       * should be none at load — that is half the point of this spec — but an
       * animation that never completes must still fail rather than be sampled
       * mid-flight and pass by luck.
       */
      await page.evaluate(
        () =>
          Promise.all(
            document.getAnimations().map((a) => a.finished.catch(() => undefined)),
          ) as Promise<unknown>,
      )

      // ---- The hook ----------------------------------------------------
      const h1 = page.locator('h1')
      await expect(h1).toHaveCount(1)
      await expect(h1).toBeVisible()
      const [hook] = await paintedState(page, 'h1')
      expect(hook!.opacity, 'h1 is transparent').not.toBe('0')
      expect(hook!.clipPath, 'h1 is clipped away').not.toMatch(/inset\(\s*0px\s+100%/)
      expect(hook!.text.length, 'h1 rendered empty').toBeGreaterThan(0)
      expect(hook!.width, 'h1 has no painted width').toBeGreaterThan(0)

      // ---- Every section heading ---------------------------------------
      const headings = page.locator('h2')
      await expect(headings).toHaveCount(6)

      const painted = await paintedState(page, 'h2')
      for (const [i, h] of painted.entries()) {
        expect(h.text, `section heading ${i + 1} is empty`).not.toHaveLength(0)
        expect(h.opacity, `h2 ${i + 1} is transparent`).not.toBe('0')
        expect(h.visibility, `h2 ${i + 1} visibility`).toBe('visible')
        expect(h.display, `h2 ${i + 1} display`).not.toBe('none')
        expect(h.height, `h2 ${i + 1} has no painted height`).toBeGreaterThan(0)
      }
      for (let i = 0; i < 6; i++) {
        await expect(headings.nth(i)).toBeVisible()
      }

      /**
       * The process panel is the one piece of state on the page. Without
       * JavaScript the radios cannot move, but the panel must still render its
       * default position as readable content — the four steps, the four
       * choices, and the sentence saying what the current choice means.
       */
      const steps = page.locator('ol li')
      await expect(steps).toHaveCount(STEP_COUNT)
      for (let i = 0; i < STEP_COUNT; i++) await expect(steps.nth(i)).toBeVisible()

      const options = page.getByRole('radio')
      await expect(options).toHaveCount(4)
      const checked = await options.evaluateAll((els) =>
        els.filter((el) => (el as HTMLInputElement).checked).length,
      )
      expect(checked, 'no option is selected without JavaScript').toBe(1)

      // ---- Nothing anywhere resting at zero ----------------------------
      const invisible = await page.evaluate(() =>
        Array.from(document.querySelectorAll('main *'))
          .filter((el) => {
            const s = getComputedStyle(el)
            if (s.display === 'none' || s.visibility === 'hidden') return false // deliberate
            if (el.closest('[aria-hidden="true"]')) return false // decoration
            if (el.className.toString().includes('sr-only')) return false // deliberate
            // A radio input stretched transparent over its own label: the
            // control a person sees IS the label, and the input is invisible on
            // purpose so the whole chip is the hit target. It is a control, not
            // content, so it is not what this walk is looking for.
            if (el instanceof HTMLInputElement) return false
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

/**
 * The structural guarantee behind all of the above: no scroll-triggered reveal
 * exists to break. Asserted on the shipped DOM rather than on the source, so it
 * also catches one arriving through a dependency.
 */
test('[en] nothing on the page waits for a scroll observer', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')

  const animated = await page.evaluate(() =>
    Array.from(document.querySelectorAll('main *'))
      .filter((el) => {
        const name = getComputedStyle(el).animationName
        return name !== 'none' && name !== ''
      })
      .slice(0, 10)
      .map((el) => `${el.tagName}.${(el.className || '').toString().slice(0, 60)}`),
  )
  expect(animated, 'an element is running a load animation again').toEqual([])
})
