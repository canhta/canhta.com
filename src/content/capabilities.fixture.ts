import type { Capability, FixtureMarked } from './types'

/**
 * The `engagement` row was cut. It answered "how does this run", which is the
 * exact question the engagements section exists to answer — and on the
 * Vietnamese page both sections were shipping the identical column header, which
 * is the translator's own verdict that they were the same thing.
 *
 * Names are aligned to the one surviving taxonomy: the same four buckets are
 * also named in `lib/build-meta.ts`, as each project's KIND label. They used to
 * be worded four different ways across three lists; the third list was a callout
 * hanging off the old FIG. 1 drawing, and it went with the drawing.
 */
export const capabilitiesFixture: (Capability & FixtureMarked)[] = [
  {
    __fixture: true,
    id: 'agentic',
    order: 1,
    name: { en: 'Work that runs itself', vi: 'Việc tự nó chạy' },
    bestFor: {
      en: 'Work that repeats, has judgement in it, and nobody wants to do.',
      vi: 'Việc lặp lại, có phán đoán bên trong, và không ai muốn làm.',
    },
    canDeliver: {
      en: 'An agent that reasons, calls your tools, and knows when to ask a human.',
      vi: 'Một agent biết suy luận, gọi tool của bạn, và biết lúc nào phải hỏi người.',
    },
  },
  {
    __fixture: true,
    id: 'mobile',
    order: 2,
    name: { en: 'Phone apps', vi: 'App điện thoại' },
    bestFor: {
      en: 'Products whose users are standing up, not sitting at a desk.',
      vi: 'Sản phẩm mà người dùng đang đứng, không ngồi trước bàn.',
    },
    canDeliver: {
      en: 'A shipped app on both stores that survives a bad network.',
      vi: 'App đã lên cả hai store và sống sót qua mạng yếu.',
    },
  },
  {
    __fixture: true,
    id: 'web',
    order: 3,
    name: { en: 'Web products', vi: 'Sản phẩm web' },
    bestFor: {
      en: 'The interface your business actually runs on.',
      vi: 'Giao diện mà công việc kinh doanh của bạn thật sự chạy trên đó.',
    },
    canDeliver: {
      en: 'Fast, accessible interfaces that stay easy to change later.',
      vi: 'Giao diện nhanh, dễ tiếp cận, và vẫn dễ sửa về sau.',
    },
  },
  {
    __fixture: true,
    id: 'saas',
    order: 4,
    name: { en: 'Paid products', vi: 'Sản phẩm thu phí' },
    bestFor: {
      en: 'An idea that needs to meet real users before it needs a team.',
      vi: 'Một ý tưởng cần gặp người dùng thật trước khi cần một đội.',
    },
    canDeliver: {
      en: 'A narrow product with billing, auth and analytics from day one.',
      vi: 'Sản phẩm hẹp, có thanh toán, đăng nhập và số liệu ngay từ ngày đầu.',
    },
  },
]
