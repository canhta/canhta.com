import type { Capability, FixtureMarked } from './types'

export const capabilitiesFixture: (Capability & FixtureMarked)[] = [
  {
    __fixture: true,
    id: 'agentic',
    order: 1,
    name: { en: 'Agentic systems', vi: 'Hệ thống agentic' },
    bestFor: {
      en: 'Work that repeats, has judgement in it, and nobody wants to do.',
      vi: 'Việc lặp lại, có phán đoán bên trong, và không ai muốn làm.',
    },
    canDeliver: {
      en: 'An agent that reasons, calls your tools, and knows when to ask a human.',
      vi: 'Một agent biết suy luận, gọi tool của bạn, và biết lúc nào phải hỏi người.',
    },
    engagement: {
      en: 'Usually starts with one narrow loop running in production.',
      vi: 'Thường bắt đầu bằng một vòng lặp hẹp chạy thật trên production.',
    },
  },
  {
    __fixture: true,
    id: 'mobile',
    order: 2,
    name: { en: 'Mobile apps', vi: 'Ứng dụng mobile' },
    bestFor: {
      en: 'Products whose users are standing up, not sitting at a desk.',
      vi: 'Sản phẩm mà người dùng đang đứng, không ngồi trước bàn.',
    },
    canDeliver: {
      en: 'A shipped app on both stores that survives a bad network.',
      vi: 'App đã lên cả hai store và sống sót qua mạng yếu.',
    },
    engagement: {
      en: 'Design and build together, store submission included.',
      vi: 'Thiết kế và xây cùng nhau, gồm cả việc nộp store.',
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
      en: 'Fast, accessible, honest interfaces — no framework tourism.',
      vi: 'Giao diện nhanh, dễ tiếp cận, trung thực — không chạy theo framework.',
    },
    engagement: {
      en: 'From a single screen to a full product surface.',
      vi: 'Từ một màn hình đơn lẻ tới toàn bộ bề mặt sản phẩm.',
    },
  },
  {
    __fixture: true,
    id: 'saas',
    order: 4,
    name: { en: 'mini-SaaS and MVPs', vi: 'mini-SaaS và MVP' },
    bestFor: {
      en: 'An idea that needs to meet real users before it needs a team.',
      vi: 'Một ý tưởng cần gặp người dùng thật trước khi cần một đội.',
    },
    canDeliver: {
      en: 'A narrow product with billing, auth and analytics from day one.',
      vi: 'Sản phẩm hẹp, có thanh toán, đăng nhập và số liệu ngay từ ngày đầu.',
    },
    engagement: {
      en: 'Scoped hard so it ships, not so it impresses.',
      vi: 'Gói phạm vi thật chặt để nó ship được, không phải để gây ấn tượng.',
    },
  },
]
