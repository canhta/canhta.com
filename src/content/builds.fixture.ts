import type { Build, FixtureMarked } from './types'

/**
 * REAL PROJECTS. Every line here is taken from the repositories themselves —
 * their CONTEXT.md glossaries, their docs, and the GitHub API — not written to
 * sound good.
 *
 * Two are still private and have no public destination, so they carry no links
 * and status `building`. Linking a private repo gives every visitor a 404, and
 * describing an unshipped product in the past tense is the kind of claim this
 * project refuses to make.
 *
 * `cover` is absent throughout: no real screenshots exist yet, and the work
 * section has no image slot to fill with a placeholder while that is true.
 *
 * `proof` is absent throughout for the same reason — there is no number here
 * that anyone could check.
 */
export const buildsFixture: (Build & Partial<FixtureMarked>)[] = [
  {
    slug: 'copycat-skills',
    order: 1,
    name: 'copycat-skills',
    year: '2026',
    kind: 'skill',
    status: 'shipped',
    tagline: {
      en: 'Turns an app idea into a decision backed by market evidence.',
      vi: 'Biến một ý tưởng app thành quyết định dựa trên bằng chứng thị trường.',
    },
    problem: {
      en: 'Deciding what to build from a product link usually ends in a hunch.',
      vi: 'Quyết định xây gì từ một link sản phẩm thường kết thúc bằng linh cảm.',
    },
    built: {
      en: 'An agent skill that researches the market and recommends a direction.',
      vi: 'Một agent skill nghiên cứu thị trường và đề xuất một hướng đi.',
    },
    result: {
      en: 'Published and installable from the public skills registry.',
      vi: 'Đã xuất bản, cài được từ registry skills công khai.',
    },
    links: [
      { kind: 'docs', url: 'https://skills.sh/canhta/copycat-skills' },
      { kind: 'github', url: 'https://github.com/canhta/copycat-skills' },
    ],
  },
  {
    slug: 'inluv',
    order: 2,
    name: 'inluv',
    year: '2026',
    kind: 'mobile',
    status: 'building',
    tagline: {
      en: 'An iPhone app for two people, built around daily rituals instead of a feed.',
      vi: 'App iPhone cho hai người, xoay quanh nghi thức hằng ngày thay vì bảng tin.',
    },
    problem: {
      en: 'Apps for couples turn a relationship into a feed to scroll.',
      vi: 'App cho các cặp đôi biến mối quan hệ thành một bảng tin để lướt.',
    },
    built: {
      en: 'Daily rituals where neither answer is revealed until both are in.',
      vi: 'Nghi thức hằng ngày: chưa ai trả lời xong thì chưa ai thấy gì.',
    },
    result: {
      en: 'In build for the App Store.',
      vi: 'Đang xây để lên App Store.',
    },
    links: [],
  },
  {
    slug: 'pixelbid',
    order: 3,
    name: 'PixelBid',
    year: '2026',
    kind: 'web',
    status: 'building',
    /**
     * Described as what it is. It is a rebuild of outbid.lol, which was trending
     * on X, done for fun — so it is not presented as a market product I run. The
     * honest version is also the better one for this page: the interesting claim
     * is not the idea, it is how fast the working thing existed.
     */
    tagline: {
      en: 'A working rebuild of a bidding game that was trending on X.',
      vi: 'Bản dựng lại chạy được của một trò đấu giá từng trend trên X.',
    },
    problem: {
      en: 'I wanted to understand how the bidding mechanic actually worked.',
      vi: 'Tôi muốn hiểu cơ chế đấu giá đó thật sự hoạt động thế nào.',
    },
    built: {
      en: 'A credit-backed attention market: a qualified open burns one credit.',
      vi: 'Thị trường chú ý bằng credit: một lượt mở hợp lệ đốt đúng một credit.',
    },
    result: {
      en: 'In build, as a side project. Original idea: outbid.lol.',
      vi: 'Đang xây, làm ngoài giờ. Ý tưởng gốc: outbid.lol.',
    },
    /**
     * The domain is registered and pointed at Cloudflare but nothing is deployed
     * behind it yet — as of writing it serves the registrar's parking page over
     * HTTP, and HTTPS has no certificate. Linked at Canh's explicit request; the
     * `building` status is what tells a visitor not to expect a product.
     *
     * `https` on purpose, never `http`: linking plain HTTP from an HTTPS page
     * hands the visitor a "Not secure" warning. This link starts working the
     * moment the deploy lands, and not before.
     */
    links: [{ kind: 'web', url: 'https://pixelbid.lol' }],
  },
]
