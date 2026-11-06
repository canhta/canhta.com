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
    // next-intl's navigation helpers import `next/navigation` without the extension,
    // which Node's ESM resolver rejects; inlining lets Vite resolve it.
    server: { deps: { inline: ['next-intl'] } },
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    // Unit tests live in `tests/unit`.
    include: ['tests/unit/**/*.test.{ts,tsx}'],
  },
})
