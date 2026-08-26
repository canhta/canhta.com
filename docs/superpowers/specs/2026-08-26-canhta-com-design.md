# canhta.com — Design Spec

**Date:** 2026-08-26
**Status:** Approved for planning
**Owner:** Canh Ta

---

## 1. Purpose

A single-page marketing site with two jobs, in priority order:

1. **Convert** — get a qualified visitor to book a conversation about building something.
2. **Prove** — establish that Canh actually ships agentic systems, mobile apps, web products and mini-SaaS.

It is *not* a résumé, a blog, an agency site, a dashboard, or a portfolio gallery. It functions as a
portfolio, but the unit of value is "hire me to build this", not "browse my work".

## 2. Non-goals

No CMS, database, auth, admin panel, newsletter backend, chatbot, or additional routes.
No invented metrics, testimonials, clients, logos, outcomes, or biography details.
No scroll-jacking, parallax, carousels, marquees, custom cursors, or mobile autoplay video.

**Three deliberate exceptions to the original constraints:**

1. `/api/demo` exists, overriding "no API routes" — rationale in §9.
2. A hand-written WebGL shader paints behind the hero, overriding "no canvas backgrounds" — §8.1.
3. A GPU particle layer renders inside the signature panel, overriding "no particles / no 3D" — §10.

Both graphics layers are visual only, sit beneath an accessible DOM layer, and degrade to a complete
static composition.

---

## 3. Positioning strategy

### 3.1 The constraint that shapes everything

Canh has **2–3 showable products**, not forty. Revenue-scale proof (the Marc Lou / indiepa.ge
model — `$82k/month` set in the largest type on the page) is not available. Competing on portfolio
breadth would foreground the single weakest asset.

Three substitutes, in descending order of strength:

| Proof type | Mechanism | Why it beats breadth here |
|---|---|---|
| **Demonstration** | A working agentic demo on the page | Cannot be faked. Nobody's portfolio screenshots outrank a system running in the visitor's own tab. |
| **Method** | The Idea → System → Product sequence | Service buyers are purchasing a process, not a back catalogue. |
| **Craft** | The page's own execution quality | Read in under one second, before any copy is parsed. A page that looks expensive is itself proof. |

Depth substitutes for breadth in the work section: 2–3 products examined properly beat ten thin cards.

### 3.2 The three-second hook

Research (Nielsen Norman scanning studies; 2026 landing-page conversion literature) establishes:

- Visitors decide within ~3s; above-the-fold scanning runs ~5–6s in F/Z patterns, not top-to-bottom.
- 53% of mobile visitors abandon a page that takes over 3s to load.
- *"A hero headline that takes 3 seconds to finish animating is testing the visitor's patience."*
- 2026 portfolio convention: let the work be the hero; minimise everything competing with it.

**Governing rule: anything that needs time to reveal itself cannot be the hook.**

The 8–10s signature sequence therefore **must not** occupy the first viewport — placing it there
spends the entire attention budget watching a diagram assemble before the visitor knows who Canh is.
This reverses Step 7 of the original checklist.

At frame zero the hero presents: identity, positioning claim, one CTA, and visible craft. All static.
Motion in the hero is **response**, never **reveal**.

### 3.3 Page order

```
hero              identity + claim + CTA, static at frame 0
live demo         the strongest proof; runs on demand
signature         Idea → System → Product, 8–10s, once, replayable
selected work     2–3 products, depth over breadth
capabilities      four areas, one panel, state-driven
ways to work      three engagements — the conversion section
footer            closing line, CTA repeat, socials
```

Portfolio sits *below* demonstration and method deliberately: the weakest asset is not asked to carry
the page.

---

## 4. Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16.2.x, App Router |
| UI | React 19 |
| Language | TypeScript, `strict: true` |
| Styling | Tailwind CSS 4 |
| Motion | Motion for React |
| i18n | next-intl 4 |
| Telemetry | Vercel Web Analytics + Speed Insights |
| Unit / component | Vitest + React Testing Library |
| E2E / a11y | Playwright + `@axe-core/playwright` |
| Package manager | pnpm 11 |
| LLM | `@anthropic-ai/sdk` |

Verified locally: Node v26.1.0, pnpm 11.23.0.

---

## 5. Architecture

Fully static except one route.

