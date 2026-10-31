# SEO pass for people, Google and AI agents: canhta.com, 2026-10-31

Branch `worktree-agent-aa471925f7f0611ad`, worktree `/Users/canh/Startup/canhta.com/.claude/worktrees/agent-aa471925f7f0611ad`. Nothing pushed or merged.

## Sources

Library docs (context7, version 16.2.9 of the Next.js docs; the repo runs 16.3.2 and its own `node_modules/next/dist/docs` was read for `inlineCss`):

- Next.js metadata `alternates`, `sitemap.ts` alternates, `robots.ts`, `manifest.ts`, `generateImageMetadata`, `generateViewport`, content-negotiation rewrites with `Vary: Accept`: https://github.com/vercel/next.js/blob/v16.2.9/docs/01-app/03-api-reference/04-functions/generate-metadata.mdx , .../03-file-conventions/01-metadata/sitemap.mdx , .../robots.mdx , .../manifest.mdx , https://github.com/vercel/next.js/blob/v16.2.9/docs/01-app/02-guides/backend-for-frontend.mdx
- next-intl `localePrefix: 'as-needed'` and `alternateLinks` (hreflang Link header, how to opt out): https://github.com/amannn/next-intl/blob/main/docs/src/pages/docs/routing/configuration.mdx
- Next.js `experimental.inlineCss` (tested, reverted): `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/inlineCss.md`

Google Search Central:

- AI features and your website (no extra requirements for AI Overviews and AI Mode; page must be indexed and snippet-eligible; nosnippet, data-nosnippet, max-snippet, noindex, Google-Extended): https://developers.google.com/search/docs/appearance/ai-features
- Optimizing for generative AI features (still SEO; no llms.txt, AI text files, special markup or chunking needed; Google Search ignores them; structured data not required, no special schema): https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google-Extended (control token for Gemini training and grounding, no separate user agent, no effect on Search inclusion or ranking): https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers
- Localized versions / hreflang (reciprocal, self-listed, absolute URLs, x-default, ISO codes): https://developers.google.com/search/docs/specialty/international/localized-versions
- Title links (unique, brand, no keyword stuffing, rewrite triggers): https://developers.google.com/search/docs/appearance/title-link
- Snippets and meta descriptions (unique, no keyword lists, no length limit): https://developers.google.com/search/docs/appearance/snippet
- Structured data general guidelines (markup must match visible content; JSON-LD recommended): https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Organization structured data (logo at least 112x112, crawlable; telephone with country code): https://developers.google.com/search/docs/appearance/structured-data/organization
- Breadcrumb structured data (at least two ListItems; last item may omit `item`): https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- FAQ rich result retired: Google's FAQ page lists the deprecation of 8 May 2026 (no longer shown from 7 May 2026) and removal of the documentation on 15 June 2026: https://developers.google.com/search/docs/appearance/structured-data/faqpage
- Sitemaps (`lastmod` used only if consistently accurate; `priority` and `changefreq` ignored; absolute URLs): https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- robots.txt (one most specific group per crawler, groups for the same agent merge, absolute Sitemap URL; `Crawl-delay` and `Host` not listed): https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt
- Crawlable links and anchor text: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- SEO starter guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Chrome Lighthouse "Agentic browsing audits" including Discoverability / llms.txt (experimental): https://developer.chrome.com/docs/lighthouse/overview

AI crawlers and agent conventions:

