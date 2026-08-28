import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import tseslint from 'typescript-eslint'

/**
 * Flat config, because there is no other kind here.
 *
 * `next lint` was removed in Next 16 and `next build` no longer lints, so the
 * repo's `lint` script had been running a command that did not exist — it only
 * ever printed "Invalid project directory provided, no such directory: ./lint".
 * A lint script that cannot fail is worse than none: it reads as coverage in CI
 * and in a README while checking nothing.
 *
 * `@next/eslint-plugin-next` defaults to flat config as of 16, so flat config is
 * what this is.
 *
 * ESLint is pinned to 9, not 10. `eslint-config-next@16.3.2` declares `eslint
 * >=9`, but the parser it ships calls `scopeManager.addGlobals`, which ESLint 10
 * removed — every file throws `TypeError: scopeManager.addGlobals is not a
 * function` before a single rule runs. 9 is the version the config is actually
 * built against. Revisit when eslint-config-next ships a 10-compatible parser.
 *
 * SCOPE. This is deliberately close to the defaults. The repo already has a
 * stricter gate than any lint rule in `tsc --noEmit` with
 * `noUncheckedIndexedAccess`, and 153 tests that assert behaviour rather than
 * shape. What ESLint adds on top is the Next-specific and a11y checks that a
 * type checker cannot see — a raw `<img>` where `next/image` belongs, a missing
 * hook dependency, an anchor with no accessible name. Those are the rules worth
 * having, so nothing here turns them off.
 */
export default tseslint.config(
  {
    // Build output, dependencies, and the file Next rewrites on every command.
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts', '.agents/**', '.claude/**'],
  },

  /**
   * `core-web-vitals` rather than the base config. It is the same rule set with
   * the loading-performance rules raised from warning to error — no sync script
   * in the document, no `<img>` where `next/image` belongs, no stylesheet added
   * by hand. This site ships `@vercel/speed-insights`, so it is a site that has
   * decided to care about those numbers; warning about them would be the wrong
   * half of that decision.
   *
   * The export is an array of flat configs, not a factory — spread it, do not
   * call it.
   */
  ...nextCoreWebVitals,

  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [...tseslint.configs.recommended],
    rules: {
      /**
       * Unused code is a real finding, but the convention for a deliberately
       * unused binding is a leading underscore, and the default rule does not
       * know that.
       */
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'none',
        },
      ],
    },
  },

  {
    /**
     * Tests reach for the DOM and for module internals in ways application code
     * should not. `no-explicit-any` in particular is load-bearing in
     * `accessibility.spec.ts`, which re-types axe's results by hand because
     * `axe-core` is a transitive dependency pnpm does not hoist.
     */
    files: ['tests/**/*.ts', 'tests/**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
)