- `/` and `/vi` are prerendered at build time via `generateStaticParams` + `setRequestLocale`.
- `/api/demo` is the only server function (Node runtime).
- Server Components by default. **Client boundaries are limited to four components:**
  `hero-shader`, `live-demo`, `signature-system`, `capability-map`. Everything else ships zero
  component JS.

```
src/
  app/
    [locale]/{layout,page,not-found}.tsx
    api/demo/route.ts
    {icon.svg,opengraph-image.tsx,robots.ts,sitemap.ts,globals.css}
  components/
  content/
  i18n/{routing.ts,request.ts}
  lib/{motion.ts,analytics.ts,demo-schema.ts}
  proxy.ts
messages/{en,vi}.json
public/{avatar.webp,builds/}
tests/
```

---

## 6. Internationalisation

Confirmed against next-intl's own Next.js 16 examples:

```ts
defineRouting({
  locales: ['en', 'vi'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: false,
  localeCookie: false,
})
```

`src/proxy.ts` (Next 16 renamed `middleware.ts` → `proxy.ts`) exports `createMiddleware(routing)`.

- `/` → English, no prefix. `/vi` → Vietnamese.
- No automatic redirects; the URL is the sole source of locale.
- The proxy performs an internal rewrite only — both pages remain statically generated.
- Locale switch links resolve to the equivalent path and emit `hreflang` alternates.

**Rejected alternative:** dropping the proxy entirely. next-intl without a proxy requires
`localePrefix: 'always'`, forcing `/en` and `/vi` and leaving the apex as a redirect stub. That
breaks the route contract and weakens the canonical URL. The proxy's cost is one cheap
routing-middleware invocation; the pages themselves stay on the CDN.

---

## 7. Content model and fixture guarding

All identity and project content lives in `src/content/`, typed, outside components:
`profile.ts`, `builds.ts`, `capabilities.ts`, `services.ts`, `social.ts`.

Types: `Locale`, `LocalizedText`, `BuildStatus`, `Proof`, `Build`, `Capability`, `Service`,
`MotionPreset`, `DemoMedia`.

**The repository is public.** Placeholder content must never be mistakable for real claims.

- Fixtures live in `*.fixture.ts` files, never inline in real content modules.
- A build-time assertion fails the production build if any fixture value is reachable from a
  rendered route.
- Optional content is **omitted**, never substituted. No proof metrics → no proof chips. No current
  build → no "Now building" section.

Validation (enforced by tests, failing the build):
missing localized strings · duplicate build slugs or order values · duplicate capability ids or
order values · empty visible proof · EN tagline > 72 chars · EN problem/built/result > 100 chars ·
missing cover image on a selected story · invalid URLs · placeholder strings (`TODO`, `Lorem`) ·
motion media without a poster frame or reduced-motion fallback.

---

## 8. Motion system

One token module (`src/lib/motion.ts`) is the only source of durations, easings and viewport
thresholds.

| Token | Value |
|---|---|
| Interaction feedback | 120–180 ms |
| State transition | 220–360 ms |
| Section reveal | 400–700 ms |
| Signature sequence | 8–10 s |
| Easing | ease-out / approved spring |

Rules:

- `LazyMotion` + `domAnimation` + `m` components. `MotionConfig reducedMotion="user"` at the root.
- **Transform and opacity only.** Layout-animating properties require explicit written justification.
- Stagger only where it encodes reading order or causality — never to delay content.
- No perpetual motion, no decorative loops, no attention competition. One element leads at a time.
- **Every component has a meaningful static resting state.** With all motion disabled the page must
  be complete and well-composed, not a degraded variant.
- Essential content is never hidden pending animation.

Per-section treatment: hero resolves identity → claim → CTA in reading order, fast; the signature
panel is the one cinematic moment; the capability panel morphs between states with locked height;
work cards rise on entry with covers settling into frame; service rows stagger once and respond to
pointer and focus; the locale switch exchanges text without layout shift.

### 8.1 WebGL layer

Two GPU layers, both additive, both removable at any moment:

| Layer | Technology | Bundle (gzip) | Placement |
|---|---|---|---|
| Hero backdrop | hand-written fragment shader, no library | ~3 KB | behind static hero content |
| Signature particles | PixiJS | ~150 KB | inside the signature panel, below the fold |