- OpenAI crawlers (OAI-SearchBot for ChatGPT search, GPTBot for training, ChatGPT-User for user requests, about 24 hours to take robots.txt changes): https://developers.openai.com/api/docs/bots
- Anthropic crawlers (ClaudeBot training, Claude-User, Claude-SearchBot; honours robots.txt; `Crawl-delay` non-standard extension): https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- Perplexity (PerplexityBot for search only, Perplexity-User generally ignores robots.txt): https://docs.perplexity.ai/guides/bots
- Applebot-Extended (does not crawl; controls training use only; does not affect search): https://support.apple.com/en-us/119829
- llms.txt format and `.md` copies of pages, `rel="alternate" type="text/markdown"`: https://llmstxt.org/
- Cloudflare Markdown for Agents (`Accept: text/markdown`, `Vary: Accept`; a Cloudflare feature, not a standard): https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
- WebMCP (W3C Web Machine Learning Community Group, Draft Community Group Report of 27 October 2026, `document.modelContext`, not a standard): https://webmachinelearning.github.io/webmcp/
- security.txt, RFC 9116 (a vulnerability-disclosure file under `/.well-known/`, needs `Contact` and `Expires`): https://www.rfc-editor.org/rfc/rfc9116
- Not verifiable from a primary source in this pass: Content-Signal robots.txt lines (https://contentsignals.org/ returned only a title), `ai.txt` (no standard found).

## Result in one table

| Area | Before | After |
| --- | --- | --- |
| Lighthouse mobile performance, 8 pages | 93 to 97 (home 93, products 93) | 94 to 97 (home 95, products 94), all at or above 94 |
| Lighthouse accessibility / best practices / SEO | 100 / 96 / 100 | 100 / 96 / 100 (best practices 96 is the two Vercel script 404s that exist only on localhost) |
| Home title | 60 characters, no "services" | 48 characters, "services" present |
| Home description | 152, no "services" or "products" | 151, "services", "orders", "stock", "products" present |
| Top words of the rendered home text | `call, opens, new, tab, products, one, order, stock, services` | `call, services, stock, products, one, order, problem` ("opens", "new", "tab" gone) |
| robots.txt | one long group, no reasons | three commented groups, CCBot added |
| llms.txt | long, whole FAQ, no limits | map of pages, services with anchors, contact, what we do not state, Markdown links |
| llms-full.txt | none | all 8 pages, English then Vietnamese |
| Markdown copies | none | 8 pages, linked with `<link rel="alternate" type="text/markdown">` |
| JSON-LD | no logo, no contact point | logo (PNG), contactPoint, service URLs with anchors, `primaryImageOfPage` |
| Visible breadcrumb | none (only in JSON-LD) | Home / Page above the title of the three inner pages |
| 404 page | one button | button plus links to services, products, contact |

## Fixed

1. Keyword pollution from "(opens in a new tab)" (SEO Site Checkup "Keywords Usage Test"): the screen-reader text, the `common.newTab` key in both catalogs and the `note` prop were deleted. `target` and `rel` are unchanged. The word "opens" went from 9 to 0 on the home page.
2. Natural topic words on the home page (title, description, headings), both languages:
   - EN title `Digital transformation and AI services | Canh Ta` (48). VI title `Dịch vụ chuyển đổi số và AI cho doanh nghiệp nhỏ | Canh Ta` (58).
   - EN description (151): `Services for small businesses: one system for orders, stock and debts, then AI does the routine steps and a person approves. Plus some of our products.` VI description (154): `Dịch vụ cho cửa hàng, doanh nghiệp nhỏ: một hệ thống cho đơn hàng, kho và công nợ, rồi AI lo việc lặp lại, có người duyệt. Xem vài sản phẩm của chúng tôi.`
   - EN H2 "What we do" became "Our services" (the same string is the OfferCatalog name in JSON-LD and the heading in llms.txt). VI already said "Dịch vụ của chúng tôi".
   - The first offer is now named `Business systems for orders and stock` (VI `Hệ thống quản lý đơn hàng và kho`). It is an H3 on the home page and an H2 on the services page, so orders and stock reach a heading. The anchor id (`#systems`) did not change; JSON-LD and llms.txt pick up the new name. It names two things, not three, and the detail still covers customers and CRM, but it leans toward orders and stock: the owner should confirm it does not narrow the scope.
   - Counts on the home page (total / title / description / headings). EN before: opens 9/0/0/0, products 5/0/0/1, services 4/0/0/0, order 6/0/1/0, stock 5/0/1/0. EN after: opens 0, products 5/0/1/1, services 6/1/1/1, order 7/0/1/1, stock 6/0/1/1. VI before: dịch vụ 4/0/0/1, sản phẩm 3/0/0/1, đơn hàng 3/0/1/0, kho 3/0/1/0. VI after: dịch vụ 5/1/1/1, sản phẩm 3/0/1/1, đơn hàng 4/0/1/1, kho 4/0/1/1.
3. robots.txt is now `src/app/robots.txt/route.ts` (the `robots.ts` file cannot carry comments). Everything is allowed. Each crawler group says why: search and answer engines (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Bingbot, DuckAssistBot), user-triggered fetchers (ChatGPT-User, Claude-User, Perplexity-User), training and grounding (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, Meta-ExternalAgent, CCBot, cohere-ai). No `Crawl-delay`, no `Host`. The sitemap line is absolute.
4. Page `<meta name="robots">` and `googlebot` now say `index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1` out loud. These are Google's defaults; the comment in `src/lib/metadata.ts` names the one value to change to limit what AI Overviews may quote.
5. Agents: `llms.txt` rewritten to the llmstxt.org shape (H1, blockquote, H2 link lists, Optional); `llms-full.txt` added; a Markdown copy of each page at `/index.md`, `/services.md`, `/products.md`, `/contact.md`, `/vi/index.md`, `/vi/dich-vu.md`, `/vi/san-pham.md`, `/vi/lien-he.md` (one route handler behind rewrites; the proxy matcher skips exactly those paths, so any other unknown `.md` still gets the localized 404). The text is generated from the same messages and content as the HTML, so the two cannot drift. The one addition is a short "What we do not state" section (no prices, no client names, no ratings, reviews or download counts) in llms.txt and in the home and services copies, in both languages (`messages/*.json` key `llms`); it restates the quote and no-clients rules and appears on no HTML page. Each `.md` response carries `Link: <html page>; rel="canonical"`, which Google documents for non-HTML files (https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), so the text copies are not duplicate content. llms.txt and llms-full.txt have no such header; they are not copies of one page.
6. JSON-LD: `logo` as an ImageObject of `/apple-icon` (a real 180 by 180 PNG), `contactPoint` (customer service, email, telephone, Vietnamese and English), `url` with the services anchor on every Service, `primaryImageOfPage`. No `image`, rating, review, price, person or SearchAction (the site has no search).
7. Visible breadcrumb (`src/components/breadcrumb.tsx`), same two steps as the BreadcrumbList. 44 px high link, plain text, no badge.
8. 404 page: links to services, products and contact in the visitor's language; status stays 404, `noindex`.
9. Stable fragment anchors added: `#scori`, `#remoti` (products page), `#ai-engineering-atlas`, `#copycat-skills`, `#faq-<id>` on each FAQ item. Existing `#systems #ai #data #web #iot #team` kept. All 24 in-page fragment links resolve.
10. `<html dir="ltr">`; the manifest lists the PNG icon next to the SVG.

## Checked and already right (no change)

Canonical on every page equals its own absolute `www` URL; hreflang `en`, `vi`, `x-default` on all 8 pages, reciprocal, self-listed; sitemap lists the 8 URLs with `xhtml:link` alternates and no `lastmod` (Google uses `lastmod` only when accurate); 308 for `/en`, `/en/services`, `/vi/services`, `/dich-vu`; unknown paths return 404 in both languages; one H1 per page and a logical order; the FAQ is a `dl` (and its JSON-LD matches the visible text); landmarks and a skip link; OG and Twitter cards per page and language (1200 by 630 PNG, checked by eye); `theme-color`; manifest; favicon.ico. The crawl script found 0 failures: 8 pages 200, no `noindex`, every internal link 200 with descriptive anchor text, all sitemap URLs 200.

JSON-LD was parsed (every `@id` reference resolves, property inventory per type checked against schema.org by hand: ProfessionalService, ContactPoint, ImageObject, OfferCatalog, Offer, Service, WebSite, WebPage, BreadcrumbList, ItemList, MobileApplication, WebApplication, SoftwareApplication, FAQPage, Question, Answer). No online validator was available. Run https://search.google.com/test/rich-results and https://validator.schema.org on the live URLs once.

## Deliberately not fixed

- Render-blocking CSS (SEO Site Checkup): tried `experimental.inlineCss` (Next 16.3.2). HTML grew from 24 KB to 56 KB gzip (the CSS is inlined twice, once in `<style>` and once in the RSC payload), FCP went 0.9 s to 1.0 s, performance stayed 94 to 95 with no gain, and the Next docs mark it experimental. Reverted. Lighthouse itself rates the stylesheet at about 80 ms.
- Request count and 19 JS chunks: the 11 initial scripts are Next/Turbopack runtime chunks and Turbopack has no chunk-merging switch. Of the 36 requests Lighthouse sees on the home page, 6 are fonts, 7 are route prefetches (`?_rsc=`, which make navigation and the language switch fast), 2 are Vercel scripts and the three.js chunk (138 KB) loads lazily after idle. Dropping prefetch or the font preloads would lower the count but slow navigation. Left as it is. One real saving is available if wanted: the Vietnamese font subset is preloaded on English pages (3 files, 15 KB); it needs a locale-specific font config.
- Plain-text email in the HTML: it is also in the `mailto:` link, JSON-LD, llms.txt and the Markdown copies, and the owner wants it visible. Entity or CSS tricks hide it from screen readers and agents and are decoded by harvesters anyway. Left.
- "No Google Analytics": Vercel Analytics is the owner's decision. "No CDN": false positive, Vercel is the CDN.
- `Accept: text/markdown` negotiation: the `.md` addresses are cheap; negotiation at the same URL conflicts with the next-intl proxy (it runs before rewrites) and Cloudflare/Vercel edge behaviour could not be tested.
- WebMCP, `security.txt`, `ai.txt`, Content-Signal: WebMCP is a draft community report and the site has no action an agent could run (a `mailto:` and links). `security.txt` (RFC 9116) is real but is for a vulnerability-disclosure practice and needs an `Expires` that someone must renew; this static site has none. `ai.txt` has no standard. Content-Signal could not be confirmed from a primary source.
- The other five offer names stay as they are; they already read as services.
- Changing `WebPage` to `ContactPage` / `CollectionPage`: no search or agent benefit, and the existing structured-data tests pin `WebPage`.
- Service-level `areaServed`: a test pins one `areaServed` on the provider; agents reach it through `provider`.
- FAQPage markup kept even though Google retired the FAQ rich result in May 2026: it still matches the visible `dl`, costs nothing and is read by other assistants. Do not expect a rich result.

## Conflicts and choices for the owner

1. App status. AGENTS.md says to write "in development" for Scori and Remoti. Commit 843804c and 09b7905 ("no status on the apps") removed it from the site. llms.txt and the Markdown copies follow the site (no status line) and add only "no download counts, ratings or reviews". If an assistant says Scori is in the App Store, add one line to `messages/*.json` `llms.limits`: "Scori and Remoti are in development and not in an app store yet." and decide whether the site may say it too.
2. The breadcrumb sits above the H1. It is plain text, not a badge. If you read it as an eyebrow, delete `crumb={...}` from the three pages.
3. Robots: everything including training crawlers is allowed, as it was. To opt out of training only, change `Allow: /` to `Disallow: /` in the third group of `src/app/robots.txt/route.ts` (Google-Extended, GPTBot, ClaudeBot and the others); search and answer bots keep working.
4. The Vietnamese home title now opens `Dịch vụ chuyển đổi số và AI cho doanh nghiệp nhỏ`, close to the services H1 `Chuyển đổi số, phần mềm và AI cho doanh nghiệp nhỏ`. Titles differ, but the one-intent-per-page rule is under some pressure. Confirm, or return to `Chuyển đổi số và AI cho doanh nghiệp nhỏ | Canh Ta` and drop `dịch vụ` from the title only.
5. The English home title lost "small businesses" to make room for "services". Alternative at 60 characters: `Digital transformation for small business | Canh Ta` (no "services"; "AI" returns if you accept 62 characters).

## Words missing from the visible text, with exact proposals for approval

Counts are visible text, home / services / products / contact.

Vietnamese. Absent: `phần mềm quản lý` (0/0/0/0), `quản lý bán hàng`, `quản lý kho`, `hộ kinh doanh`, `Việt Nam` (no Vietnamese page says where we work), `tự động hóa`. Weak: `cửa hàng` (1/0/0/0), `chuyển đổi số` (only in the home title; on the services page only in the H1).

- Hero supporting line (`profile.supporting`, VI), replace "Cho cửa hàng và doanh nghiệp nhỏ." with: `Cho cửa hàng, hộ kinh doanh và doanh nghiệp nhỏ ở Việt Nam.`
- Services intro (`services.intro`, VI), add one plain sentence after the term, as the rules ask: `Chuyển đổi số là đưa cách bạn đang làm việc vào một phần mềm quản lý. Số hóa trước, AI agent sau.`
- Offer "Hệ thống quản lý", first sentence of the detail: `Phần mềm quản lý đơn hàng, kho và công nợ cho cửa hàng của bạn. Nhập đơn một lần, kho và công nợ của khách cập nhật theo.`
- Services meta description (VI): `ERP, CRM, chatbot, AI agent, báo cáo, website và IoT cho cửa hàng, hộ kinh doanh và doanh nghiệp nhỏ. Bạn xem bản chạy thử nhỏ trước, rồi mới có báo giá cụ thể.` (check it stays within 150 to 155 characters before shipping)
- New FAQ item (also fills the "quản lý bán hàng" gap): question `Cửa hàng nhỏ của tôi có cần phần mềm quản lý không?` answer `Nếu bạn còn ghi đơn và kho ra giấy hay Excel, một phần mềm quản lý đơn giản đã giúp được. Chúng tôi bắt đầu từ việc tốn thời gian nhất.`

English. Absent: `business management software`, `automation`, `inventory`, `mobile app`, `custom software`. Weak: `shop` (1/0/0/0), `Vietnam` (only supporting line and services H1), `order` and `stock` appear in no heading.

- Offer "Business systems", first sentence of the detail: `Business management software for orders, stock and customers. Enter an order once and the stock and the customer's balance follow.`
- Offer "AI agents and chatbots": add `AI agents that automate routine steps` after the first sentence (this is the one place "automation" is natural).
- Hero supporting line: `For shops and small businesses in Vietnam.` is already there; keep it.
- Home H3 "Business systems" could read `Business systems for orders and stock` if you want both words in a heading. I did not change offer names because they feed the anchors, JSON-LD and llms.txt.
- "Inventory" is the American word for "stock". If you want US searches, add it once in the FAQ: question `Can you track my inventory and orders in one place?` answer `Yes. Stock and orders sit in one record, so nobody retypes.` (do not add unless it is true for every project; it describes the first offer only).

Not recommended: `thiết kế website`, `làm phần mềm theo yêu cầu` and similar head terms. They would need their own page with its own intent (AGENTS allows a new page only then). Four pages stay.

## Lighthouse (mobile, headless Chrome, Lighthouse 12, localhost production build)

Before (commit 79b1de5) / after (this branch). Performance, accessibility, best practices, SEO; LCP; TBT.

| Page | Before | After |
| --- | --- | --- |
| `/` | 93 100 96 100, LCP 3.0 s, TBT 120 ms | 95 100 96 100, LCP 2.9 s, TBT 60 ms |
| `/services` | 97 100 96 100, LCP 2.6 s | 96 100 96 100, LCP 2.8 s |
| `/products` | 93 100 96 100, LCP 3.2 s | 94 100 96 100, LCP 3.0 s |
| `/contact` | 96 100 96 100, LCP 2.8 s | 97 100 96 100, LCP 2.6 s |
| `/vi` | 95 100 96 100, LCP 2.9 s | 95 100 96 100, LCP 2.9 s |
| `/vi/dich-vu` | 96 100 96 100, LCP 2.8 s | 96 100 96 100, LCP 2.8 s |
| `/vi/san-pham` | 95 100 96 100, LCP 2.9 s | 95 100 96 100, LCP 2.9 s |
| `/vi/lien-he` | 96 100 96 100, LCP 2.8 s | 96 100 96 100, LCP 2.8 s |

CLS is 0 everywhere. Run-to-run noise is about plus or minus 2 points; the baseline home and products pages sat at 93. Raw reports: `/tmp/lh-before`, `/tmp/lh-after1`, `/tmp/lh-inline` (the reverted experiment).

## Could not verify

Left to the coordinator, as AGENTS.md requires: the check in the Orca browser at phone and desktop widths in both languages (only headless Chrome screenshots at 390 and 1280 wide were looked at: breadcrumb on services and contact, the 404, and the home offer cell with the longer name, which wraps to two lines in both languages) and the independent reviews (fact check, copy, CRO, SEO, codex). The new lines in `messages/*.json` (`llms` block, `nav.breadcrumb`) and the title and description wordings were not run through the humanizer or an independent copy review. Google Search Console (indexing, hreflang report, rich results, generative AI report); real indexing and the title Google actually shows; whether any assistant reads llms.txt (Google says it ignores it); Vercel or Cloudflare edge behaviour (the apex-to-www redirect, `Cache-Control` at the CDN, bot protection answering 403 to AI crawlers, which robots.txt cannot see); share previews on real Facebook, LinkedIn, Zalo and X (only the PNGs were checked); the Rich Results Test and schema.org validator on the live URL; the Vercel Analytics scripts (404 on localhost, which accounts for the best-practices score of 96); screen-reader reading of the breadcrumb; the 200% zoom and Vietnamese diacritics on the new breadcrumb (looked at once at 390 and 1280 wide in headless Chrome only).
