import type { Build, FixtureMarked } from './types'

/**
 * REAL PROJECTS. Every line here is taken from the repositories themselves —
 * their CONTEXT.md glossaries, their docs, and the GitHub API — not written to
 * sound good.
 *
 * The Reupmatic repository is private and its site is public, so it links the
 * site and not the source. AI Engineering Atlas is public on both sides, so it
 * links the site and the source. PixelBid links a domain that is registered but
 * not deployed behind yet. Linking a private repo gives every visitor a 404, and
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
    slug: 'reupmatic',
    order: 1,
    name: 'Reupmatic',
    year: '2026',
    kind: 'desktop',
    /**
     * An Alpha people can already download, so the status stays `building`: the
     * intake, local processing and affiliate drafts work, while direct social
     * publishing is still being built. The site says the same thing.
     */
    status: 'building',
    tagline: {
      en: 'A desktop app that preps batches of Douyin reuploads on your machine.',
      vi: 'App desktop chuẩn bị cả loạt video Douyin ngay trên máy.',
    },
    problem: {
      en: 'Reuploading Douyin videos means repeating the same edit, subtitle and voice steps per video.',
      vi: 'Mỗi video reup lại phải làm lại đúng các bước chỉnh sửa, phụ đề và giọng đọc.',
    },
    built: {
      en: 'A queue that downloads, subtitles, translates and voices a batch on your computer.',
      vi: 'Một hàng đợi tự tải, làm phụ đề, dịch và tạo giọng cho cả loạt video trên máy.',
    },
    result: {
      en: 'Alpha builds are downloadable for macOS and Windows; direct publishing is still in progress.',
      vi: 'Bản Alpha đã tải được cho macOS và Windows; phần đăng thẳng vẫn đang làm.',
    },
    links: [{ kind: 'web', url: 'https://reupmatic.canhta.com' }],
  },
  {
    slug: 'ai-engineering-atlas',
    order: 2,
    name: 'AI Engineering Atlas',
    year: '2026',
    kind: 'web',
    /**
     * The repository and the site are both public, so this entry links both. Its
     * own README calls it a learning journey in public: coverage and ready routes
     * are deliberately separate, and a topic is not presented as finished merely
     * because it appears on the roadmap. That is why the result says the coverage
     * grows rather than claiming a finished curriculum.
     */
    status: 'live',
    tagline: {
      en: 'A roadmap for AI engineering that starts at your gap, not from zero.',
      vi: 'Roadmap AI engineering, bắt đầu từ đúng chỗ bạn còn thiếu.',
    },
    problem: {
      en: 'Experienced engineers know AI unevenly, but most roadmaps treat everyone as a beginner.',
      vi: 'Người đi làm lâu thì biết AI chỗ được chỗ không, mà hầu hết roadmap cứ dạy lại từ đầu.',
    },
    built: {
      en: 'A gap-driven curriculum: diagnose first, learn the smallest route, produce evidence.',
      vi: 'Kiểm tra trước để biết gap của mình, chỉ học đúng phần đó, rồi tự làm ra evidence.',
    },
    result: {
      en: 'Public on GitHub and live at ai-eng.canhta.com; coverage grows, routes get ready.',
      vi: 'Public trên GitHub, site live ở ai-eng.canhta.com; coverage ngày càng nhiều, các route cũng dần xong.',
    },
    links: [
      { kind: 'web', url: 'https://ai-eng.canhta.com' },
      { kind: 'github', url: 'https://github.com/canhta/ai-engineering-atlas' },
    ],
  },
  {
    slug: 'copycat-skills',
    order: 3,
    name: 'copycat-skills',
    year: '2026',
    kind: 'skill',
    status: 'shipped',
    tagline: {
      en: 'Turns an app idea into a decision backed by market evidence.',
      vi: 'Biến ý tưởng app thành quyết định có bằng chứng thị trường.',
    },
    problem: {
      en: 'Deciding what to build from a product link usually ends in a hunch.',
      vi: 'Quyết định làm gì từ một link sản phẩm, cuối cùng thường vẫn là cảm tính.',
    },
    built: {
      en: 'An agent skill that researches the market and recommends a direction.',
      vi: 'Một agent skill nghiên cứu thị trường và đề xuất hướng đi.',
    },
    result: {
      en: 'Published and installable from the public skills registry.',
      vi: 'Đã publish, ai cũng cài được từ registry skills.',
    },
    links: [
      { kind: 'docs', url: 'https://skills.sh/canhta/copycat-skills' },
      { kind: 'github', url: 'https://github.com/canhta/copycat-skills' },
    ],
  },
  {
    slug: 'pixelbid',
    order: 4,
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
      vi: 'Dựng lại trò đấu giá từng trend trên X, và nó chạy được.',
    },
    problem: {
      en: 'I wanted to understand how the bidding mechanic actually worked.',
      vi: 'Tôi muốn hiểu cơ chế đấu giá đó thực sự chạy thế nào.',
    },
    built: {
      en: 'A credit-backed attention market: a qualified open burns one credit.',
      vi: 'Thị trường sự chú ý chạy bằng credit: mỗi lượt mở hợp lệ đốt đúng một credit.',
    },
    result: {
      en: 'In build, as a side project. Original idea: outbid.lol.',
      vi: 'Đang làm, dự án ngoài giờ. Ý tưởng gốc: outbid.lol.',
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