- **PixiJS over Three.js.** The content is 2D — nodes, connections, labels. Pixi is a 2D-first GPU
  renderer and is faster for high-count particle work. Genuine 3D would make a system diagram *less*
  legible, not more impressive.
- The Pixi bundle is dynamically imported and armed on intersection. It is never in the initial
  payload and never above the fold.
- The hero shader paints behind content that is already legible; it never gates paint.
- **Capability probe.** If WebGL is unavailable, the context is lost, or the client signals reduced
  motion or data saving, neither layer initialises and the DOM composition stands alone.
- Both layers are `aria-hidden` and carry no information absent from the DOM.
- Every RAF loop is torn down on unmount and paused when the panel leaves the viewport.

**JS budget.** Initial payload ~90 KB (Next + React) + ~25 KB (Motion) + ~3 KB (hero shader);
~150 KB (Pixi) deferred. Accepted — see §18 #9.

---

## 9. Live demo endpoint

The site's strongest differentiator, and its largest risk.

### 9.1 Behaviour

Visitor submits a messy, real-world request. The system returns a structured plan — its reading of
the problem, the steps it would take, the tool calls involved, the human checkpoint, and the shape
of the output — which the UI reveals as a staged animation feeding directly into the site's
Idea → System → Product visual language.

**Structured output, not free text.** The response is constrained by a JSON schema
(`understanding`, `steps[]`, `humanCheckpoint`, `output`), giving a deterministic, safely renderable
shape and full client-side control over the reveal animation — which matters because the animation
is itself a deliverable.

**The demo has no real tools and no side effects.** It describes the system it would build; it does
not execute anything.

### 9.2 Model and cost

Default: **`claude-opus-5`** with `thinking: {type: "adaptive"}` and `output_config: {effort: "low"}`.

Per-run estimate (~720 input tokens, ~800 output tokens including thinking):

| Model | Input $/1M | Output $/1M | ≈ per run | 5,000 runs/mo |
|---|---|---|---|---|
| `claude-opus-5` | $5 | $25 | **~$0.024** | ~$120 |
| `claude-sonnet-5` | $2 | $10 | ~$0.009 | ~$45 |
| `claude-haiku-4-5` | $1 | $5 | ~$0.005 | ~$25 |

> **Open decision for Canh.** Opus 5 is the default and gives the best demo quality. Haiku 4.5 cuts
> cost roughly 5×. This is a spending decision, not an engineering one — Canh chooses before launch.

Implementation notes: `@anthropic-ai/sdk`; server-side fallbacks enabled
(`betas: ["server-side-fallback-2026-07-01"]`, `fallbacks: "default"`); `stop_reason === "refusal"`
handled explicitly before reading content; no assistant prefill (removed on current models);
`max_tokens` deliberately capped low for cost control.

### 9.3 Hardening — all four required before the endpoint ships

A public, unauthenticated endpoint calling a paid model is an open wallet. Bots will find it.

1. **Rate limiting** — Vercel WAF, per IP. Target ≈ 5/minute, 30/day.
2. **Global daily ceiling** — a hard cap independent of per-IP limits, sized against §9.2. Once
   exceeded the endpoint stops calling the model entirely.
3. **Injection resistance** — visitor input is data, never instruction: delimited, never concatenated
   into the instruction body. The system prompt scopes the task narrowly and declines anything
   off-task. Model output is rendered as text only, never as HTML.
4. **Scripted fallback** — on rate limit, cap breach, refusal, timeout or network error the section
   plays a pre-recorded run. **The demo never appears broken**, and never surfaces an error state to
   a prospective client.

Requests and responses carry no personal data and are not persisted.

---

## 10. Signature component

`signature-system.tsx`, isolated client component, built as **two stacked layers**:

```
+------------------------------------------+
|  DOM / SVG layer - real text, real nodes |  accessible, always present
|  +------------------------------------+  |
|  |  Pixi / WebGL layer                |  |  glow, depth, travelling
|  |  aria-hidden, lazy, removable      |  |  signal particles
|  +------------------------------------+  |
+------------------------------------------+
```

The DOM layer owns every label, state and interaction target, and is server-rendered. The WebGL
layer is purely visual, carries no unique information, arms on intersection, and may vanish at any
moment — reduced motion, absent WebGL, lost context, low-end device — leaving a complete, composed
static diagram rather than a degraded one.

