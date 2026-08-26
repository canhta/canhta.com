import { defineConfig, devices } from '@playwright/test'

/**
 * The dev server on :3111 is usually already up and owned by the person running
 * the suite, so `reuseExistingServer` is not a convenience here — starting a
 * second Next dev on the same port is how you get a suite that fails for
 * reasons that have nothing to do with the site.
 *
 * `ALLOW_FIXTURES=1` matters when Playwright *does* have to start the server:
 * `src/content/index.ts` refuses to load fixture content without it.
 */
const PORT = 3111
const BASE_URL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  /**
   * One Next dev server compiles routes on demand and serves every worker. Four
   * workers keeps it busy without queueing requests behind each other's cold
   * compiles.
   */
  workers: process.env.CI ? 2 : 4,
  reporter: process.env.CI ? [['github'], ['list']] : [['list']],
  /** A cold Next dev compile of `/` can take ~20s; the default 30s expect
   *  timeout is fine but the per-test budget is not. */
  timeout: 90_000,
  expect: { timeout: 10_000 },

  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    /**
     * The desktop breakpoint. FIG. 1's drawing is `hidden lg:block`, so below
     * 1024px the suite would be testing the stacked fallback by accident.
     * Specs that care about a narrower viewport override this with `test.use`.
     */
    viewport: { width: 1440, height: 900 },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
  ],

  webServer: {
    command: 'pnpm exec next dev --port 3111',
    port: PORT,
    reuseExistingServer: true,
    timeout: 180_000,
    env: { ALLOW_FIXTURES: '1' },
  },
})
