<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Site rules (decided by the owner; do not reopen without asking)

These came from the owner during the 2026-10-31 redesign. Each one replaces any earlier guidance that disagrees.

### What the site is for
- Job 1 (priority): sell digital transformation, software and AI to small businesses and individuals. Job 2: show some of our products to bring traffic.
- Services come before products on every page and in every list. Products are compact and never pushed: they are "some of our products", not all.
- Scope is wide and must read wide: ERP, CRM, chatbots, websites, web and mobile apps, data and reports, AI agents, IoT, extra hands for a product team. Never narrow it to "apps" or to "fixing" a problem. The frame is transformation: digitise how the business runs, then let AI agents do the routine steps with a person approving.
- English and Vietnamese carry the same content and structure. Write each language separately for its own readers; never translate sentence by sentence.

### Voice and language
- Speak as "we" (Vietnamese: "chúng tôi", never "tụi mình"). No "I". Not a solo builder.
- Write for a shop owner or an ordinary person, in everyday words. No jargon they would not say: tool, POC, plan, module, repo, SaaS, dev, data, PM, brief, outsourcing. Use: phần mềm, kế hoạch, bản chạy thử, hệ thống, báo giá. Product names and common words (AI, app, ERP, CRM, Zalo, Excel, QR) are fine.
- Short sentences, one point each. No machine-translated phrasing, no AI-slop patterns (rule of three, staging, inflated claims, "not X but Y", em dashes, bold labels). Check new copy against the `humanizer` skill and the anti-slop copywriting rules before shipping.
- "Chuyển đổi số" may appear in titles and headings (people search it); always follow it with a plain sentence.

### Facts we may and may not state
- Do not state a studio name, headcount, people, photos or founding story. Do not name past clients, describe their products or use any confidential detail. The owner's past outsourcing work may be stated only as the plain sentence in `about.proof`, in the owner's own wording.
- No invented testimonials, logos, ratings, metrics or prices. No price numbers. Pricing is phased: a plan and a quote first, then a small working version ("bản chạy thử"); only when it works do we agree the next phase.
- "We reply within one working day" is true and may be stated.
- Scori and Remoti are not released and not in any store. Say "in development" / "đang làm". No store badges, no download or rating claims. Remoti works only with Android TV and Google TV and only on iPhone; say what it does and never compare it with another remote app. Remoti's casting, mirroring and PDF presenting are built but not yet verified on a real iPhone and TV: describe them as in progress, never as working or tested.
- Dropped for good: Reupmatic, PixelBid.

### Structure and SEO
- Four pages per language, one search intent each: home, services, products, contact. Vietnamese slugs: /vi/dich-vu, /vi/san-pham, /vi/lien-he. Add a page only when it has its own intent and its own content.
- Each page sets its own title, description, canonical, hreflang (with x-default) and JSON-LD. Titles must differ between pages. No keyword stuffing.
- Mobile first: home is a few screens, not a long scroll. Offers and apps swipe or stack; detail lives one tap away.
- Contact channels, always together: email, Zalo and WhatsApp. The email subject and body are written in the visitor's language.

### Design
- Palette (changed 2026-10-31, the owner called blue and yellow generic AI slop): deep forest green `#146c43` is the action colour, orange `#ff6a2b` is the one accent, neutrals are white, pale green tint `#f2f5f2`, green-black ink `#10201a`, dark green `#0c2e22`. No blue, purple, cream or black. Product panels keep each app's own colour. No gradients, glass, glow, background grids or blurred orbs. Font: Be Vietnam Pro (drawn for Vietnamese).
- No eyebrow badge above a headline, no decorative status dots, no sparkle icons for AI, no arrows on buttons, no coloured left stripes, no identical card grids, no stock-style illustrations. Vary section layouts.
- Depth and motion are wanted and must have a purpose: the hero scene explains the idea (scattered work flowing into one system with AI agents), sections slide up as they arrive, phone screens tilt, buttons respond. Motion is position or transform only, never hides content, never loops without a reason, and stops for `prefers-reduced-motion`. Heavy code (three.js) loads lazily, has a static fallback, and pauses off screen.
- Accessibility is a gate: WCAG AA contrast, visible focus, 44px targets, 200% zoom, no fixed-height text boxes, Vietnamese diacritics never clipped.

### Process
- Verify UI in the Orca browser on a phone width and a desktop width, in both languages, before saying it is done.
- Before handing work to the owner, have it reviewed by independent agents (fact check, copy, CRO, SEO, and codex for a second model's view) and triage the findings against these rules. Use the marketing skills and the anti-slop skills for those reviews.

### Copy files
- User-facing copy lives in `src/content/locales/*.fixture.ts` and `messages/*.json`; never hardcode it in components.
- Locale tests verify catalog completeness, parity, rendering and routing. Do not freeze exact prose in tests. Before finishing, read `/vi` top to bottom as a Vietnamese reader would.