Static frame — present before any JS, and the permanent reduced-motion state — shows the full
system as real, readable text: messy workflow → reason / use tools / human check → agent system,
mobile app, web product, mini-SaaS.

Sequence (8–10s, once): input appears → resolves into a clearer brief → nodes activate in sequence
with visible causality → signal travels between nodes → completed nodes retain checked state →
outputs resolve → one output expands into a mini product surface (~1.5s) → final state rests ≥2s.

- Each phase is legible to a viewer arriving mid-sequence.
- Explicit, keyboard-accessible **Replay** after the first run.
- Desktop hover/focus and mobile tap select an output; all core labels are visible without interaction.
- Full panel dimensions reserved during SSR — **zero layout shift**.
- Timeline lazy-loads after initial paint. Viewport-triggered, and never restarts on incidental
  re-render or locale change.
- Decorative SVG paths hidden from assistive technology; state and reading order exposed.
- Reduced motion: final state rendered immediately, no autoplay, no path travel, no stagger; Replay
  updates state without cinematics.
- Target 60fps on mid-range mobile. No animated SVG filters, expensive shadows, or full-panel repaints.

---

## 11. Design tokens

```
--background #f7f7f4   --surface #ffffff   --text #18181b   --muted #71717a
--border     #e4e4e7   --accent  #ff5c35   --accent-foreground #ffffff
```

One accent. No pure black as primary background or text. No gradients, no glassmorphism.
Inter with Vietnamese glyph coverage; optional Geist Mono for statuses and proof values.
Spacing scale 4/8/12/16/24/32/48/72/96. Content column 760px; motion and capability shell up to
960px; body copy ~520px. Horizontal padding 20/24/32px across mobile/tablet/desktop. Card radius
16px, gaps 12px. Focus outline ≥2px, always visible. WCAG AA throughout.

---

## 12. Analytics

Vercel Web Analytics + Speed Insights. Custom events, no personal data:

`contact_click{source: hero|work_together|footer}` · `build_open{slug}` ·
`capability_view{capability}` · `signature_replay{source}` · `locale_switch{from,to}` ·
`social_open{network}` · `demo_run{status: ok|rate_limited|fallback}`

No names, emails, message text, prompt content, pointer coordinates, hover durations or frame
telemetry. Replay is tracked only on explicit activation. Analytics must not block animation or input.

---

## 13. SEO and sharing

Localized Metadata API per route. Canonical `https://canhta.com` with locale alternates.
`robots.ts` and `sitemap.ts`. Dynamic OG image (name, hook, avatar, ≤3 product logos), legible at
thumbnail size. `Person` structured data using real social links only — no fabricated `Organization`
or `Review` schema. All metadata and static content available without JavaScript.

EN: `Canh Ta — Agentic Product Builder` · VI: `Cảnh Tạ — Xây dựng sản phẩm Agentic`

---

## 14. Accessibility

Exactly one `h1`; logical heading order; semantic `main`/`section`/`ul`/`li`/`a`/`button`; no nested
interactive elements. Meaningful alt text on avatar and product imagery, empty alt on decorative
graphics. Status conveyed by text, not colour alone. Focus order follows visual order and is never
moved by animation. Interactive targets ≥44×44px. Reduced motion disables all cinematics and
autoplay while preserving complete content. No flashing or rapid scaling. Axe: zero serious or
critical violations.

---

## 15. Testing

**Vitest + RTL** — content validation rules (§7); both locales supply every required message;
optional sections vanish when data is absent; exactly one `h1` and one hero CTA; signature states
(initial / active / complete / replay / hover / tap / reduced-motion); sequence runs once and does
not restart on re-render; capability panel height stability; analytics payloads free of personal
data; motion components use approved presets and introduce no unbounded loops; static content
renders with motion disabled.

**Playwright + axe** — `/` English and `/vi` Vietnamese; locale switching preserves equivalent
content; signature comprehensible before animation, no layout shift, replay exposed; capability map
via pointer, keyboard and touch; build links; CTA analytics; keyboard order; no horizontal scroll at
320/375/768/1440px; reduced-motion disables autoplay, path travel, stagger and demo playback;
no animation blocks first paint or CTA interaction; demo endpoint fallback path.

