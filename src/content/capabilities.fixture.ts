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
    name: { en: 'Work that runs itself', vi: 'Việc tự chạy' },
    bestFor: {
      en: 'Repetitive work that still needs a judgement call.',
      vi: 'Việc lặp đi lặp lại mà vẫn cần người cân nhắc.',
    },
    canDeliver: {
      en: 'An agent that uses your existing tools and asks a person when it is unsure.',
      vi: 'Một agent chạy ngay trên tool bạn đang dùng, chỗ nào không chắc thì hỏi lại người.',
    },
  },
  {
    __fixture: true,
    id: 'mobile',
    order: 2,
    name: { en: 'Phone apps', vi: 'App điện thoại' },
    bestFor: {
      en: 'Users who are away from a desk when they need it.',
      vi: 'Người dùng cần đến nó lúc không ngồi trước máy tính.',
    },
    canDeliver: {
      en: 'An app on the App Store and Google Play that works on a weak connection.',
      vi: 'App trên App Store và Google Play, chạy được cả khi mạng yếu.',
    },
  },
  {
    __fixture: true,
    id: 'web',
    order: 3,
    name: { en: 'Web products', vi: 'Sản phẩm web' },
    bestFor: {
      en: 'The interface your team uses every day.',
      vi: 'Giao diện team bạn dùng mỗi ngày.',
    },
    canDeliver: {
      en: 'A fast, accessible interface that stays easy to change.',
      vi: 'Giao diện nhanh, ai cũng dùng được, và về sau vẫn dễ sửa.',
    },
  },
  {
    __fixture: true,
    id: 'saas',
    order: 4,
    name: { en: 'Paid products', vi: 'Sản phẩm thu phí' },
    bestFor: {
      en: 'An idea you want in front of paying users early.',
      vi: 'Ý tưởng bạn muốn sớm đưa đến tay người dùng trả tiền.',
    },
    canDeliver: {
      en: 'A small product with sign-in, billing and analytics from the start.',
      vi: 'Sản phẩm nhỏ, có sẵn đăng nhập, thanh toán và số liệu ngay từ đầu.',
    },
  },
]
