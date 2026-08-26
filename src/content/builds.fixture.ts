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
 * `cover` is absent throughout: no real screenshots exist yet. The detail and
 * the hero deck render a "drawing to follow" panel instead of borrowing a
 * generic wireframe and presenting it as a product shot.
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
    featured: true,
    tagline: {
      en: 'Turns an app idea into an evidence-backed decision, not an opinion.',
      vi: 'Biến một ý tưởng app thành quyết định có bằng chứng, không phải cảm tính.',
    },
    problem: {
      en: 'Deciding what to build from a product link usually ends in a hunch.',
      vi: 'Quyết định xây gì từ một link sản phẩm thường kết thúc bằng linh cảm.',
    },
    built: {
      en: 'An agent skill that reads the market and returns a differentiated call.',
      vi: 'Một agent skill đọc thị trường và trả về một hướng đi khác biệt.',
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
      en: 'An iPhone app for two people, built around rituals rather than a feed.',
      vi: 'App iPhone cho hai người, xoay quanh nghi thức chứ không phải bảng tin.',
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
      en: 'In build. Domain model, sync protocol and release gates are settled.',
      vi: 'Đang xây. Mô hình miền, giao thức đồng bộ và cổng phát hành đã chốt.',
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
      en: 'Saw a bidding game trending on X, rebuilt it working.',
      vi: 'Thấy một trò đấu giá đang trend trên X, dựng lại thành bản chạy được.',
    },
    problem: {
      en: 'The fastest way to learn a mechanic is to make it work yourself.',
      vi: 'Cách nhanh nhất để hiểu một cơ chế là tự làm cho nó chạy.',
    },
    built: {
      en: 'A credit-backed attention market: a qualified open burns one credit.',
      vi: 'Thị trường chú ý bằng credit: một lượt mở hợp lệ đốt đúng một credit.',
    },
    result: {
      en: 'In build, for fun. Original idea: outbid.lol.',
      vi: 'Đang xây, làm cho vui. Ý tưởng gốc: outbid.lol.',
    },
    links: [],
  },
]