**Lighthouse mobile** — revised for the WebGL decision (§18 #9). A heavier page has been explicitly
accepted in exchange for visual impact, so exactly one metric relaxes and the rest hold:

| Metric | Target | Status |
|---|---|---|
| Performance | ≥85, aim ≥90 | **relaxed** — was ≥95 |
| Accessibility | ≥95 | unchanged — non-negotiable |
| Best Practices | ≥95 | unchanged |
| SEO | 100 | unchanged |
| LCP (p75) | ≤2.5s | unchanged — hero is static; WebGL is not in the LCP path |
| CLS (p75) | ≤0.1 | unchanged — non-negotiable, all dimensions reserved |
| INP (p75) | ≤200ms | unchanged |
| Above-fold image | ≤250KB | unchanged |

Only Total Blocking Time genuinely degrades, and only after the WebGL layers arm.

Additional WebGL tests: context-loss recovery leaves the DOM layer intact and legible; the panel
never arms above the fold; `prefers-reduced-motion` and a failed WebGL probe each yield the complete
static composition; no RAF loop survives unmount.

LCP lands on hero text, not on either graphics layer: the hero shader paints behind content that is
already legible, and the signature panel is server-rendered at full size with its DOM layer as real
content. The signature bundle stays isolated and lazy-loaded.

The prior Performance ≥95 target is superseded by the table above and recorded in §18 #9.

---

## 16. Deployment

Nothing in this section runs without explicit per-step authorization from Canh.

1. Public GitHub repository `canhta/canhta.com`.
2. Deploy via Vercel MCP.
3. `canhta.com` apex canonical; `www.canhta.com` redirects to apex.
4. **Cloudflare DNS records must be DNS-only — orange-cloud proxy off.** Cloudflare proxying in
   front of Vercel breaks certificate issuance and distorts analytics.
5. Requires `wrangler` installed plus a Cloudflare API token. Neither is present on the machine
   today (`cloudflared` is installed, but that is a tunnel daemon, not DNS management).
6. Production verification: both locales, metadata, sitemap, robots, OG image, structured data,
   analytics, reduced motion, signature playback, demo endpoint and its rate limits.

---

## 17. Inputs still required from Canh

Development proceeds on fixtures; **none of these block engineering, all of them block launch.**

- Square avatar ≥512×512
- Booking URL (fallback: `mailto:` with subject `Project inquiry from canhta.com`)
- GitHub, X, LinkedIn URLs
- 2–3 products: name, logo, public interface imagery, link, status, and **real numbers**
- One factual example per capability (agentic, mobile, web, mini-SaaS)
- Current public build, if any
- Availability status
- Demo model choice: Opus 5 (default) vs Sonnet 5 vs Haiku 4.5 (§9.2)

---

## 18. Decisions log

| # | Decision | Reason |
|---|---|---|
| 1 | Signature sequence moved below the first viewport | Time-based reveal cannot serve a 3-second hook |
| 2 | `/api/demo` added, breaking "no API routes" | Canh required real numbers; demonstration is the strongest available proof |
| 3 | Demonstration and method placed above portfolio | 2–3 products is the weakest asset; it should not carry the page |
| 4 | Fixture-first with a hard production guard | Unblocks engineering without risking false claims in a public repo |
| 5 | next-intl proxy retained | The no-proxy path forces `/en` prefixes and breaks the route contract |
| 6 | Opus 5 as demo default, cost surfaced for Canh's decision | Model spend is the owner's call, not the engineer's |
| 7 | Whole-page motion, overriding the checklist's restraint clauses | Thin portfolio makes craft itself load-bearing proof |
| 8 | Structured output for the demo, not free text | Deterministic, safely renderable, animation stays under our control |
| 9 | WebGL accepted despite bundle cost; Lighthouse Performance relaxed ≥95 → ≥85 | Canh's explicit call after the tradeoff was presented: heavier is acceptable, beautiful and professional matters more. Craft is load-bearing proof given the thin portfolio. |
| 10 | PixiJS over Three.js | Content is 2D; Pixi is faster for particle work, and a 3D system diagram reads worse rather than more impressively |
| 11 | Two-layer DOM-over-WebGL architecture | Canvas destroys assistive-technology access; the DOM layer preserves every accessibility and reduced-motion guarantee |
