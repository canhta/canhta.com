<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Vietnamese product copy

- Keep user-facing copy in `src/content/locales/vi.fixture.ts` or `messages/vi.json`; do not hardcode it in components.
- Write the Vietnamese page as a whole for people who build and buy web products. Do not translate the English page sentence by sentence.
- Sound like a Vietnamese solo builder: short, direct, conversational, and concrete. Use familiar work terms such as `spec`, `app`, `SaaS`, `team`, `dev`, and `production` when they are more natural than formal Vietnamese.
- Write for small businesses with operational problems. Lead with digitizing work, improving a process, connecting scattered systems, or applying AI where it helps. Tools, mobile apps, web apps, and SaaS are possible implementations, not the pitch.
- Do not make the buyer diagnose the technology. They bring a slow, manual, fragmented, or error-prone part of the business; we identify the smallest useful solution. Keep AI subordinate to the business problem and name the human review point when it matters.
- Give the page a point of view a buyer can remember. State a real tradeoff or decision rule, such as using an existing tool when it is enough, instead of listing generic capabilities. Never invent a contrarian line that the delivery model cannot support.
- Make the mechanism concrete: find the bottleneck, map the current workflow, choose the smallest adequate intervention, agree the plan and price, then put it into use. Claims about outcomes need linked work or other verifiable proof.
- Contact copy must ask for the problem, not a polished brief or a message of any particular length. Explain the next steps plainly: discuss the problem, break it down together, plan the implementation, then quote the work.
- Pick one primary search intent for each page. Put the phrase people actually search for in the page title and a prominent heading or closely related visible copy; use related terms only where they describe real services. Do not pile keywords into the hero or metadata.
- A search title and description must describe this specific page, not repeat the brand role or the hero mechanically. Optimize for the right click, not for maximum keyword coverage; metadata does not replace useful on-page content.
- Cut ceremonial language, consultant-speak, inflated promises, repeated context, and sentences that only sound professional. One sentence should make one point.
- Before finishing, read `/vi` from top to bottom and aloud. Every line must fit its surrounding section, sound like something a real person would say, and render without overflow.
- Locale tests may verify catalog completeness, parity, rendering, and routing. Do not duplicate or freeze exact Vietnamese prose in component or end-to-end tests; the locale files are the copy source of truth.
