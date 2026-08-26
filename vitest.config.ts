import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Mirrors the `@/*` path mapping in tsconfig.json. Vitest does not read
      // tsconfig paths on its own.
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    // Unit tests own `tests/unit`. `tests/e2e` is Playwright's and must never be
    // collected here — Playwright's `test`/`expect` are not Vitest's.
    include: ['tests/unit/**/*.test.{ts,tsx}'],
    env: {
      // `src/content/index.ts` refuses to load fixture content without this.
      // The guard itself is exercised in tests/unit/content-guard.test.ts, which
      // unsets this deliberately.
      ALLOW_FIXTURES: '1',
    },
  },
})
